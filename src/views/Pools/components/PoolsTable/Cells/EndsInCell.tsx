import React from 'react';
import { Text } from '@kaco/uikit';
import { Pool } from 'state/types';
import { useBlock } from 'state/block/hooks';
import { useTranslation } from 'contexts/Localization';
import { getPoolBlockInfo } from 'views/Pools/helpers';
import CellLayout from './CellLayout';

interface FinishCellProps {
  pool: Pool;
}

const EndsInCell: React.FC<FinishCellProps> = ({ pool }) => {
  const { currentBlock } = useBlock();
  const { t } = useTranslation();

  const { shouldShowBlockCountdown, hasPoolStarted } = getPoolBlockInfo(pool, currentBlock);

  return (
    <CellLayout label={hasPoolStarted || !shouldShowBlockCountdown ? t('Ends in') : t('Starts in')}>
      {/* {showLoading ? <Skeleton width="80px" height="16px" /> : renderBlocks} */}
      <Text>-</Text>
    </CellLayout>
  );
};

export default EndsInCell;
