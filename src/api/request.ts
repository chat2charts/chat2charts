import axios, { AxiosResponse, InternalAxiosRequestConfig, AxiosError } from 'axios'
import { ResultEnum } from "@/enums/httpEnum"
import { PageEnum, ErrorPageNameMap } from "@/enums/pageEnum"
import { StorageEnum } from '@/enums/storageEnum'
import { redirectErrorPage, getLocalStorage, routerTurnByName, isPreview } from '@/utils'
import { useMessage } from 'naive-ui'  
import { SystemStoreEnum, SystemStoreUserInfoEnum } from '@/store/modules/systemStore/systemStore.d'
import { fetchAllowList } from './axios.config'
import includes from 'lodash/includes'

import { setToken1,getToken1 } from '@/utils/auth'
import { reactive} from 'vue'
import { loginGet } from '@/api/user'
import { useSystemStore } from '@/store/modules/systemStore/systemStore'

// const message = useMessage()

const axiosInstance = axios.create({
  baseURL: import.meta.env.DEV ? import.meta.env.VITE_DEV_PATH : import.meta.env.VITE_PRO_PATH,
  timeout: ResultEnum.TIMEOUT,
})

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // // 0102起
    
    // // 白名单校验
    // // if (includes(fetchAllowList, config.url)) return config
    // // 获取 token
    // const info = getLocalStorage(StorageEnum.GO_SYSTEM_STORE)
    // // 重新登录
    // if (!info) {
    //   routerTurnByName(PageEnum.BASE_LOGIN_NAME)
    //   // redirectErrorPage(500)
    //   return config
    // }
    
    // const userInfo = info[SystemStoreEnum.USER_INFO]
    // config.headers[userInfo[SystemStoreUserInfoEnum.TOKEN_NAME] || 'token'] =  userInfo[SystemStoreUserInfoEnum.USER_TOKEN] || ''

    // // // 0102尾
    
    // config.headers['Satoken'] = getToken1()
    return config
  },
  (error: AxiosError) => {
    Promise.reject(error)
  }
)

// // 响应拦截器
// axiosInstance.interceptors.response.use(
//   (resp) => {
//     const res = resp.data
//     if (resp.status === 200) {
//       return res
//     } else {
//       message.error('请求异常，请联系管理员')
//       Promise.reject(new Error('请求异常，请联系管理员'))
//     }
//   },
//   (err: AxiosResponse) => {
//     Promise.reject(err)
//   }
// )
// 0103
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
