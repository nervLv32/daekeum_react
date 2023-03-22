import {rootRouter} from './RouterList'

const RootRouter = rootRouter.map((item) => {
  return {
    path: item.alias,
    children: item.child?.map((subItem) => {
      return {
        path: subItem.alias,
        element: subItem.element
      }
    })
  }
})

export default RootRouter
