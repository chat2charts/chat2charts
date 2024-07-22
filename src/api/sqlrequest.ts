// 0307注释
import axios, { AxiosResponse, InternalAxiosRequestConfig, AxiosError } from 'axios'
import { ResultEnum } from "@/enums/httpEnum"
import { PageEnum, ErrorPageNameMap } from "@/enums/pageEnum"
import { StorageEnum } from '@/enums/storageEnum'
import { redirectErrorPage, getLocalStorage, routerTurnByName, isPreview } from '@/utils'
import { useMessage } from 'naive-ui'  
import { SystemStoreEnum, SystemStoreUserInfoEnum } from '@/store/modules/systemStore/systemStore.d'
import { fetchAllowList } from './axios.config'
import includes from 'lodash/includes'

import { setToken1,getToken1,getToken3,setToken3 } from '@/utils/auth'
import { reactive} from 'vue'
import { loginGet } from '@/api/user'
import { useSystemStore } from '@/store/modules/systemStore/systemStore'



import { uuid } from 'vue-uuid';


// const message = useMessage()

const axiosInstance = axios.create({
  baseURL: import.meta.env.DEV ? import.meta.env.VITE_DEV_PATH : import.meta.env.VITE_PRO_PATH,
  timeout: ResultEnum.TIMEOUT,
  withCredentials: true
})

const cookies = document.cookie; // 获取所有cookies
const cookieHeader = `Cookie: ${cookies}`; // 构造包含cookies的header
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 0129起
        // config.headers['Cookie'] = 'ga=GA1.1.1517855911.1706585260; CHAT2DB.USER_ID=2; CHAT2DB=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpblR5cGUiOiJsb2dpbiIsImxvZ2luSWQiOjIsImRldmljZSI6ImRlZmF1bHQtZGV2aWNlIiwiZWZmIjoxNzA5MDk4NzEzMzAyLCJyblN0ciI6IjZ1UE1pVzVYdG9kQ3BJMlY1cjhpUU8yYW9KSnIwa1V1In0.3kzUnrFKiX8xFA39BI8UqufRe-k8S1ozJXjw92OPYSc; _ga_V8M4E5SF61=GS1.1.1706594570.2.1.1706594898.0.0.0'
        //config.headers['Cookie'] = getToken3()
    // 0129尾
    
    // 0221始



    config.headers['Authorization'] = getToken3()


    config.headers['uid'] = uuid.v4()
    // 0221尾

    return config
  },
  (error: AxiosError) => {
    Promise.reject(error)
  }
)

// 响应拦截器
axiosInstance.interceptors.response.use(
  (resp) => {
    const res = resp.data
    if (resp.status === 200) {
      return res
    } else {
      // message.error('请求异常，请联系管理员')
      Promise.reject(new Error('请求异常，请联系管理员'))
    }
  },
  (err: AxiosResponse) => {
    Promise.reject(err)
  }
)
export default axiosInstance
// 0307注释




