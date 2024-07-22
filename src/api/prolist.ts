import axiosInstance from './request'
import axios from 'axios'
import qs from 'qs'
const baseImp = '/biapp-frs-web'
const newBase = '/goApi'
const originBase = 'https://demo.mtruning.club/api/goview'
// 物料列表
export function projectListApi(params) {
    return axiosInstance({
      url: newBase + '/project/list',
      // url: originBase + '/project/list',
      method: 'get',
      params
    })
  }
// 删除
export function deleteProjectApi(params) {
    return axiosInstance({
      url: newBase + '/project/delete',
      method: 'delete',
      params
    })
  }
  // 发修发布状态
export function changeProjectReleaseApi(data) {
    return axiosInstance({
      url: newBase + '/project/publish',
      method: 'put',
      data
    })
  }
// * 保存项目
export function saveProjectApi(data) {
    return axiosInstance({
        url: newBase + '/project/save/data',
        method: 'post',
        data
    })
}
// * 获取项目
export function fetchProjectApi(params) {
    return axiosInstance({
        url: newBase + '/project/getData',
        method: 'get',
        params
    })
}
// * 上传文件
export function uploadFile(data) {
    return axiosInstance({
        url: newBase + '/project/upload',
        method: 'post',
        data
    })
}
// * 修改项目基础信息
export function updateProjectApi(data) {
    return axiosInstance({
        url: newBase + '/project/edit',
        method: 'post',
        data
    })
}


// * 新增项目
export function createProjectApi(data) {
  return axiosInstance({
      url: newBase + '/project/create',
      method: 'post',
      data
  })
}