import { createGlobalStyle } from 'styled-components';
// eslint-disable-next-line import/no-unresolved
import { PancakeTheme } from '@kaco/uikit/dist/theme';

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Kanit', sans-serif;
  }
  html {
    height: 100%;
  }
  body {
    height: 100%;
    background-color: ${({ theme }) => theme.colors.background};
    font-family: Microsoft YaHei;

    img {
      height: auto;
      max-width: 100%;
    }
    #root {
      min-height: 100%;
      display: flex;
      flex-direction: column;
    }
  }
`;

export default GlobalStyle;
