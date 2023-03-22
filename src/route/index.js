import {rootRouter} from './RouterList'

const RootRouter = rootRouter.map((layoutRoute) => {
  return {
    path: layoutRoute.alias,
    element: layoutRoute.layout,
    children: layoutRoute.child?.map((oneDepth) => {
      return {
        path: oneDepth.alias,
        element: oneDepth.element,
        children: oneDepth.child?.map((secondDepth) => {
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
