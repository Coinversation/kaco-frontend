import { Text, Flex } from '@kaco/uikit';
import { useRouteMatch, Link } from 'react-router-dom';
import { useTranslation } from 'contexts/Localization';
import React from 'react';
import styled from 'styled-components';
import { ButtonMenu, ButtonMenuItem, NotificationDot } from '@kaco/uikit';
import LogoPng from './PoolHeader.svg';
import Toggle from 'components/Menu/GlobalSettings/Toggle';
import Search from 'components/Search';
const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  word-break: break-all;
  margin-right: 12px;
  ${({ theme }) => theme.mediaQueries.sm} {
    margin-bottom: 0;
  }
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 34px;
  background-color: #122124;
  height: 34px;
  border: 1px solid #1f373b;
  a {
    padding-left: 12px;
    padding-right: 12px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    margin-left: 16px;
  }
`;
const WrapperButtonMenu = styled(ButtonMenu)`
  padding: 0;
  border-radius: 32px;
  height: 32px;
`;
const PoolHeader: React.FC<{
  className?: string;
  filter: string;
  stakedOnly: boolean;
  hasStakeInFinishedPools: boolean;
  onStakedOnlyChange: (now: boolean) => void;
  onFilterChange: (now: string) => void;
  placeholder: string;
}> = ({ className, onStakedOnlyChange, filter, onFilterChange, stakedOnly, hasStakeInFinishedPools, placeholder }) => {
  const { url, isExact } = useRouteMatch();
  const { t } = useTranslation();
  const liveOrFinishedSwitch = (
    <Wrapper>
      <WrapperButtonMenu activeIndex={isExact ? 0 : 1} scale="sm" variant="primary">
        <ButtonMenuItem
          as={Link}
          style={{ color: isExact ? '#fff' : '#9DA6A6', borderRadius: '32px', margin: 0 }}
          to={`${url}`}
          // onClick={() => {
          //   console.log
          //   window.open(url);
          // }}
        >
          {t('Live')}
        </ButtonMenuItem>
        <NotificationDot show={false}>
          <ButtonMenuItem
            id="finished-pools-button"
            style={{ color: isExact ? '#9DA6A6' : '#fff', borderRadius: '32px', margin: 0 }}
            as={Link}
            to={`${url}/history`}
          >
            {t('Finished')}
          </ButtonMenuItem>
        </NotificationDot>
      </WrapperButtonMenu>
    </Wrapper>
  );
  const stakedOnlySwitch = (
    <ToggleWrapper>
      <Text color="textSubtle" mr="12px" bold>
        {t('Staked only')}
      </Text>
      <Toggle checked={stakedOnly} onChange={() => onStakedOnlyChange(!stakedOnly)} />
    </ToggleWrapper>
  );
  return (
    <Flex className={className} justifyContent="space-between ">
      <div className="left">
        <img src={LogoPng} alt="LogoPng" />
        <Text color="#1BD3D5" fontSize="20px">
          {t('Just stake some tokens to earn.')}
        </Text>
        <Text color="#1BD3D5" fontSize="20px">
          {t('High APR, low risk')}
        </Text>
      </div>
      <div className="right">
        <HeaderFlex>
          {stakedOnlySwitch}
          {liveOrFinishedSwitch}
        </HeaderFlex>
        <Search value={filter} onChange={onFilterChange} placeholder={placeholder} />
      </div>
    </Flex>
  );
};
const HeaderFlex = styled(Flex)`
  align-items: center;
  margin-bottom: 16px;
  justify-content: start;
  flex-wrap: wrap;
  ${({ theme }) => theme.mediaQueries.xl} {
    justify-content: flex-end;
  }
`;
export default styled(PoolHeader)`
  padding-top: 11px;
  margin-bottom: 44px;
  flex-wrap: wrap;
  > .left {
    max-width: 404px;
    > div {
      font-size: 20px;
      line-height: 40px;
      font-family: Microsoft YaHei;
      font-weight: 900;
      color: #1bd3d5;
    }
    > img {
      height: 55px;
      margin-bottom: 20px;
    }
    margin-bottom: 0;
    ${({ theme }) => theme.mediaQueries.sm} {
      margin-bottom: 25px;
    }
  }
  > .right {
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    flex: 1;
    max-width: 460px;
    min-width: 300px;
  }
`;
