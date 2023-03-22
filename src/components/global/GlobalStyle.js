import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body, root, p {
    font-family: 'Noto Sans KR', sans-serif;
    margin: 0;
    padding: 0;
  }
  
  #root{
    width: 100vw;
    height: 100vh;
  }
  
  a{
    text-decoration: none;
    color: #1C1B1F;
  }
`;

export default GlobalStyle;
