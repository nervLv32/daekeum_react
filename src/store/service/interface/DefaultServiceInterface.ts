import { AxiosRequestConfig } from 'axios'

type Methods = 'head' | 'options' | 'put' | 'post' | 'patch' | 'delete' | 'get' | 'formData' | 'blob'

interface DefaultServiceInterface {
  method: Methods,
  endPoint: string,
  headers?: AxiosRequestConfig,
  params: any
}

interface ServiceParamsHeaderInterface {
  headers: Headers | any
}
interface Headers {
  authorization : string
}

export type {
  Methods,
  DefaultServiceInterface,
  ServiceParamsHeaderInterface
}
