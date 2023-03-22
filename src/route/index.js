import {rootRouter} from './RouterList'

const RootRouter = rootRouter.map((layoutRoute) => {
  return {
    // 레이아웃 설정
    path: layoutRoute.alias,
    element: layoutRoute.layout,
    children: layoutRoute.child?.map((oneDepth) => {
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

export default RootRouter
