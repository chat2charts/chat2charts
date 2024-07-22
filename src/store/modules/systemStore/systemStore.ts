import { defineStore } from 'pinia'
import { SystemStoreType, UserInfoType, FetchInfoType, NodeTableInfoType } from './systemStore.d'
import { setLocalStorage, getLocalStorage } from '@/utils'
import { StorageEnum } from '@/enums/storageEnum'

const { GO_SYSTEM_STORE } = StorageEnum

const storageSystem: SystemStoreType = getLocalStorage(GO_SYSTEM_STORE)

// 系统数据记录
export const useSystemStore = defineStore({
  id: 'useSystemStore',
  state: (): SystemStoreType => storageSystem || {
    userInfo: {
      userId: undefined,
      userName: undefined,
      userToken: undefined,
      nickName: undefined
    },
    fetchInfo: {
      OSSUrl: undefined
    },
    nodeTableInfo: {
      dataSourceId:undefined,
      databaseType:undefined,
      schemaName:undefined,
      tableName:undefined
    }
  },
  getters: {
    getUserInfo(): UserInfoType {
      return this.userInfo
    },
    getFetchInfo(): FetchInfoType {
      return this.fetchInfo
    },
    getNodeTableInfo(): NodeTableInfoType {
      return this.nodeTableInfo
    }
  },
  actions: {
    setItem<T extends keyof SystemStoreType, K extends SystemStoreType[T]>(key: T, value: K): void {
      this.$patch(state => {
        state[key] = value
      });
      setLocalStorage(GO_SYSTEM_STORE, this.$state)
    }
  }
})