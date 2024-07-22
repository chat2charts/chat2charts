<template>
  <div> 
    <!-- 选中内容 -->
    <div class="go-chart-data-quota">
      <n-card class="n-card-shallow">
        <setting-item-box name="指标详情" :alone="true">
            <n-input size="small" :placeholder="'暂无'" :disabled="true">
                <template #prefix>
                    <!-- <n-icon :component="FishIcon" /> -->
                </template>
            </n-input>
        </setting-item-box>
      </n-card>
      <div>
            <div style="text-align: center;margin:20px;">
                <n-button type="primary" secondary  @click="controlModelHandle">获取指标</n-button>
            </div>
      </div>
    </div>
    <div style="padding: 0 0 5px 0;">指标数据：</div>
    <n-card size="small">
      <n-code :code="toString(source)" language="json" word-wrap></n-code>
    </n-card>
    <!-- 弹窗 -->
    <chart-data-pond-control v-model:modelShow="controlModel" @handleData="handleData" ></chart-data-pond-control>
  </div>
</template>    
<script setup lang="ts">
// @ts-nocheck
import { ref, toRefs, toRaw, onBeforeUnmount, computed, watchEffect, watch ,nextTick } from 'vue'
import { SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { ChartDataPondControl } from './components/ChartDataPondControl'
import { toString, isArray } from '@/utils'
import {  useMessage } from 'naive-ui'  

import { ChartFrameEnum } from '@/packages/index.d'
import { RequestDataTypeEnum } from '@/enums/httpEnum'
import { DataResultEnum, TimelineTitleEnum } from '../../index.d'
import { ChartDataMonacoEditor } from '../ChartDataMonacoEditor'
import { useFile } from '../../hooks/useFile.hooks'
import { useTargetData } from '../../../hooks/useTargetData.hook'
import { Console } from 'console'

const { targetData } = useTargetData()

const controlModel = ref(false)

// 点击弹窗
const controlModelHandle = () => {
  controlModel.value = true
}

const message = useMessage()

const source = ref()
const dimensions = ref()
const dimensionsAndSource = ref()
const noData = ref(false)

const fSource = ref()

const { uploadFileListRef, customRequest, beforeUpload, download } = useFile(targetData)

// 是否展示过滤器
const filterShow = computed(() => {
  return targetData.value.request.requestDataType !== RequestDataTypeEnum.Quota
})

// 是支持 dataset 的图表类型
const isCharts = computed(() => {
  return targetData.value.chartConfig.chartFrame === ChartFrameEnum.ECHARTS
})

// 处理映射列表状态结果
const matchingHandle = (mapping: string) => {
  let res = DataResultEnum.SUCCESS
  for (let i = 0; i < source.value.length; i++) {
    if (source.value[i][mapping] === undefined) {
      res = DataResultEnum.FAILURE
      return res
    }
  }
  return DataResultEnum.SUCCESS
}

// 处理映射列表
const dimensionsAndSourceHandle = () => {
  try {
    // 去除首项数据轴标识
    return dimensions.value.map((dimensionsItem: string, index: number) => {
      return index === 0
        ? {
            // 字段
            field: '通用标识',
            // 映射
            mapping: dimensionsItem,
            // 结果
            result: DataResultEnum.NULL
          }
        : {
            field: `数据项-${index}`,
            mapping: dimensionsItem,
            result: matchingHandle(dimensionsItem)
          }
    })
  } catch (error) {
    return []
  }
}
// 点击组件回传的值
function handleData(value){
  if(!value.length){
    message.error('请求并未成功返回数据，请联系服务器管理员！') 
    return
  }
  console.log(value,"value")
  let transformedData = transformData(value)

  source.value = transformedData

  if (isCharts.value) {
    dimensions.value = transformedData.dimensions
    nextTick(() => {
      if (source.value) {
        targetData.value.option.dataset = source.value
      }
    })
  }
}

// 转换数据
function transformData(rawData: any[]): { dimensions: string[], source: any[] } {
  // 提取需要保留的属性名

  const keepProperties = ["date"];
  let obj = rawData[0]
  for(let key in obj){
    if (obj.hasOwnProperty(key) && key != 'date'){
      keepProperties.push(key)
    }
  }
  // const keepProperties = ["date","dataIos1","dataIos2"];

  // 创建一个空的目标对象
  const target = {
    dimensions: keepProperties,
    source: []
  };

  // 遍历原始数据，将数据转换为目标格式
  rawData.forEach(item => {
    const sourceItem: { [key: string]: any } = {};
    keepProperties.forEach(prop => {
      // if(prop == "dataIos1" || prop == "dataIos2"){
      if(prop != "date"){
        sourceItem[prop] = Number(item[prop]);
      }else{
        sourceItem[prop] = item[prop];
      }
      
    });
    target.source.push(sourceItem);
  });

  return target;
}

watch(
  () => targetData.value?.option?.dataset,
  (
    newData?: {
      source: any
      dimensions: any
    } | null
  ) => {

    if (newData && targetData?.value?.chartConfig?.chartFrame === ChartFrameEnum.ECHARTS) {
      // 只有 DataSet 数据才有对应的格式
      source.value = targetData.value.option.dataset
      if (isCharts.value) {
        // dimensions.value = newData.dimensions
        dimensionsAndSource.value = dimensionsAndSourceHandle()
      }
    } else if (newData !== undefined && newData !== null) {
      console.log('第二次。。。')
      dimensionsAndSource.value = null
      source.value = fSource.value
    } else {
      noData.value = true
      source.value = '此组件无数据源'
    }
    if (isArray(newData)) {
      dimensionsAndSource.value = null
    }
  },
  {
    immediate: true
  }
)



</script>
<style scoped lang="scss">
@include go('chart-data-quota') {

}
</style>
