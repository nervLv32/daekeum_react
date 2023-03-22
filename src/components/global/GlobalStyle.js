import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
  }
  
  a{
    text-decoration: none;
    color: #1C1B1F;
  }
`;

export default GlobalStyle;
