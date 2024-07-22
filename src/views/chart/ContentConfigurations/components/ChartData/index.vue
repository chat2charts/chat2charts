<template>
  <div class="go-chart-configurations-data" v-if="targetData">
    <setting-item-box name="请求方式" :alone="true">
      <n-select v-model:value="targetData.request.requestDataType" :disabled="isNotData" :options="selectOptions" />
    </setting-item-box>
    <!-- 静态 -->
    <chart-data-static v-if="targetData.request.requestDataType === RequestDataTypeEnum.STATIC"></chart-data-static>
    <!-- 动态 -->
    <chart-data-ajax v-if="targetData.request.requestDataType === RequestDataTypeEnum.AJAX"></chart-data-ajax>
    <!-- 数据池 -->
    <chart-data-pond v-if="targetData.request.requestDataType === RequestDataTypeEnum.Pond"></chart-data-pond>
    <!-- 数据源 -->
    <chart-data-chatai v-if="targetData.request.requestDataType === RequestDataTypeEnum.Chatai"></chart-data-chatai>
    <!-- 指标数据 -->
    <chart-data-quota v-if="targetData.request.requestDataType === RequestDataTypeEnum.Quota"></chart-data-quota>
  </div>
</template>

<script setup lang="ts">
import { computed ,reactive,onMounted} from 'vue'
import { loadAsyncComponent } from '@/utils'
import { SettingItemBox } from '@/components/Pages/ChartItemSetting'
import { RequestDataTypeEnum } from '@/enums/httpEnum'
import { ChartFrameEnum } from '@/packages/index.d'
import { useTargetData } from '../hooks/useTargetData.hook'
import { SelectCreateDataType, SelectCreateDataEnum } from './index.d'

const ChartDataStatic = loadAsyncComponent(() => import('./components/ChartDataStatic/index.vue'))
const ChartDataAjax = loadAsyncComponent(() => import('./components/ChartDataAjax/index.vue'))
const ChartDataPond = loadAsyncComponent(() => import('./components/ChartDataPond/index.vue'))
const ChartDataChatai = loadAsyncComponent(() => import('./components/ChartDataChatai/index.vue'))
const ChartDataQuota = loadAsyncComponent(() => import('./components/ChartDataQuota/index.vue'))

import { cryptoEncode, setLocalStorage } from '@/utils'
const { targetData } = useTargetData()

import { useAuthStore } from '@/store/modules/userStore/user';
const authStore = useAuthStore();

import { StorageEnum } from '@/enums/storageEnum'
const { GO_LOGIN_INFO_STORE } = StorageEnum

const formInline = reactive({
  username: 'admin',
  password: '123456',
})

onMounted(() => {
  // getToken()
})

// 选项
const selectOptions: SelectCreateDataType[] = [
  {
    label: SelectCreateDataEnum.STATIC,
    value: RequestDataTypeEnum.STATIC
  },
  {
    label: SelectCreateDataEnum.AJAX,
    value: RequestDataTypeEnum.AJAX
  },
  {
    label: SelectCreateDataEnum.Pond,
    value: RequestDataTypeEnum.Pond
  },
  {
    label: SelectCreateDataEnum.Chatai,
    value: RequestDataTypeEnum.Chatai
  },
  {
    label: SelectCreateDataEnum.Quota,
    value: RequestDataTypeEnum.Quota
  }
]

// 无数据源
const isNotData = computed(() => {
  return (
    targetData.value.chartConfig?.chartFrame === ChartFrameEnum.STATIC ||
    typeof targetData.value?.option?.dataset === 'undefined'
  )
})

// 再次作登录，为了获取token
function getToken(){
  const { username, password } = formInline
  authStore.loginUser(formInline).then(()=>{
    setLocalStorage(
          GO_LOGIN_INFO_STORE,
          cryptoEncode(
            JSON.stringify({
              username,
              password,
            })
          )
    )
  })
}
</script>
