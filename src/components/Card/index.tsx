import styled from 'styled-components';
import { Box } from '@kaco/uikit';

const Card = styled(Box)<{
  width?: string;
  padding?: string;
  border?: string;
  borderRadius?: string;
}>`
  width: ${({ width }) => width ?? '100%'};
  border-radius: 16px;
  padding: 1.25rem;
  padding: ${({ padding }) => padding};
  border: ${({ border }) => border};
  border-radius: ${({ borderRadius }) => borderRadius};
  /* background-color: ${({ theme }) => theme.colors.background}; */
`;
export default Card;

export const LightCard = styled(Card)``;

export const LightGreyCard = styled(Card)`
  border: 1px solid #238485;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const GreyCard = styled(Card)`
  background-color: ${({ theme }) => theme.colors.dropdown};
`;

export const SolidCard = styled(Card)`
  border: 2px solid #238485;
  background-color: ${({ theme }) => theme.colors.cardBackground};
`;

export const PlainCard = styled(Card)`
  background: #238485;
  border-radius: 8px;
`;

export const DashedPrimayCard = styled(Card)`
  background: #238485;
  border: 1px dashed #238485;
  border-radius: 12px;
`;

export const ErrorCard = styled(Card)`
  background: #1f373b;
  border-radius: 8px;
`;
