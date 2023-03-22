import Home from "../pages/Home";

import Receipt from "../pages/Receipt";
import DefaultLayout from "../layouts/DefaultLayout";

const ReceiptList = [
  {title: '접수메인', alias: '', path: 'receipt/', element: <Receipt />},
]

const userRouter = [
  {title: '홈', alias: '', path: '', element: <Home />},
  {title: '접수', alias: 'receipt', path: 'receipt', child: ReceiptList},
]

export const rootRouter = [
  {title: '홈', alias: '', path: '', layout: <DefaultLayout />, child: userRouter},
]
