export enum SystemStoreUserInfoEnum {
  USER_TOKEN = 'userToken',
  TOKEN_NAME = 'tokenName',
  USER_ID = 'userId',
  USER_NAME = 'userName',
  NICK_NAME = 'nickName',
}

export enum SystemStoreNodeTableInfoEnum {
  DATA_SOURCE_ID = 'dataSourceId',
  DATABASE_TYPE = 'databaseType',
  SCHEMA_NAME = 'schemaName',
  TABLE_NAME = 'tableName'
}

export interface UserInfoType {
  [SystemStoreUserInfoEnum.USER_TOKEN]?: string,
  [SystemStoreUserInfoEnum.TOKEN_NAME]?: string,
  [SystemStoreUserInfoEnum.USER_ID]?: string,
  [SystemStoreUserInfoEnum.USER_NAME]?: string,
  [SystemStoreUserInfoEnum.NICK_NAME]?: string,
}

export interface NodeTableInfoType {
  [SystemStoreNodeTableInfoEnum.DATA_SOURCE_ID]?: string,
  [SystemStoreNodeTableInfoEnum.DATABASE_TYPE]?: string,
  [SystemStoreNodeTableInfoEnum.SCHEMA_NAME]?: string,
  [SystemStoreNodeTableInfoEnum.TABLE_NAME]?: string
}


export interface FetchInfoType {
  OSSUrl?: string,
}

export enum SystemStoreEnum {
  // 用户
  USER_INFO = 'userInfo',
  // 请求
  FETCH_INFO = 'fetchInfo',
  // table节点
  NODE_TABLE_INFO = 'nodeTableInfo'
}

export interface SystemStoreType {
  [SystemStoreEnum.USER_INFO]: UserInfoType
  [SystemStoreEnum.FETCH_INFO]: FetchInfoType
  [SystemStoreEnum.NODE_TABLE_INFO]: NodeTableInfoType
}