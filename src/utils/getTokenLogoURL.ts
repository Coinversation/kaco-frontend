import defaultTokenList from 'config/constants/tokenLists/pancake-default.tokenlist.json';

const getTokenLogoURL = (address: string) => {
  const uri = defaultTokenList.tokens.find(
    (token) => `${token.address}`.toLocaleLowerCase() === `${address}`.toLocaleLowerCase(),
  )?.logoURI;
  return uri || `https://assets.trustwalletapp.com/blockchains/smartchain/assets/${address}/logo.png`;
};

export default getTokenLogoURL;
