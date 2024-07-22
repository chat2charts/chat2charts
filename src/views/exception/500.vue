<template>
  <div class="go-error">
    <div class="text-center">
      <img src="~@/assets/images/exception/500.svg" alt="" />
    </div>
    <div class="text-center">
      <h1 class="text-base text-gray-500">抱歉，服务器出错了</h1>
    </div>
    <n-button type="primary" secondary @click="goHome">回到首页</n-button>
  </div>
</template>

<script lang="ts" setup>
import { PageEnum } from '@/enums/pageEnum'
import { routerTurnByName } from '@/utils'
import { clearLocalStorage } from '@/utils/storage'
import { StorageEnum } from '@/enums/storageEnum'
import { removeToken1,removeToken,setToken1 } from '@/utils/auth'

import { loginGet } from '@/api/user'
import { reactive} from 'vue'
import { SystemStoreEnum, SystemStoreUserInfoEnum } from '@/store/modules/systemStore/systemStore.d'
import { useSystemStore } from '@/store/modules/systemStore/systemStore'
function goHome() {
  const formInline = reactive({
      username: 'admin',
      password: 'admin',
    })
  loginGet(formInline).then(res => {
        console.log(res.data)
        const result = res.data.data
        const { tokenValue, tokenName } = result.token
        const { nickname, username, id } = result.userinfo

        const systemStore = useSystemStore()
        // 存储到 pinia 
        systemStore.setItem(SystemStoreEnum.USER_INFO, {
          [SystemStoreUserInfoEnum.USER_TOKEN]: tokenValue,
          [SystemStoreUserInfoEnum.TOKEN_NAME]: tokenName,
          [SystemStoreUserInfoEnum.USER_ID]: id,
          [SystemStoreUserInfoEnum.USER_NAME]: username,
          [SystemStoreUserInfoEnum.NICK_NAME]: nickname,
          // t
        })
        setToken1(tokenName,tokenValue)
      })
  routerTurnByName(PageEnum.BASE_HOME_NAME)
}
function goLogin() {
  clearLocalStorage(StorageEnum.GO_LOGIN_INFO_STORE)
  removeToken1()
  removeToken()
  routerTurnByName(PageEnum.BASE_LOGIN_NAME)
}
</script>

<style lang="scss" scoped>
@include go(error) {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  padding: 100px 0;
  @include background-image('background-image');
  .text-center {
    h1 {
      color: #666;
      padding: 20px 0;
    }
  }

  img {
    width: 350px;
    margin: 0 auto;
  }
}
</style>
