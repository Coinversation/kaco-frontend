import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { Text, Flex, Heading } from '@kaco/uikitv2';
import { MorePathConfig, IMenuDetail } from '../config';
import imageNftBg from '../imgs/image_nft_bg.png';
import IconKarsier from '../imgs/iconKarsier';
import IconIn from '../imgs/iconIn';
const MoreContentIn = () => {
  const { pathname } = useLocation();
  return (
    <MoreContentWrap>
      <Fl>
        <PositionBg src={imageNftBg} />
        <IconKarsierWrap>
          <IconKarsier />
        </IconKarsierWrap>
        <Heading>Karsier</Heading>
        <Text>
          Karsier is the smallest primate in the world. Karsier came to the blockchain world to create some fun for us.
          Following the logic of evolution
        </Text>
        <a href="https://karsier.kaco.finance/" target="_blank" rel="noreferrer">
          <i>To Karsier</i>
          <IconIn />
        </a>
      </Fl>
      <Fr>
        {MorePathConfig.map((item: IMenuDetail, index) => (
          <NavLink
            to={item.link}
            key={index}
            onClick={() => {
              if (item.link.indexOf('https://') > -1) {
                window.open(item.link);
                return;
              }
            }}
            active={pathname.startsWith(item.link) ? 't' : 'f'}
          >
            <div className="icon-holder">{item.img()}</div>
            <div className="fr">
              <h3>{item.text}</h3>
              <DetailText>{item.detail}</DetailText>
            </div>
          </NavLink>
        ))}
      </Fr>
    </MoreContentWrap>
  );
};
const PositionBg = styled.img`
  position: absolute;
  width: 140px;
  top: -20px;
  right: 230px;
`;
const Content = styled.div`
  padding-left: 20px;
`;
const IconKarsierWrap = styled.div`
  padding-bottom: 20px;
  svg {
    width: 36px;
    fill: ${({ theme }) => theme.colors.text};
  }
`;
const MoreContentWrap = styled(Flex)`
  align-items: start;
  justify-content: space-between;
  background: #171e1e;
  background-image: linear-gradient(90deg, rgba(27, 211, 213, 0.4) 0%, rgba(27, 211, 213, 0.2) 99%);
`;
const Fl = styled.div`
  padding: 28px 23px;
  min-width: 280px;
  position: relative;
  svg {
    width: 20px;
  }
`;
const Fr = styled.div`
  padding: 10px 20px 40px;
  background-color: ${({ theme }) => theme.colors.cardBackground};
`;
const DetailText = styled(Text)`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 12px;
  font-weight: 500;
`;
const NavLink = styled(Link)<{ active: 't' | 'f' }>`
  width: 100%;
  display: flex;
  align-items: start;
  font-size: 16px;
  transition: all 0.3s ease;
  font-weight: bolder;
  margin-right: 34px;
  padding: 10px 10px 12px;
  border-radius: 12px;
  margin-top: 10px;
  background-color: ${({ theme, active }) => (active === 't' ? theme.colors.cardBorder : theme.colors.cardBackground)};
  svg {
    width: 36px;
    height: 36px;
    margin-right: 12px;
    fill: ${({ theme, active }) => (active === 't' ? theme.colors.primary : theme.colors.text)};
  }
  h3 {
    padding: 4px 0;
    color: ${({ theme, active }) => (active === 't' ? theme.colors.primary : theme.colors.text)};
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.cardBorder};
    h3 {
      color: ${({ theme }) => theme.colors.primary};
    }
    svg {
      fill: ${({ theme }) => theme.colors.primary};
    }
  }
`;
const MoreContent = (
  <>
    <MoreContentIn />
  </>
);
export default MoreContent;
