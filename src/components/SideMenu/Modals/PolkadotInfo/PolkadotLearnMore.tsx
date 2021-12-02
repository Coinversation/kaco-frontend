import React, { FC } from 'react';
import styled from 'styled-components';
const PolkadotLearnMore_TSX: FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={className}>
      <a href="https://contraposition.feishu.cn/docs/doccnjMeHVmO4zz5t2YJw8Yatid" target="_blank" rel="noreferrer">
        Learn More&gt;&gt;
      </a>
    </div>
  );
};

const PolkadotLearnMore = styled(PolkadotLearnMore_TSX)`
  a {
    display: block;
    text-align: center;
    font-weight: bold;
    color: #f1842c;
    font-size: 14px;
    margin-top: 10px;
    margin-bottom: 24px;
  }
`;
export default PolkadotLearnMore;
