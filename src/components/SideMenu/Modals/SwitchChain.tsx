import React from 'react';
import { Text, Flex, useTooltip } from '@kaco/uikit';
import BscSvg from '../imgs/icon_bsc.svg';
import SelectedSvg from '../imgs/icon_select.svg';
import SdnSvg from '../imgs/icon_sd.png';
import SlSvg from '../imgs/icon_sl.svg';

const chainKey = 'BSC';
const SwitchChain = () => {
  const { targetRef, tooltip, tooltipVisible } = useTooltip(SwitchChainTooltip, {
    trigger: 'click',
    tootipStyle: { background: '#1F252A', padding: '20px 30px' },
    placement: 'top-end',
    hideArrow: true,
    tooltipOffset: [20, 10],
  });
  return (
    <>
      {tooltipVisible && tooltip}
      <Flex
        style={{ cursor: 'pointer', transition: 'all .3s ease' }}
        ref={targetRef}
        alignItems="center"
        borderRadius="12px"
        border={`1.4px solid ${tooltipVisible ? '#1BD3D5' : '#238485'}`}
        height="36px"
        width="100px"
        justifyContent="space-between"
        padding="0px 16px"
        mr="16px"
      >
        {/*  @ts-ignore */}
        {chainKey === 'SDN' ? (
          <>
            <img style={{ width: '16px' }} src={SdnSvg} alt="" />
            <Text color="#1BD3D5" fontSize="14px" bold>
              SDN
            </Text>
          </>
        ) : (
          <>
            <img style={{ width: '16px' }} src={BscSvg} alt="" />
            <Text color="#1BD3D5" fontSize="14px" bold>
              BSC
            </Text>
          </>
        )}
        <img
          style={{ width: '8px', height: '4px', transform: tooltipVisible ? '' : 'scaleY(-1)' }}
          src={SlSvg}
          alt=""
        />
      </Flex>
    </>
  );
};

export default SwitchChain;
const SwitchChainTooltip = (
  <div>
    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#1BD3D5' }}>Select a Network</h3>
    <Text fontSize="12px" bold mb="26px" mt="12px" color="#fff">
      {/*  @ts-ignore */}
      You are currently browsing Kaco on {chainKey === 'SDN' ? 'SDN' : 'BSC'} network
    </Text>
    <Flex
      style={{ cursor: 'pointer' }}
      mb="12px"
      py="14px"
      px="19px"
      alignItems="center"
      justifyContent="space-between"
      background="#272E32"
      borderRadius="16px"
      onClick={() => (window.location.href = 'https://www.kaco.finance/')}
    >
      <Flex alignItems="center">
        <img src={BscSvg} width="24px" alt="" />
        <Text color="white" fontSize="16px" bold ml="21px">
          BSC
        </Text>
      </Flex>
      {/*  @ts-ignore */}
      {chainKey === 'SDN' ? null : <img src={SelectedSvg} style={{ width: '24px' }} alt="" />}
    </Flex>

    <Flex
      style={{ cursor: 'pointer' }}
      mb="12px"
      py="14px"
      px="19px"
      alignItems="center"
      justifyContent="space-between"
      background="#272E32"
      borderRadius="16px"
      onClick={() => (window.location.href = 'https://shiden.kaco.finance/')}
    >
      <Flex alignItems="center">
        <img src={SdnSvg} width="24px" alt="" />
        <Text color="white" fontSize="16px" bold ml="21px">
          SDN
        </Text>
      </Flex>
      {/*  @ts-ignore */}
      {chainKey === 'SDN' ? <img src={SelectedSvg} style={{ width: '24px' }} alt="" /> : null}
    </Flex>
  </div>
);