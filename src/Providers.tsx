import React from 'react';
import { ModalProvider, dark } from '@kaco/uikitv2';
import { Web3ReactProvider } from '@web3-react/core';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
// import { useThemeManager } from 'state/user/hooks';
import { getLibrary } from 'utils/web3React';
import { LanguageProvider } from 'contexts/Localization';
import { RefreshContextProvider } from 'contexts/RefreshContext';
import { ToastsProvider } from 'contexts/ToastsContext';
import store from 'state';
import { PriceProvider } from 'contexts/PriceProvider';

const ThemeProviderWrapper = (props) => {
  // const [isDark] = useThemeManager();
  return <ThemeProvider theme={dark} {...props} />;
};

const Providers: React.FC = ({ children }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Provider store={store}>
        <ToastsProvider>
          <HelmetProvider>
            <ThemeProviderWrapper>
              <LanguageProvider>
                <RefreshContextProvider>
                  <PriceProvider>
                    <ModalProvider>{children}</ModalProvider>
                  </PriceProvider>
                </RefreshContextProvider>
              </LanguageProvider>
            </ThemeProviderWrapper>
          </HelmetProvider>
        </ToastsProvider>
      </Provider>
    </Web3ReactProvider>
  );
};

export default Providers;
