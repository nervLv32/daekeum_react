import {Outlet} from 'react-router-dom'
import BottomNavigation from "../components/navigation/BottomNavigation";
import TopNavigation from "../components/navigation/TopNavigation";
import styled from "styled-components";
import Navigation from "./navigation/Navigation";
import {useRecoilState} from "recoil";
import menuAtom from "../recoil/menuAtom";

const DefaultWrap = styled.div`
  padding-bottom: 80px;
`

const DefaultLayout = () => {
  const [menuState, setMenuState] = useRecoilState(menuAtom)

  return <>
    {/* 상단 메뉴 (home _ yes or no) */}
    <DefaultWrap>
      <TopNavigation />
      <Outlet />
    </DefaultWrap>
    {/*{menuState.isOpen ? <Navigation /> : null}*/}
    <BottomNavigation />
  </>
}


export default DefaultLayout
