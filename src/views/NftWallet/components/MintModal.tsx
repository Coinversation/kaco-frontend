import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Text, Flex, Button, Modal, InjectedModalProps } from '@kaco/uikit';
import { ModalActions } from 'components/Modal';
import { useTranslation } from 'contexts/Localization';
import MintSvg from '../img/mint.svg';
import { NFT } from 'views/NftPool/components/GoodsInPool';
import { NftPair } from 'views/NftPools/hooks/useNftPools';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { BLOCK_INTERVAL, NFT_PAIRS, NFT_TYPE } from 'config/constants/nft';
import { ButtonMenu, ButtonMenuItem } from '@kaco/uikit';
import { useContract } from 'hooks/useContract';
import Erc721 from 'config/abi/erc-721.json';
import Erc1155 from 'config/abi/ERC1155.json';
import * as ethers from 'ethers';
import { simpleRpcProvider } from 'utils/providers';

const StyledNav = styled.nav<{ activeIndex: number }>`
  margin-bottom: 40px;
  display: flex;
  justify-content: center;

  > div {
    background: #12171a;
    padding: 6px;
    > button {
      height: 36px !important;
    }
    > button${(props) => (props.activeIndex ? ':last-child' : ':first-child')} {
      background: #1f373b !important;
    }
  }
`;
const FEE = 5;
const FEE_DAYLIY = 0.05;

interface Props extends InjectedModalProps {
  nft: NFT;
  pair: NftPair;
}

const BLOCKS_ONE_DAY = (3600 * 24) / BLOCK_INTERVAL;

const MintModal: React.FC<Props> = ({ onDismiss, nft, pair }) => {
  const { t } = useTranslation();
  const { account } = useActiveWeb3React();
  const contract = useContract(pair?.nftAddress, pair?.type === NFT_TYPE.NFT721 ? Erc721 : Erc1155);
  const [activeIndex, setActiveIndex] = useState(0);
  const [lockdays, setLockdays] = useState(10);

  const onMint = useCallback(async () => {
    if (!account) {
      return;
    }

    let mint: Promise<any>;
    const blockNumber = await simpleRpcProvider.getBlockNumber();
    const data = ethers.utils.solidityPack(
      ['address', 'address', 'uint24'],
      [account, account, lockdays * BLOCKS_ONE_DAY + blockNumber],
    );

    if (activeIndex === 0) {
      if (pair.type === NFT_TYPE.NFT721) {
        mint = contract.safeTransferFrom(account, pair.pairAddress, 221, '0x');
      } else {
        console.log(account, pair.pairAddress, [nft.id], [1], '0x', contract);
        mint = contract.safeTransferFrom(account, pair.pairAddress, 221, 1, '0x');
      }
    } else {
      if (pair.type === NFT_TYPE.NFT721) {
        mint = contract.safeTransferFrom(account, pair.pairAddress, nft.id, data);
      } else {
        mint = contract.safeTransferFrom(account, pair.pairAddress, nft.id, 1, data);
      }
    }

    mint.then(
      (s) => {
        alert('success');
        onDismiss();
      },
      (e) => console.log('e', e),
    );
  }, [contract, pair, account, nft, onDismiss, activeIndex, lockdays]);

  return (
    <Modal style={{ position: 'relative', maxWidth: '400px', width: '100%' }} title={null} onDismiss={onDismiss}>
      <StyledNav style={{ position: 'absolute', top: '20px' }} activeIndex={activeIndex}>
        <ButtonMenu activeIndex={activeIndex} variant="subtle" onItemClick={setActiveIndex}>
          <ButtonMenuItem>
            <Text width="100%">{t('Mint')}</Text>
          </ButtonMenuItem>
          <ButtonMenuItem>
            <Text width="100%">{t('Lock Mint')}</Text>
          </ButtonMenuItem>
        </ButtonMenu>
      </StyledNav>
      {activeIndex === 0 ? (
        <div style={{ maxWidth: '400px' }}>
          <Text mb="16px" color="#F1842C" fontSize="12px" bold>
            High-Value NFT? Lock it up!
          </Text>
          <Flex
            style={{
              padding: '13px 14px',
              background: '#272E32',
              borderRadius: '20px',
              alignItems: 'center',
            }}
          >
            <img src={nft.image} alt="" style={{ width: '69px', height: '69px' }} />
            <Text bold fontSize="16px" color="white" ml="30px">
              {nft.name}#{nft.id}
            </Text>
          </Flex>
          <Flex justifyContent="center">
            <img src={MintSvg} alt="" style={{ position: 'relative', top: '-10px', zIndex: 2 }} />
          </Flex>
          <Flex
            style={{
              padding: '13px 14px',
              background: '#272E32',
              borderRadius: '20px',
              position: 'relative',
              top: '-20px',
              zIndex: 1,
            }}
          >
            <img
              style={{
                width: '68px',
                height: '68px',
                borderRadius: '34px',
              }}
              src={NFT_PAIRS.find((p) => pair.pairAddress.toLowerCase() === p.address.toLowerCase())?.logo}
              alt=""
            />
            <Flex ml="30px" flexDirection="column" justifyContent="center">
              <Text bold fontSize="20px" color="white">
                {pair.symbol}
              </Text>
              <Text fontSize="12px" color="#1BD3D5">
                Quantity {100 - FEE}
              </Text>
            </Flex>
          </Flex>
          <Text textAlign="center" color="#9DA6A6" fontSize="12px" bold>
            Fee {FEE}%
          </Text>
        </div>
      ) : (
        <div style={{ maxWidth: '400px' }}>
          <div
            style={{
              padding: '13px 14px',
              background: '#272E32',
              borderRadius: '20px',
              alignItems: 'center',
            }}
          >
            <Flex
              style={{
                padding: '13px 14px',
                background: '#272E32',
                borderRadius: '20px',
                alignItems: 'center',
              }}
            >
              <img src={nft.image} alt="" style={{ width: '69px', height: '69px' }} />
              <div>
                <Text bold fontSize="16px" color="white" ml="30px">
                  Your sale method for
                </Text>
                <Text bold fontSize="16px" color="white" ml="30px">
                  {nft.name}#{nft.id}
                </Text>
              </div>
            </Flex>
            <Text color="#9DA6A6" fontSize="12px" mb="12px" mt="26px" pl="10px">
              Choose lock time
            </Text>
            <Flex padding="10px 20px" alignItems="center" background="#1F252A" borderRadius="12px">
              <Text fontSize="16px" bold style={{ flex: '1' }}>
                {lockdays} Day
              </Text>
              <Button
                scale="sm"
                mx="10px"
                variant="secondary"
                onClick={() => {
                  if (lockdays > 1) {
                    setLockdays((old) => old - 1);
                  }
                }}
              >
                -
              </Button>
              <Button
                scale="sm"
                onClick={() => {
                  if (lockdays < 30) {
                    setLockdays((old) => old + 1);
                  }
                }}
              >
                +
              </Button>
            </Flex>
          </div>
          <Flex justifyContent="center">
            <img src={MintSvg} alt="" style={{ position: 'relative', top: '-10px', zIndex: 2 }} />
          </Flex>
          <Flex
            style={{
              padding: '13px 14px',
              background: '#272E32',
              borderRadius: '20px',
              position: 'relative',
              top: '-20px',
              zIndex: 1,
            }}
          >
            <img
              style={{
                width: '68px',
                height: '68px',
                borderRadius: '34px',
              }}
              src={NFT_PAIRS.find((p) => pair.pairAddress.toLowerCase() === p.address.toLowerCase())?.logo}
              alt=""
            />
            <Flex ml="30px" flexDirection="column" justifyContent="center">
              <Text bold fontSize="20px" color="white">
                {pair.symbol}
              </Text>
              <Text fontSize="12px" color="#1BD3D5">
                Quantity {100 - FEE - FEE_DAYLIY * lockdays}
              </Text>
            </Flex>
          </Flex>
          <Text textAlign="center" color="#F1842C" fontSize="12px" bold px="36px">
            The default is {FEE}% handling fee, add 1 day to increase {FEE_DAYLIY}% handling fee
          </Text>
        </div>
      )}
      <ModalActions>
        <Button onClick={onMint} width="100%">
          {t('Confirm')}
        </Button>
      </ModalActions>
    </Modal>
  );
};

export default MintModal;
