import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`

  /* S: font */
  @font-face {
    font-family: "Montserrat";
    font-weight: 200;
    font-style: normal;
    src: url('../fonts/Montserrat/Montserrat-Thin.ttf') format("ttf");
  }

  @font-face {
    font-family: "Montserrat";
    font-weight: 300;
    font-style: normal;
    src: url('../fonts/Montserrat/Montserrat-Light.ttf') format("ttf");
  }

  @font-face {
    font-family: "Montserrat";
    font-weight: 400;
    font-style: normal;
    src: url('../fonts/Montserrat/Montserrat-Regular.ttf') format("ttf");
  }

  @font-face {
    font-family: "Montserrat";
    font-weight: 500;
    font-style: normal;
    src: url('../fonts/Montserrat/Montserrat-Medium.ttf') format("ttf");
  }

  @font-face {
    font-family: "Montserrat";
    font-weight: 600;
    font-style: normal;
    src: url('../fonts/Montserrat/Montserrat-SemiBold.ttf') format("ttf");
  }

  @font-face {
    font-family: "Montserrat";
    font-weight: 700;
    font-style: normal;
    src: url('../fonts/Montserrat/Montserrat-Bold.ttf') format("ttf");
  }

  @font-face {
    font-family: "SpoqaHanSans";
    font-weight: normal;
    font-style: normal;
    src: url('/fonts/SpoqaHanSansRegular.ttf') format("ttf");
  }

  @font-face {
    font-family: "SpoqaHanSans";
    font-weight: normal;
    font-style: normal;
    src: url('../../assets/fonts/SpoqaHanSansRegular.ttf') format("ttf");
  }

  :root {
    --font-mont: 'Montserrat'
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  body, root, p {
    font-family: 'Noto Sans KR', sans-serif;
    margin: 0;
    padding: 0;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    &::-webkit-scrollbar {
      display: none;
    }
  }

  #root {
    width: 100vw;
    height: 100vh;
  }

  a {
    text-decoration: none;
    color: #1C1B1F;
  }


  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video, button {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    vertical-align: baseline;
    box-sizing: border-box;
    letter-spacing: 0.03em;
  }

  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, menu, nav, section {
    display: block;
  }

  html {
    scroll-behavior: smooth;
    font-size: 10px;
  }

  body {
    line-height: 1;
    cursor: default;
    letter-spacing: -0.03em;
    font-size: 1.4rem;
    font-weight: 400;
    /*overflow-x: hidden;
    font-stretch: 1% 500%; */
  }

  ol, ul, li {
    list-style: none;
  }

  blockquote, q {
    quotes: none;
  }

  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }

  table, tr, th, td {
    border-collapse: collapse;
    border-spacing: 0;
  }

  a {
    color: #000;
    text-decoration: none;
  }

  img {
    vertical-align: bottom;
  }

  img, audio, object, embed, iframe {
    vertical-align: middle;
    max-width: 100%;
  }


  /* Help Class Setting */
  /* ir(image replace) - 이미지 대체(치환)기법 */

  .ir {
    display: block;
    width: 100%;
    height: 100%;
    text-indent: -9999px;
    overflow: hidden;
    background: no-repeat 0 0;
  }

  /* 플롯해제 클래스 */
  .clearfix::after {
    content: '';
    display: block;
    clear: both;
  }

  /* 화면 감추기 클래스 */
  .screen-hidden {
    display: block !important;
    width: 0px !important;
    height: 0px !important;
    font-size: 0px !important;
    text-indent: -9999px;
    overflow: hidden;
    margin: 0;
    padding: 0;
    border: 0 !important;
  }


  input, textarea {
    -webkit-appearance: none;
    -webkit-border-radius: 0;
    font-family: 'Noto Sans KR', sans-serif;
    &::placeholder{
      color: #9DA2AE;
    }
  }

  /* IE10 이상에서 input box 에 추가된 지우기 버튼 제거 */
  input::-ms-clear {
    display: none;
  }

  /* input type number 에서 화살표 제거 */
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  /* 드래그 시 텍스트 변화*/
  ::selection {
    background-color: #000;
    color: #fff;
  }


  * {
    box-sizing: border-box;
  }

  button {
    cursor: pointer;
    background: none;
  }

  /* E: font */

`;


export default GlobalStyle;
