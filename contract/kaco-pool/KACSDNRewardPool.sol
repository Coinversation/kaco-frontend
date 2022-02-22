// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/security/ReentrancyGuard.sol';
import '@openzeppelin/contracts/utils/math/SafeMath.sol';
import './SafeBEP20.sol';
import './IROUTER.sol';

contract KACSDNRewardPool is Ownable, ReentrancyGuard {
    using SafeMath for uint256;
    using SafeBEP20 for IBEP20;
    uint256 public accTokenPerShare;
    uint256 public bonusEndBlock;
    uint256 public lastRewardBlock;
    uint256 public rewardPerBlock;
    uint256 public PRECISION_FACTOR;

    IBEP20 public rewardToken;
    IBEP20 public stakedToken;

    mapping(address => UserInfo) public userInfo;

    struct userInfo {
        uint256 amount;
        uint256 rewardDebt;
    }

    IROUTER public constant ROUTER = IROUTER(0x72e86269b919Db5bDbF61cB1DeCfD6d14feC4D7F);

    address[] public paths;

    event AdminTokenRecovery(address tokenRecovered, uint256 amount);
    event Deposit(address indexed user, uint256 amount);
    event EmergencyWithdraw(address indexed user, uint256 amount);
    event RewardUpdate(uint256 endBlock, uint256 rewardPerBlock);
    event RewardsStop(uint256 blockNumber);
    event Withdraw(address indexed user, uint256 amount);

    constructor(
        IBEP20 _stakedToken,
        IBEP20 _rewardToken,
        uint256 _startBlock,
        address _admin
    ) {
        require(_stakedToken != _rewardToken, 'Tokens must be different');
        stakedToken = _stakedToken;
        rewardToken = _rewardToken;
        bonusEndBlock = _startBlock;
        // default: [WSDN, KAC]
        address kacAddress = 0xb12c13e66AdE1F72f71834f2FC5082Db8C091358;
        paths = [0x0f933Dc137D21cA519ae4C7E93f87a4C8EF365Ef, kacAddress];
        IBEP20(kacAddress).safeIncreaseAllowance(address(ROUTER), type(uint256).max);

        uint256 decimalsRewardToken = uint256(rewardToken.decimals());
        require(decimalsRewardToken < 30, 'Must be inferior to 30');

        PRECISION_FACTOR = uint256(10**(uint256(30).sub(decimalsRewardToken)));

        lastRewardBlock = _startBlock;

        transferOwnership(_admin);
    }

    function deposit(uint256 _amount) external nonReentrant {
        UserInfo storage user = userInfo[msg.sender];
        _updatePool();
        if (user.amount > 0) {
            uint256 pending = user.amount.mul(accTokenPerShare).div(PRECISION_FACTOR).sub(user.rewardDebt);
            if (pending > 0) {
                rewardToken.safeTransfer(address(msg.sender), pending);
            }
        }
        if (_amount > 0) {
            user.amount = user.amount.add(_amount);
            stakedToken.safeTransferFrom(address(msg.sender), address(this), _amount);
        }
        user.rewardDebt = user.amount.mul(accTokenPerShare).div(PRECISION_FACTOR);
        emit Deposit(msg.sender, _amount);
    }

    function withdraw(uint256 _amount) external nonReentrant {
        UserInfo storage user = userInfo[msg.sender];
        require(user.amount >= _amount, 'Amount to withdraw too high');

        _updatePool();
        // mul 乘
        // div 除
        // sub 减
        uint256 pending = user.amount.mul(accTokenPerShare).div(PRECISION_FACTOR).sub(user.rewardDebt);
        if (_amount > 0) {
            user.amount = user.amount.sub(_amount);
            stakedToken.safeTransfer(address(msg.sender), _amount);
        }

        if (pending > 0) {
            rewardToken.safeTransfer(address(msg.sender), pending);
        }

        user.rewardDebt = user.amount.mul(accTokenPerShare).div(PRECISION_FACTOR);

        emit Withdraw(msg.sender, _amount);
    }

    function emergencyWithdraw() external nonReentrant {
        UserInfo storage user = userInfo[msg.sender];
        uint256 amountToTransfer = user.amount;
        user.amount = 0;
        user.rewardDebt = 0;
        if (amountToTransfer > 0) {
            stakedToken.safeTransfer(address(msg.sender), amountToTransfer);
        }
        emit EmergencyWithdraw(msg.sender, user.amount);
    }

    function emergencyRewardWithdraw(uint256 _amount) external onlyOwner {
        rewardToken.safeTransfer(address(msg.sender), _amount);
    }

    function recoverWrongTokens(address _tokenAddress, uint256 _tokenAmount) external onlyOwner {
        require(_tokenAddress != address(stakedToken), 'Cannot be staked token');
        require(_tokenAddress != address(rewardToken), 'Cannot be reward token');
        IBEP20(_tokenAddress).safeTransfer(address(msg.sender), _tokenAmount);

        emit AdminTokenRecovery(_tokenAddress, _tokenAmount);
    }

    function stopReward() external onlyOwner {
        bonusEndBlock = block.number;
    }

    function updateRewards(uint256 _extendBlocks) external payable onlyOwner {
        _updatePool();
        uint256 sellAmount = address(this).balance / 2;
        uint256 newReward;
        if (sellAmount > 0) {
            uint256[] memory amounts = ROUTER.getAmountsOut(sellAmout, paths);
            uint256 lastIndex = amounts.length - 1;
            require(amounts[lastIndex] > 0, 'swap get 0');

            // buy paths[lastIndex](KAC) by SDN
            uint256 oldBalance = IBEP20(paths[lastIndex]).balanceOf(address(this));
            uint256 minAmountOut = (amounts[lastIndex] * 995) / 1000;
            ROUTER.swapExactETHForTokens{value: sellAmount}(minAmountOut, paths, address(this), block.number + 1);
            uint256 newBalance = IBEP20(paths[lastIndex]).balanceOf(address(this));
            require(newBalance > oldBalance + minAmountOut, 'outputAmount not enough');

            // add Liquidity
            uint256 oldLpBalance = rewardToken.balanceOf(address(this));
            ROUTER.addLiquidityETH{value: sellAmount}(
                paths[lastIndex],
                newBalance - oldBalance,
                (newBalance - oldBalance) / 2,
                sellAmount / 2,
                address(this),
                block.number + 1
            );
            uint256 latestLpBalance = rewardToken.balanceOf(address(this));
            newReward = latestLpBalance - oldLpBalance;
            require(newReward > 0, 'add LP get 0');
        }
        uint256 remainReward;
        if (bonusEndBlock > block.number) {
            remainReward = (bonusEndBlock - block.number);
            bonusEndBlock = bonusEndBlock + _extendBlocks;
        } else {
            require(_extendBlocks > 0, 'param 0');
            bonusEndBlock = block.number + _extendBlocks;
        }

        // update rewardPerBlock
        rewardPerBlock = (remainReward + newReward) / (bonusEndBlock - block.number);
        emit RewardUpdate(bonusEndBlock, rewardPerBlock);
    }

    function updateSwapPath(address[] memory _paths) external onlyOwner {
        paths = _paths;
    }

    function pendingReward(address _user) external view returns (uint256) {
        UserInfo storage user = userInfo[_user];
        uint256 stakedTokenSupply = stakedToken.balanceOf(address(this));
        if (block.number > lastRewardBlock && stakedTokenSupply != 0) {
            uint256 multiplier = _getMultiplier(lastRewardBlock, block.number);
            uint256 reward = multiplier.mul(rewardPerBlock);
            uint256 adjustedTokenPerShare = accTokenPerShare.add(reward.mul(PRECISION_FACTOR).div(stakedTokenSupply));
            return user.amount.mul(adjustedTokenPerShare).div(PRECISION_FACTOR).sub(user.rewardDebt);
        } else {
            return user.amount.mul(accTokenPerShare).div(PRECISION_FACTOR).sub(user.rewardDebt);
        }
    }

    function _updatePool() internal {
        if (block.number <= lastRewardBlock) {
            return;
        }
        uint256 stakedTokenSupply = stakedToken.balanceOf(address(this));

        if (stakedTokenSupply == 0) {
            lastRewardBlock = block.number;
            return;
        }
        uint256 multiplier = _getMultiplier(lastRewardBlock, block.number);
        uint256 reward = multiplier.mul(rewardPerBlock);
        accTokenPerShare = accTokenPerShare.add(reward.mul(PRECISION_FACTOR).div(stakedTokenSupply));
        lastRewardBlock = block.number;
    }

    function _getMultiplier(uint256 _from, uint256 _to) internal view returns (uint256) {
        if (_to <= bonusEndBlock) {
            return _to.sub(_from);
        } else if (_from >= bonusEndBlock) {
            return 0;
        } else {
            return bonusEndBlock.sub(_from);
        }
    }
}
