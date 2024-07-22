import { ShapeEnumList } from '@/packages/components/Informations/Mores/WordCloud/config'
import axiosInstance from './sqlrequest'
import axios from 'axios'
import qs from 'qs'
const sqlBase = '/sqlserver'
// const sqlBase = '/chat2db/api'
// 数据库列表/connection/datasource/list?pageNo=1&pageSize=1000&refresh=true
export function datasourceListApi(params) {
    return axiosInstance({
        url: sqlBase + '/connection/datasource/list',
        method: 'get',
        params
    })
}
// 数据库树数据/rdb/schema/list?dataSourceId=3&dataSourceName=%40ip&refresh=true
export function datasourceTreeApi(params) {
  return axiosInstance({
      url: sqlBase + '/rdb/schema/list',
      method: 'get',
      params
  })
}
// 树的下一级/rdb/table/list?dataSourceId=3&dataSourceName=%40ip&databaseType=ORACLE&schemaName=UPRR_B&refresh=false&pageNo=1&pageSize=1000

// 从table获取/rdb/table/list?dataSourceId=3&dataSourceName=%40ip&databaseType=ORACLE&schemaName=UPRR_B&refresh=false&pageNo=1&pageSize=1000
// dataSourceId=3&dataSourceName=%40ip&databaseType=ORACLE&schemaName=UPRR_B&refresh=false&pageNo=1&pageSize=1000
export function tableTreeApi(params) {
  return axiosInstance({
      url: sqlBase + '/rdb/table/list',
      method: 'get',
      params
  })
}
// 从functions获取/rdb/function/list?dataSourceId=3&dataSourceName=%40ip&databaseType=ORACLE&schemaName=OLAPSYS&refresh=false&pageNo=1
export function functionsTreeApi(params) {
  return axiosInstance({
      url: sqlBase + '/rdb/function/list',
      method: 'get',
      params
  })
}
// 从view获取/rdb/view/list?dataSourceId=3&dataSourceName=%40ip&databaseType=ORACLE&schemaName=OLAPSYS&refresh=false&pageNo=1
export function viewsTreeApi(params) {
  return axiosInstance({
      url: sqlBase + '/rdb/view/list',
      method: 'get',
      params
  })
}
// 从columns获取/rdb/ddl/column_list?dataSourceId=3&dataSourceName=%40ip&databaseType=ORACLE&schemaName=UPRR_B&tableName=ACT_EVT_LOG&refresh=false&pageNo=1
export function columnTreeApi(params) {
  return axiosInstance({
      url: sqlBase + '/rdb/ddl/column_list',
      method: 'get',
      params
  })
}

// 从ai获取语句/ai/chat?message=SELECT+FIELD_NAME%2C+FIELD_LENGTH+FROM+BIONE_USER_ATTR+WHERE+ROWNUM+%3C%3D+10&promptType=NL_2_SQL&dataSourceId=3&schemaName=UPRR_B&tableNames=ACT_EVT_LOG
// /ai/chat?message=dvdvdv&promptType=NL_2_SQL&dataSourceId=3&schemaName=UPRR_B&tableNames=ACT_EVT_LOG
// /ai/chat?message=%E5%95%8A%E6%89%8B%E5%8A%A8%E9%98%80%E6%89%8B%E5%8A%A8%E9%98%80&promptType=NL_2_SQL&dataSourceId=3&schemaName=UPRR_B&tableNames=ACT_EVT_LOG
export function aiSqlApi(params) {
  return axiosInstance({
      url: sqlBase + '/ai/chat',
      method: 'get',
      params
  })
}
// 执行SQL语句/rdb/dml/execute
export function executeSql(data) {
  return axiosInstance({
    url: sqlBase + '/rdb/dml/execute',
    method: 'post',
    data
  })
}
// 不知道/operation/saved/list?tabOpened=y&pageNo=1&pageSize=20
// export function operationList(params) {
//   return axiosInstance({
//       url: sqlBase + '/operation/saved/list',
//       method: 'get',
//       params
//   })
// }



//查table表
export function executeTable(data) {
  return axiosInstance({
    url: sqlBase + '/rdb/dml/execute_table',
    method: 'post',
    data
  })
}
// 登录接口/oauth/login_a
export function oauthLogin(data) {
  return axios({
    url: sqlBase + '/oauth/login_a',
    method: 'post',
    data
  })
}
// /connection/datasource/create
// 新建接口/connection/datasource/create
export function createSource(data) {
  return axiosInstance({
      url: sqlBase + '/connection/datasource/create',
      method: 'post',
      data
  })
}
// 修改接口/connection/datasource/update
export function updateSource(data) {
  return axiosInstance({
      url: sqlBase + '/connection/datasource/update',
      method: 'post',
      data
  })
}
// 修改的回显GET接口/connection/datasource/3
export function getUpdSource(params) {
  return axiosInstance({
      url: sqlBase + '/connection/datasource/'+params,
      method: 'get'
  })
}

// /jdbc/driver/list?dbType=MYSQL
// 新建数据源第一个获取的接口/jdbc/driver/list?dbType=MYSQL
export function driverList(params) {
  return axiosInstance({
      url: sqlBase + '/jdbc/driver/list?dbType=' + params,
      method: 'get'
  })
}


// 数据库环境/api/common/environment/list_all




// DELETE删除接口/api/connection/datasource/8
