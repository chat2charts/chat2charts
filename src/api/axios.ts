import axios, { AxiosResponse, AxiosRequestConfig, Axios, InternalAxiosRequestConfig, AxiosError } from 'axios'
import { ResultEnum } from "@/enums/httpEnum"
import { PageEnum, ErrorPageNameMap } from "@/enums/pageEnum"
import { StorageEnum } from '@/enums/storageEnum'
import { axiosPre } from '@/settings/httpSetting'
import { SystemStoreEnum, SystemStoreUserInfoEnum } from '@/store/modules/systemStore/systemStore.d'
import { redirectErrorPage, getLocalStorage, routerTurnByName, isPreview } from '@/utils'
import { fetchAllowList } from './axios.config'
import includes from 'lodash/includes'


export interface MyResponseType<T> {
  code: ResultEnum
  data: T
  message: string
}


export interface MyRequestInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): Promise<MyResponseType<T>>
}
// const axiosInstance = axios.create({
//   baseURL: `${import.meta.env.PROD ? import.meta.env.VITE_PRO_PATH : ''}${axiosPre}`,
//   timeout: ResultEnum.TIMEOUT
// }) as unknown as MyRequestInstance
const axiosInstance = axios.create({
  baseURL: import.meta.env.DEV ? import.meta.env.VITE_DEV_PATH : import.meta.env.VITE_PRO_PATH,
  timeout: ResultEnum.TIMEOUT,
}) as unknown as MyRequestInstance

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 0111始
    // // 白名单校验
    // if (includes(fetchAllowList, config.url)) return config
    // // 获取 token
    // const info = getLocalStorage(StorageEnum.GO_SYSTEM_STORE)
    // // 重新登录
    // if (!info) {
    //   routerTurnByName(PageEnum.BASE_LOGIN_NAME)
    //   return config
    // }
    
    // const userInfo = info[SystemStoreEnum.USER_INFO]
    // config.headers[userInfo[SystemStoreUserInfoEnum.TOKEN_NAME] || 'token'] =  userInfo[SystemStoreUserInfoEnum.USER_TOKEN] || ''
    // 0111末
    return config
  },
  (error: AxiosError) => {
    Promise.reject(error)
  }
)

// 响应拦截器
axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => {
    const { code } = res.data as { code: number }
    if (code === undefined || code === null) return Promise.resolve(res.data)
    if (code === ResultEnum.DATA_SUCCESS) return Promise.resolve(res.data)
    // 重定向
    if (ErrorPageNameMap.get(code)) redirectErrorPage(code)
    return Promise.resolve(res.data)
  },
  (err: AxiosError) => {

    const status = err.response?.status
    switch (status) {
      case 401:
        routerTurnByName(PageEnum.BASE_LOGIN_NAME)
        Promise.reject(err)
        break

      default:
        Promise.reject(err)
        break
    }

    // Promise.reject(err)
  }
)

export default axiosInstance
