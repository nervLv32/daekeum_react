import {AuthRouterList, HomeRouterList} from './RouterList'
import ProtectRouter from "./ProtectRouter";

const AuthRouter = {
  path: '/auth',
  children: AuthRouterList.map((route) => {
    return {
      path: route.alias,
      element: route.element
    }
  })
}


const HomeRouter = {
  path: '',
  element: <ProtectRouter/>,
  children :HomeRouterList.map((layoutRoute) => {
    console.log(layoutRoute)
    return {
      path: layoutRoute.alias,
      element: layoutRoute.layout,
      children: layoutRoute.child?.map((oneDepth) => {
        console.log(oneDepth)
        //하단탭
        return {
          path: oneDepth.alias,
          element: oneDepth.element,
          children: oneDepth.child?.map((secondDepth) => {
            //세부내용 있을 시
            return {
              path: secondDepth.alias,
              element: secondDepth.element,
            }
          })
        }
      })
    }
  })
}

const RootRouter = [
  HomeRouter,
  AuthRouter
]

export default RootRouter
