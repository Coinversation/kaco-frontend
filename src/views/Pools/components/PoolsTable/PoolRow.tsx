import React, { useState } from 'react';
import styled from 'styled-components';
import { useMatchBreakpoints } from '@kaco/uikit';
import { Pool } from 'state/types';
import { useCakeVault } from 'state/pools/hooks';
import useDelayedUnmount from 'hooks/useDelayedUnmount';
import NameCell from './Cells/NameCell';
import EarningsCell from './Cells/EarningsCell';
import AprCell from './Cells/AprCell';
import TotalStakedCell from './Cells/TotalStakedCell';
import EndsInCell from './Cells/EndsInCell';
import Details from './Cells/ExpandActionCell';
import ActionPanel from './ActionPanel/ActionPanel';
import CellLayout from './Cells/CellLayout';
import { useTranslation } from 'contexts/Localization';
import FarmDetails from "views/Farms/components/FarmTable/Details"
import { useFarmUser } from 'state/farms/hooks';
import FarmActionPanel from "views/Farms/components/FarmTable/Actions/ActionPanel"
interface PoolRowProps {
  pool: Pool | any;
  account: string;
  userDataReady: boolean;
  isLast: boolean;
}

const StyledTr = styled.tr<{ isLast: boolean }>`
  cursor: pointer;
  ${(props) => !props.isLast && 'border-bottom: 1px solid #122124;'}
`;

const CellInner = styled.div`
  padding: 24px 0px;
  display: flex;
  width: 100%;
  align-items: center;
  padding-right: 8px;

  ${({ theme }) => theme.mediaQueries.xl} {
    padding-right: 32px;
  }
`;

const PoolRow: React.FC<PoolRowProps> = (props) => {
  const { pool, account, userDataReady, isLast } = props
  const { t } = useTranslation();
  const { isXs, isSm, isMd, isLg, isXl } = useMatchBreakpoints();
  const [actionPanelExpanded, setActionPanelExpanded] = useState(false);
  const hasStakedAmount = !!useFarmUser(pool.pid, 'farm')?.stakedBalance.toNumber();
  const [farmActionPanelExpanded, setFarmActionPanelExpanded] = useState(hasStakedAmount);
  const shouldRenderChild = useDelayedUnmount(actionPanelExpanded, 300);
  
  const farmShouldRenderChild = useDelayedUnmount(actionPanelExpanded, 300);

  const toggleActionPanel = () => {
    setActionPanelExpanded((prev) => !prev);
  };

  const {
    fees: { performanceFee },
  } = useCakeVault();
  const performanceFeeAsDecimal = performanceFee && performanceFee / 100;
  console.log(pool);
  const handleRenderRow = () => {
    if (!isXs && !isSm) {
    }
    return (
      <StyledTr onClick={toggleActionPanel} isLast={isLast}>
        <td>
          <CellInner>
            <CellLayout>
              <NameCell pool={pool} />
            </CellLayout>
          </CellInner>
        </td>
        <td>
          <CellInner>
            <EarningsCell pool={pool} account={account} userDataReady={userDataReady} />
          </CellInner>
        </td>
        <td>
          <AprCell pool={pool} performanceFee={performanceFeeAsDecimal} />
        </td>
        {(isLg || isXl) && (
          <td>
            <CellLayout label={t('Total staked')}>
              <TotalStakedCell
                decimals={pool.stakingToken.decimals}
                symbol={pool.stakingToken.symbol}
                totalStaked={pool.totalStaked}
              />
            </CellLayout>
          </td>
        )}

        {isXl && (
          <td>
            <EndsInCell pool={pool} />
          </td>
        )}
        <td>
          <CellInner>
            <CellLayout>
              {
                pool.pid ?
                  <FarmDetails actionPanelToggled={actionPanelExpanded} /> :
                  <Details actionPanelToggled={actionPanelExpanded} />
            } 
            </CellLayout>
          </CellInner>
        </td>
      </StyledTr>
    );
  };
  return (
    <>
      {handleRenderRow()}
      {shouldRenderChild && (
        <tr>
          <td colSpan={6}>
            <ActionPanel
              account={account}
              pool={pool}
              userDataReady={userDataReady}
              actionPanelExpanded={actionPanelExpanded}
              breakpoints={{ isXs, isSm, isMd, isLg, isXl }}
            />
          </td>
        </tr>
      )}
       {farmShouldRenderChild && (
        <tr>
          <td colSpan={6}>
            <FarmActionPanel
  //             apr={
  //                 apr: string;
  //                 apy: string;
  //                 multiplier: string;
  //                 lpLabel: string;
  //                 tokenAddress?: Address;
  //                 quoteTokenAddress?: Address;
  //                 cakePrice: BigNumber;
  //                 originalValue: number;
  //                 hideButton?: boolean;
  //             }
  //           multiplier={
  //               multiplier: string;
  //             }
  //           liquidity={
  // liquidity: BigNumber;
              
  //             }
  //                 details={
  //              apr?: number;
  //              apy?: number;
  //              lpRewardsApr?: number;
  //              liquidity?: BigNumber;
  //           }
  //             userDataReady: boolean;
  //           expanded: boolean;
          
  apr={
                    "apr": "0",
                    apy: "0",
                    multiplier: "0",
                    lpLabel: "0",
                    tokenAddress?: "0",
                    quoteTokenAddress:  "0",
                    cakePrice:  "0",
                    originalValue: "0",
                    hideButton: "0",
                }
              multiplier={
                  multiplier: "string"
                }
              liquidity={
    liquidity: new BigNumber(0)
                }
                    details={
                 apr: 0,
                 apy: 0,
                 lpRewardsApr:0,
                 liquidity:  new BigNumber(0)
              }
                userDataReady={false}
          
 expanded={farmActionPanelExpanded} />
          </td>
        </tr>
      )}
    </>
  );
};

export default PoolRow;
