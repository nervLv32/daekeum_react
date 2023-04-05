import styled from "styled-components";
import { AccountIco, HomeIco, MenuIco } from "../../../assets/icon/Svg";
import { useRecoilState } from "recoil";
import menuAtom from "../../../recoil/menuAtom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TitleWrap = styled.div`
  width: 100%;
  display: flex;
  text-align: center;
  color: #F7F7F7;
  align-items: center;
  margin-top: 10px;
  padding: 0 20px;
  justify-content: space-between;
`

const TitleText = styled.p`
  font-size: 17px;
  font-weight: 500;
  color: #fff;
`

const InfoWrap = styled.div`
  svg{
    position: relative;
    top: 50%;
    flex: 1;
    fill: #F7F7F7;
    justify-content: center;
    margin-right: 10px;
    height: 22px;
  }
`

const Title = () => {

  const [menuState, setMenuState] = useRecoilState(menuAtom)

  return <TitleWrap>

    <InfoWrap>
      <button onClick={() => setMenuState({ isOpen: !menuState.isOpen })}>
        <HomeIco />
      </button>
    </InfoWrap>

    <TitleText> 메인페이지 </TitleText>

    <InfoWrap>
      <AccountIco />
      <MenuIco />
    </InfoWrap>

  </TitleWrap>
}

export default Title
