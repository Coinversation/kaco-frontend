import React from 'react';
import { Flex, IconButton, useModal } from '@kaco/uikitv2';
import SettingsModal from './SettingsModal';
import SettingSvg from '../../svg/setting.svg';

const GlobalSettings = () => {
  const [onPresentSettingsModal] = useModal(<SettingsModal />);

  return (
    <Flex>
      <IconButton onClick={onPresentSettingsModal} variant="text" scale="sm" ml="8px">
        <img src={SettingSvg} alt="" />
      </IconButton>
    </Flex>
  );
};

export default GlobalSettings;
