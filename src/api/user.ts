import axiosInstance from './request'
import axios from 'axios'
import qs from 'qs'
const baseImp = '/biapp-frs-web'
const newBase = '/goApi'
const originBase = 'https://demo.mtruning.club/api/goview'
export function login(data) {
    return axios({
      url: baseImp + '/newLogin',
      method: 'post',
      data: qs.stringify(data)
    })
  }
  
  export function getInfo(token) {
    return axiosInstance({
      url: '/user/info',
      method: 'get',
      params: { token }
    })
  }
  
  export function logout() {
    return axiosInstance({
      url: '/user/logout',
      method: 'post'
    })
  }
export function loginGet(data) {
  return axios({
    // url: newBase + '/sys/login',
    url: originBase + '/sys/login',
    method: 'post',
    data
  })
}
  