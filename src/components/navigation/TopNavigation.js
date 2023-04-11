import styled from "styled-components";
import Title from "./item/Title";
import UserInfo from "./item/UserInfo";
import MainBtnWrap from "./item/MainBtnWrap";
import InfoWrap from "../atom/InfoWrap";
import { useLocation } from "react-router-dom";

const TopNaviWrap = styled.div`
  position: relative;
  width: 100vw;
  /* Primary */

  background: #1F319D;
  z-index: 10;
  /* border-radius:0 0 20px 20px; */
  padding: 10px 10px 20px;
  color: white;
  border-radius: 20px 20px 0 0;
`

const TopBg = styled.div`
  display: block;
  width: 298px;
  height: 113px;
  background: url('images/main-btnwrap-bg.png') no-repeat 100% bottom;
  position: absolute;
  top: 20px;
  right: 0;
  z-index: -1;
`

const TopNavigation = () => {
  const location = useLocation();
  
  return<TopNaviWrap>
    <Title />

    {/* 이거 홈이외에서만나와요 */}
    {
      location.pathname !== "/" && (
        <TopBg />
      )
    }
  </TopNaviWrap>
}

export default TopNavigation
