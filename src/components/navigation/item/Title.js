import styled from "styled-components";
import { AccountIco, HomeIco, MenuIco } from "../../../assets/icon/Svg";
import { useRecoilState } from "recoil";
import menuAtom from "../../../recoil/menuAtom";
import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate, useNavigation } from "react-router-dom";

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
  const [pageName, setpageName] = useState("메인페이지")

  const location = useLocation();

  const currentPage = [
    {
      pathname: '/',
      title : '메인페이지'
    },
    {
      pathname: '/receipt',
      title : '고객접수'
    },
    {
      pathname: '/regis',
      title : '통합등록'
    },
    {
      pathname: '/inventory',
      title : '재고'
    },
    {
      pathname: '/inventory/request',
      title : '자재요청'
    },
    {
      pathname: '/inventory/wait',
      title : '입고대기'
    },
    {
      pathname: '/report',
      title : '입출고서류상신'
    },
    {
      pathname: '/sale',
      title : '영업등록'
    },
  ]

  const getPageName = () => {
    for(let i = 0; i < currentPage.length; i++) {
      if (currentPage[i].pathname === location.pathname) {
        setpageName(currentPage[i].title);
      } 
    }
  }
  useEffect(() => {
    getPageName();
  }, [location.pathname]);

  return <TitleWrap>

    <InfoWrap>
      <NavLink to="/">
        <HomeIco />
      </NavLink>
    </InfoWrap>

    <TitleText> {pageName} </TitleText>

    <InfoWrap>
      <AccountIco />
      <button onClick={() => setMenuState({ isOpen: !menuState.isOpen })}>
      <MenuIco />
      </button>
    </InfoWrap>

  </TitleWrap>
}

export default Title
