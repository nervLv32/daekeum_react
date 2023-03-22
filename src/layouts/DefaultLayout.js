import {Outlet} from 'react-router-dom'
import BottomNavigation from "../components/navigation/BottomNavigation";
import TopNavigation from "../components/navigation/TopNavigation";


const DefaultLayout = () => {
  return <>
    {/* 상단 메뉴 (home _ yes or no) */}
    <TopNavigation />
    <Outlet />
    <BottomNavigation />
  </>
}


export default DefaultLayout
