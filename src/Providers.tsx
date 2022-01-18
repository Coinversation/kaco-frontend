import React from 'react';
import { ModalProvider, dark } from '@kaco/uikit';
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
import { TotalLiquidityProvider } from 'contexts/TotalLiquidityProvider';

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
                  <ModalProvider>
                    <TotalLiquidityProvider>{children}</TotalLiquidityProvider>
                  </ModalProvider>
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
