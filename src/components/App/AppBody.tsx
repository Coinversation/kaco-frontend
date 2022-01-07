import React from 'react';
import styled from 'styled-components';
import { Card } from '@kaco/uikitv2';

export const BodyWrapper = styled(Card)`
  border-radius: 24px;
  max-width: 486px;
  width: 100%;
  z-index: 1;
  background: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 20px;
  > div {
    background: rgba(0, 0, 0, 0);
    border-radius: 0px;
  }
`;

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children }: { children: React.ReactNode }) {
  return <BodyWrapper>{children}</BodyWrapper>;
}
