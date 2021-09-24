import React, { FC } from 'react';
import styled from 'styled-components';
import { Button, Text, useModal } from '@kaco/uikit';
import MintModal from './MintModal';
import { NFT } from 'views/NftPool/components/GoodsInPool';
import { NftPair } from 'views/NftPools/hooks/useNftPools';

const Nft: FC<{ className?: string; nft: NFT; pair: NftPair }> = ({ className, nft, pair }) => {
  const [onMint] = useModal(<MintModal nft={nft} pair={pair} />);

  return (
    <div className={className}>
      <div className="show">
        <img src={nft.image} alt="" />
      </div>
      <Text fontSize="18px" bold mb={{ xs: '16px', md: '24px' }} mt={{ xs: '16px', md: '24px' }}>
        {nft.name}#{nft.id}
      </Text>
      <Button height="40px" width="180px" variant={'secondary'} onClick={onMint}>
        Mint
      </Button>
    </div>
  );
};

export default styled(Nft)`
  width: 300px;
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 224px;
  }
  background: #122124;
  border: 2px solid #1e3337;
  border-radius: 12px;
  padding: 12px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  > .show {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
    ${({ theme }) => theme.mediaQueries.sm} {
      height: 200px;
    }
    width: 100%;
    background: #1b383e;
    /* background: radial-gradient(circle, #2a6c6e, #43238c); */
    border-radius: 8px;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
`;
