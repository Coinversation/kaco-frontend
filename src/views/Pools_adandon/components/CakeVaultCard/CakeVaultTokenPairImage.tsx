import React from 'react';
import { TokenPairImage, ImageProps } from '@kaco/uikitv2';
import tokens from 'config/constants/tokens';
import { getAddress } from 'utils/addressHelpers';

const CakeVaultTokenPairImage: React.FC<Omit<ImageProps, 'src'>> = (props) => {
  const primaryTokenSrc = `/images/tokens/${getAddress(tokens.kaco.address)}.svg`;

  return <TokenPairImage primarySrc={primaryTokenSrc} secondarySrc="/images/tokens/autorenew.svg" {...props} />;
};

export default CakeVaultTokenPairImage;
