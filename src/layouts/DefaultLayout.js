import {Outlet} from 'react-router-dom'
import BottomNavigation from "../components/BottomNavigation";


const DefaultLayout = () => {
  return <>
    {/* 상단 메뉴 (home _ yes or no) */}
    <div>

    </div>
    <Outlet />

    <BottomNavigation />
  </>
}


export default DefaultLayout
