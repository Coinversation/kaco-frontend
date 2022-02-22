import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FarmWithStakedValue } from 'views/Farms/components/FarmCard/FarmCard';
import { useMatchBreakpoints } from '@kaco/uikit';
import { useTranslation } from 'contexts/Localization';
import useDelayedUnmount from 'hooks/useDelayedUnmount';
import { useFarmUser } from 'state/farms/hooks';

import Apr, { AprProps } from './Apr';
import Farm, { FarmProps } from './Farm';
import Earned, { EarnedProps } from './Earned';
import Details from './Details';
import Multiplier, { MultiplierProps } from './Multiplier';
import Liquidity, { LiquidityProps } from './Liquidity';
import ActionPanel from './Actions/ActionPanel';
import CellLayout from './CellLayout';
import { DesktopColumnSchema, MobileColumnSchema } from '../types';

export interface RowProps {
  apr: AprProps;
  farm: FarmProps;
  earned: EarnedProps;
  multiplier: MultiplierProps;
  liquidity: LiquidityProps;
  details: FarmWithStakedValue;
}

interface RowPropsWithLoading extends RowProps {
  userDataReady: boolean;
  isLast: boolean;
}

const cells = {
  apr: Apr,
  farm: Farm,
  earned: Earned,
  details: Details,
  multiplier: Multiplier,
  liquidity: Liquidity,
};

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

const StyledTr = styled.tr<{ isLast: boolean }>`
  cursor: pointer;
  ${(props) => !props.isLast && 'border-bottom: 1px solid #122124;'}
`;

const EarnedMobileCell = styled.td`
  /* padding: 16px 0 24px 16px; */
`;

const FarmMobileCell = styled.td`
  /* padding-top: 24px; */
`;

const Row: React.FunctionComponent<RowPropsWithLoading> = (props) => {
  const { details, userDataReady } = props;
  const hasStakedAmount = !!useFarmUser(details.pid, 'farm').stakedBalance.toNumber();
  const [actionPanelExpanded, setActionPanelExpanded] = useState(hasStakedAmount);
  const shouldRenderChild = useDelayedUnmount(actionPanelExpanded, 300);
  const { t } = useTranslation();

  const toggleActionPanel = () => {
    setActionPanelExpanded(!actionPanelExpanded);
  };

  useEffect(() => {
    setActionPanelExpanded(hasStakedAmount);
  }, [hasStakedAmount]);

  const { isXl, isXs, isSm } = useMatchBreakpoints();

  const isMobile = !isXl;
  const tableSchema = isMobile ? MobileColumnSchema : DesktopColumnSchema;
  const columnNames = tableSchema.map((column) => column.name);

  const handleRenderRow = () => {
    if (!isXs && !isSm) {
      return (
        <StyledTr onClick={toggleActionPanel} isLast={props.isLast}>
          {Object.keys(props).map((key) => {
            const columnIndex = columnNames.indexOf(key);
            if (columnIndex === -1) {
              return null;
            }

            switch (key) {
              case 'details':
                return (
                  <td key={key}>
                    <CellInner>
                      <CellLayout>
                        <Details actionPanelToggled={actionPanelExpanded} />
                      </CellLayout>
                    </CellInner>
                  </td>
                );
              case 'apr':
                return (
                  <td key={key}>
                    <CellInner>
                      <CellLayout label={t('APR')}>
                        <Apr {...props.apr} hideButton={isMobile} />
                      </CellLayout>
                    </CellInner>
                  </td>
                );
              default:
                return (
                  <td key={key}>
                    <CellInner>
                      <CellLayout label={t(tableSchema[columnIndex].label)}>
                        {React.createElement(cells[key], { ...props[key], userDataReady })}
                      </CellLayout>
                    </CellInner>
                  </td>
                );
            }
          })}
        </StyledTr>
      );
    }

    return (
      <StyledTr onClick={toggleActionPanel} isLast={props.isLast}>
        <td>
          <FarmMobileCell>
            <CellLayout>
              <Farm {...props.farm} />
            </CellLayout>
          </FarmMobileCell>
        </td>
        <td>
          <EarnedMobileCell>
            <CellLayout label={t('Rewards')}>
              <Earned {...props.earned} userDataReady={userDataReady} />
            </CellLayout>
          </EarnedMobileCell>
        </td>
        <td>
          {/* <AprMobileCell>
            <CellLayout label={t('APR')}>
              <Apr {...props.apr} hideButton />
            </CellLayout>
          </AprMobileCell> */}
        </td>
        <td>
          <CellInner>
            <CellLayout>
              <Details actionPanelToggled={actionPanelExpanded} />
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
            <ActionPanel {...props} expanded={actionPanelExpanded} />
          </td>
        </tr>
      )}
    </>
  );
};

export default Row;
