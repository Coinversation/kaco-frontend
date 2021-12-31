import React from 'react';
import { Text } from '@kaco/uikit';
import styled from 'styled-components';
const TextStyle = styled(Text)`
  font-size: 12px;
  text-align: center;
  font-weight: 600;
  padding-bottom: 10px;
  color: #9da6a6;
  padding-top: 24px;
`;
const StakeTableReceive = ({ receiveText }: { receiveText: string }) => {
  return <TextStyle>{receiveText}</TextStyle>;
};
export default StakeTableReceive;
