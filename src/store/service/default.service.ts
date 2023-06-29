import axios, { AxiosRequestConfig, AxiosStatic } from 'axios'
import authHeader from './auth-header'
import {
  DefaultServiceInterface,
  Methods,
  ServiceParamsHeaderInterface
} from './interface/DefaultServiceInterface'

export const defaultService = {
  handleService
}

function handleService(params: DefaultServiceInterface) {

  /****************
   헤더 예제

   defaultService.handleService({
    method: 'get',
    endPoint: `https://api.github.com/repos/nervLv32/admin_react`,
    headers: {
      authorization: `token ${token}`
    }
   ****************/

  // const headerType: ServiceParamsHeaderInterface | any = (params.headers ? { headers: params.headers } : { headers: authHeader() })

  const switchMethod = (method: Methods) => {
    switch (method) {
      case 'get':
        return axios[method](
          process.env.REACT_APP_API_URL + params.endPoint,
          // headerType
        )
      case 'formData':
        return axios['post'](
          process.env.REACT_APP_API_URL + params.endPoint,
          params.params,
          // headerType
        )
      case 'blob':
        return axios['get'](
          process.env.REACT_APP_API_URL + params.endPoint,
          {
            responseType: 'blob'
          }
        )
      case 'delete':
        return axios[method](
          params.endPoint,
          // headerType
        )
      default:
        return axios[method](
          process.env.REACT_APP_API_URL + params.endPoint,
          params.params,
          // headerType
        )
    }
  }

  return switchMethod(params.method)
}
