import styled from "styled-components";
import {AccountIco, HomeIco, MenuIco} from "../../../assets/icon/Svg";
import {useRecoilState} from "recoil";
import menuAtom from "../../../recoil/menuAtom";
import {useEffect} from "react";

const TitleWrap = styled.div`
  width: 100%;
  display: flex;
  text-align: center;
  color: #F7F7F7;
  align-items: center;
  margin-top: 10px;
`

const InfoWrap = styled.div`
  flex: 1;
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

const P = styled.p`
  flex: 2;
  display: inline-block;
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 25px;
  text-align: center;

`
const Title = () => {

  const [menuState, setMenuState] = useRecoilState(menuAtom)

  return<TitleWrap>

    <InfoWrap>
      <HomeIco />
    </InfoWrap>

    <P> 메인페이지 </P>

    <InfoWrap>
      <AccountIco />
      <a onClick={() => setMenuState({isOpen: !menuState.isOpen})}>
        <MenuIco/>
      </a>
    </InfoWrap>

  </TitleWrap>
}

export default Title
