import axiosInstance from './request'
import axios from 'axios'
import qs from 'qs'
const baseImp = '/biapp-frs-web'
const newBase = '/goApi'
// 获取搜索tree
export function getTreeData(params) {
  return axiosInstance({
    url: baseImp + '/report/frame/idx/getAsyncTreeIdxShow.json',
    method: 'post',
    params
  })
}

// 搜索btn的回显
export function getDimNm(params) {
  return axiosInstance({
    url: baseImp + '/report/frame/datashow/idx/getDimNm',
    method: 'post',
    params
  })
}

// 查询计算规则
export function getIdxRule(params) {
  return axiosInstance({
    url: baseImp + '/report/frame/datashow/idx/getIdxRule',
    method: 'post',
    params
  })
}

// 查询时间度量
export function getIdxTimeMeasure(params) {
  return axiosInstance({
    url: baseImp + '/report/frame/datashow/idx/getIdxTimeMeasure',
    method: 'post',
    params
  })
}

// 查询取值方式
export function getIdxMode(params) {
  return axiosInstance({
    url: baseImp + '/report/frame/datashow/idx/getIdxMode',
    method: 'post',
    params
  })
}

// 查询机构树
export function getAllOrgTree(params) {
  return axiosInstance({
    url: baseImp + '/rpt/frame/rptorg/getAllOrgTree',
    method: 'post',
    params
  })
}

// 查询数据
export function frsResult(data) {
  return axios({
    url: baseImp + '/report/frame/datashow/idx/search/frsResult',
    method: 'post',
    data: qs.stringify(data)
  })
}


// 查询数据
export function getDrawDate(params) {
  return axios({
    url: baseImp + '//report/frame/datashow/idx/getDrawDate',
    method: 'post',
    params
  })
}
// 获取币种
export function getDimInfoTree(params) {
  return axios({
    url: baseImp + '//report/frame/idx/getDimInfoTree',
    method: 'post',
    params
  })
}
// ===

// ====
// 查询文本框
export function getSearchText(data) {
  return axiosInstance({
    url: '/api',
    method: 'post',
    data
  })
}
// export function getDimNm(params) {
//   return axiosInstance({
//     url: baseImp + '/report/frame/datashow/idx/getDimNm',
//     method: 'post',
//     params
//   })
// }
