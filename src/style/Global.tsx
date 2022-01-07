import { createGlobalStyle } from 'styled-components';
// eslint-disable-next-line import/no-unresolved
import { PancakeTheme } from '@kaco/uikitv2/dist/theme';

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PancakeTheme {}
}

const GlobalStyle = createGlobalStyle`
    
  @font-face {
    font-family: 'Microsoft sYaHei';
    font-style: normal;
    font-weight: 400;
    src: url(/fonts/ms-yahei.ttf);
  }
  * {
    font-family: "Microsoft sYaHei";
  }
  html {
    height: 100%;
  }
  
  body {
    height: 100%;
    background-color: ${({ theme }) => theme.colors.background};

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
