import React, { useRef } from 'react';
import styled from 'styled-components';
import { Pool } from 'state/types';
import PoolRow from './PoolRow';

interface PoolsTableProps {
  data: Pool[];
  userDataReady: boolean;
  account: string;
}

const Container = styled.div`
  filter: ${({ theme }) => theme.card.dropShadow};
  width: 100%;
  background: ${({ theme }) => theme.card.background};
  border-bottom: 1px solid #122124;
`;

const TableWrapper = styled.div`
  overflow: visible;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  font-size: 14px;
  // border-radius: 4px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
`;

const TableBody = styled.tbody`
  & tr {
    background: #1f373b;
    td {
      font-size: 16px;
      vertical-align: middle;
    }
  }
`;

const TableContainer = styled.div`
  position: relative;
  table tr:last-child td:first-child {
    // border-bottom-left-radius: 10px;
  }

  table tr:last-child td:last-child {
    // border-bottom-right-radius: 10px;
  }
  table tr:first-child td:first-child {
    // border-top-left-radius: 10px;
  }

  table tr:first-child td:last-child {
    // border-top-right-radius: 10px;
  }
`;
const PoolsTable: React.FC<PoolsTableProps> = ({ data, userDataReady, account }) => {
  const tableWrapperEl = useRef<HTMLDivElement>(null);

  return (
    <Container>
      <TableContainer>
        <TableWrapper ref={tableWrapperEl}>
          <StyledTable>
            <TableBody>
              {data.map((pool, index) => (
                <PoolRow
                  key={index}
                  pool={pool}
                  account={account}
                  userDataReady={userDataReady}
                  isLast={index === data.length - 1}
                />
              ))}
            </TableBody>
          </StyledTable>
        </TableWrapper>
      </TableContainer>
    </Container>
  );
};

export default PoolsTable;
