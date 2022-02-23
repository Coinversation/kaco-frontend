import React, { useState } from 'react';
import styled from 'styled-components';
import { useMatchBreakpoints } from '@kaco/uikit';
import { PoolFarm } from 'state/types';
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
import FarmDetails from 'views/Farms/components/FarmTable/Details';
import FarmActionPanel from 'views/Farms/components/FarmTable/Actions/ActionPanel';
import { AprProps } from 'views/Farms/components/FarmTable/Apr';

interface PoolRowProps {
  pool: PoolFarm | any;
  account: string;
  userDataReady: boolean;
  farmUserDataReady: boolean;
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
  const { pool, account, userDataReady, farmUserDataReady, isLast } = props;
  const { t } = useTranslation();
  const { isXs, isSm, isMd, isLg, isXl } = useMatchBreakpoints();
  const [actionPanelExpanded, setActionPanelExpanded] = useState(false);
  const [farmActionPanelExpanded, setFarmActionPanelExpanded] = useState(false);
  const shouldRenderChild = useDelayedUnmount(actionPanelExpanded, 300);

  const farmShouldRenderChild = useDelayedUnmount(farmActionPanelExpanded, 300);

  const toggleActionPanel = () => {
    // setFarmActionPanelExpanded
    if (props.pool.pid) {
      setFarmActionPanelExpanded((prev) => !prev);
    } else {
      setActionPanelExpanded((prev) => !prev);
    }
  };

  const {
    fees: { performanceFee },
  } = useCakeVault();
  const performanceFeeAsDecimal = performanceFee && performanceFee / 100;

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
                totalStaked={pool.pid ? pool.lpTotalInQuoteToken : pool.totalStaked}
                isFarm={!!pool.pid}
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
              {pool.pid ? (
                <FarmDetails actionPanelToggled={farmActionPanelExpanded} />
              ) : (
                <Details actionPanelToggled={actionPanelExpanded} />
              )}
            </CellLayout>
          </CellInner>
        </td>
      </StyledTr>
    );
  };

  // console.log({ pool }, pool.lpTotalInQuoteToken);
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
              apr={
                {
                  apr: props.pool.apr,
                  apy: props.pool.apy,
                  multiplier: props.pool.multiplier,
                  lpLabel: props.pool.lpLabel,
                  tokenAddress: props.pool.tokenAddress,
                  quoteTokenAddress: props.pool.quoteTokenAddress,
                  cakePrice: props.pool.cakePrice,
                  originalValue: props.pool.originalValue,
                  hideButton: props.pool.hideButton,
                } as AprProps
              }
              multiplier={{ multiplier: props.pool.multiplier }}
              liquidity={{ liquidity: props.pool.liquidity }}
              details={{ ...props.pool }}
              userDataReady={farmUserDataReady}
              expanded={farmActionPanelExpanded}
            />
          </td>
        </tr>
      )}
    </>
  );
};

export default PoolRow;
