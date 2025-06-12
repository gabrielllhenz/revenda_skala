import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0; padding: 0; box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', sans-serif;
    background-color: #ecf0f1;
    color: #2c3e50;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;
