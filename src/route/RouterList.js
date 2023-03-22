import HomeMain from "../pages/HomeMain";

const Home = [
  {title: '예치금 입금 현황', alias: '', path: '/', element: <HomeMain />},
]

export const rootRouter = [
  {title: '홈', alias: '', path: '', child: Home},
]
