// Bottom Navigation
import DefaultLayout from "../layouts/DefaultLayout";
import Home from "../pages/Home";
import Receipt from "../pages/Receipt";

import {HomeIco, InvIco, ProdIco, ReceiptIco, RegisIco, SaleIco} from "../assets/icon/Svg";

// Auth
// import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/auth/Login";
// import Join from "../pages/auth/Join";
import Regis from "../pages/Regis";
import Inventory from "../pages/Inventory";
import Report from "../pages/Report";
import Sale from "../pages/Sale";
import RegisSite from "../pages/Regis/regisSite";
import RegisDKNO from "../pages/Regis/regisDKNO";
import RegisEquipment from "../pages/Regis/regisEquipment";
import ComponentTestPage from "../pages/ComponentTestPage";
import SaleVisit from "../pages/Sale/saleVisit";
import SaleSite from "../pages/Sale/saleSite";
import InventoryRequest from "../pages/Inventory/inventoryRequest";
import InventoryWait from "../pages/Inventory/inventoryWait";

const ReceiptList = [
  {title: '접수메인', alias: '', path: 'receipt/', element: <Receipt />},
]

const RegisList = [
  {title: '업체정보', alias: '/regis', path: '/regis', element: <Regis />},
  {title: '현장정보', alias: '/regis/site', path: '/regis/site', element: <RegisSite />},
  {title: '장비정보', alias: '/regis/equipment', path: '/regis/equipment', element: <RegisEquipment />},
  {title: 'DKNO', alias: '/regis/DKNO', path: '/regis/DKNO', element: <RegisDKNO />},
]

const InventoryList = [
  {title: '재고메인', alias: '/inventory', path: '/inventory', element: <Inventory />},
  {title: '자재요청', alias: '/inventory/request', path: '/inventory/request', element: <InventoryRequest />},
  {title: '입고대기', alias: '/inventory/wait', path: '/inventory/wait', element: <InventoryWait />},
]

const ReportList = [
  {title: '상신메인', alias: '', path: 'report/', element: <Report />},
]

const SaleList = [
  {title: '업체정보', alias: '/sale', path: '/sale', element: <Sale />},
  {title: '현장정보', alias: '/sale/site', path: '/sale/site', element: <SaleSite />},
  {title: '방문이력', alias: '/sale/visit', path: '/sale/visit', element: <SaleVisit />},
]

export const bottomNavigationRouterList = [
  {title: '홈', alias: '/', path: '/', icon: <HomeIco/>, element: <Home/>},
  {title: '접수', alias: '/receipt', path: 'receipt', icon: <ReceiptIco/>, child: ReceiptList},
  {title: '등록', alias: '/regis', path: 'regis', icon: <RegisIco/>, child: RegisList},
  {title: '재고', alias: '/inventory', path: 'inventory', icon: <InvIco/>, child: InventoryList},
  {title: '상신', alias: '/report', path: 'report', icon: <ProdIco/>, child: ReportList},
  {title: '영업', alias: '/sale', path: 'sale', icon: <SaleIco/>, child: SaleList},
]

export const AuthRouterList = [
  {title: '로그인', alias: '', path: '', element: <Login/>},
]

export const HomeRouterList = [
  {title: '홈', alias: '', path: '', layout: <DefaultLayout/>, child: bottomNavigationRouterList},
  {title: '영업', alias: 'comp-test', path: 'comp-test',  layout: <ComponentTestPage />},
]
