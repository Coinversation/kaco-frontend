import React, { FC } from 'react';
import styled from 'styled-components';
import { Flex } from '@kaco/uikit';
import { GetDAppApr } from '../hooks/getApr';
import { IDappStakingInterface } from 'utils/types';
import { IDappPoolDataInterface } from '../hooks/getPoolUpdate';
export const Header = styled(Flex)`
  justify-content: space-between;
  padding: 30px 30px 20px;
`;
export const HeaderLi = styled.div``;
export const HeaderTitleH3 = styled.h3`
  color: #1f373b;
  font-weight: bold;
  font-size: 16px;
  padding-bottom: 6px;
`;
export const HeaderTitleH6 = styled.h6`
  color: #1f373b;
  font-size: 12px;
`;
interface Iprops {
  contract: IDappStakingInterface;
  pool: IDappPoolDataInterface;
}
const StakeTableHeader: FC<Iprops> = ({ contract, pool }) => {
  const _apr = GetDAppApr(contract);
  return (
    <Header>
      <HeaderLi>
        <HeaderTitleH3>{_apr}%</HeaderTitleH3>
        <HeaderTitleH6>APR</HeaderTitleH6>
      </HeaderLi>
      <HeaderLi>
        <HeaderTitleH3>{pool.totalSupply} SDN</HeaderTitleH3>
        <HeaderTitleH6>Total Supply</HeaderTitleH6>
      </HeaderLi>
      <HeaderLi>
        <HeaderTitleH3>1KSDN={pool.ratio}SDN</HeaderTitleH3>
        <HeaderTitleH6>Net value</HeaderTitleH6>
      </HeaderLi>
    </Header>
  );
};
export default StakeTableHeader;
