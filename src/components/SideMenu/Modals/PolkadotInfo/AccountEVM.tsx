import React, { FC } from 'react';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import useAuth from 'hooks/useAuth';
import { Flex } from '@kaco/uikit';
import LayoutSvg from '../../imgs/icon_layout.svg';
const Account_EVM_TSX: FC<{ className?: string }> = ({ className }) => {
  const { account } = useWeb3React();
  const { logout } = useAuth();
  return (
    <div className={className}>
      <Flex justifyContent="space-between" alignItems="center" className="account_header">
        <h2>
          {account.slice(0, 4)}...{account.slice(account.length - 5, account.length)}
        </h2>
        <img src={LayoutSvg} width="36px" alt="" onClick={logout} />
      </Flex>
    </div>
  );
};
const AccountEVM = styled(Account_EVM_TSX)`
.account_header {
  padding: 14px 20px 14px 24px;
  line-height: 22pxl
  font-weight: bolder;
  color: #1BD3D5;
  font-size: 20px;
  background-color:#272E32;

}
h2{
  padding-right: 100px;
}
img{
  cursor: pointer; 
}
`;
export default AccountEVM;
