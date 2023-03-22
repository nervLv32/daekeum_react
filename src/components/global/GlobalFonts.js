import { createGlobalStyle } from "styled-components";
import NotoSansKR_Black from '../../assets/fonts/NotoSansKR-Black.otf'
import NotoSansKR_Bold from '../../assets/fonts/NotoSansKR-Bold.otf'
import NotoSansKR_Light from '../../assets/fonts/NotoSansKR-Light.otf'
import NotoSansKR_Medium from '../../assets/fonts/NotoSansKR-Medium.otf'
import NotoSansKR_Regular from '../../assets/fonts/NotoSansKR-Regular.otf'
import NotoSansKR_Thin from '../../assets/fonts/NotoSansKR-Thin.otf'

export default createGlobalStyle`
  @font-face {
    font-family: 'Noto Sans KR';
    src: url(${NotoSansKR_Black}) format(otf);
    font-weight: 600;
    font-style: normal;
  }
  @font-face {
    font-family: 'Noto Sans KR';
    src: url(${NotoSansKR_Bold}) format(otf);
    font-weight: 500;
    font-style: normal;
  }
  @font-face {
    font-family: 'Noto Sans KR';
    src: url(${NotoSansKR_Light}) format(otf);
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: 'Noto Sans KR';
    src: url(${NotoSansKR_Medium}) format(otf);
    font-weight: 300;
    font-style: normal;
  }
  @font-face {
    font-family: 'Noto Sans KR';
    src: url(${NotoSansKR_Regular}) format(otf);
    font-weight: 200;
    font-style: normal;
  }
  @font-face {
    font-family: 'Noto Sans KR';
    src: url(${NotoSansKR_Thin}) format(otf);
    font-weight: 100;
    font-style: normal;
  }
  `
