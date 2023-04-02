// Bottom Navigation
import DefaultLayout from "../layouts/DefaultLayout";
import Home from "../pages/Home";
import Receipt from "../pages/Receipt";

import {HomeIco, InvIco, ProdIco, ReceiptIco, RegisIco, SaleIco} from "../assets/icon/Svg";

// Auth
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/auth/Login";
import Join from "../pages/auth/Join";

const ReceiptList = [
  {title: '접수메인', alias: '', path: 'receipt/', element: <Receipt/>},
]

export const bottomNavigationRouterList = [
  {title: '홈', alias: '', path: '', icon: <HomeIco/>, element: <Home/>},
  {title: '접수', alias: 'receipt', path: 'receipt', icon: <ReceiptIco/>, child: ReceiptList},
  {title: '등록', alias: 'receipt', path: 'receipt', icon: <RegisIco/>, child: ReceiptList},
  {title: '재고', alias: 'receipt', path: 'receipt', icon: <InvIco/>, child: ReceiptList},
  {title: '상신', alias: 'receipt', path: 'receipt', icon: <ProdIco/>, child: ReceiptList},
  {title: '영업', alias: 'receipt', path: 'receipt', icon: <SaleIco/>, child: ReceiptList},
]

export const AuthRouterList = [
  {title: '로그인', alias: '', path: '', element: <Login/>},
]

export const rootRouter = [
  {title: '홈', alias: '', path: '', layout: <DefaultLayout/>, child: bottomNavigationRouterList},
  {title: '인증', alias: 'auth', path: '/auth', layout: <AuthLayout/>, child: AuthRouterList},
]
