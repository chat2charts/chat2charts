import { echartOptionProfixHandle, PublicConfigClass } from '@/packages/public'
import { BarStackConfig } from './index'
import { CreateComponentType } from '@/packages/index.d'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const includes = ['legend', 'xAxis', 'yAxis', 'grid']

export const seriesItem = <any>[]
export const option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {},
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis:  {
      type: 'category',
      show: true,
      data: dataJson.xbars
    }
,
  yAxis: 
    {
      type: 'value',
      show: true,
    }
  ,
  dataset:{...dataJson},
  series: [
    {
      name: dataJson.names[0],
      type: 'bar',
      emphasis: {
        focus: 'series'
      },
      data: dataJson.datas[0]
    },
    {
      name: dataJson.names[1],
      type: 'bar',
      stack: dataJson.names[0],
      emphasis: {
        focus: 'series'
      },
      data: dataJson.datas[1]
    },
    {
      name: dataJson.names[2],
      type: 'bar',
      stack: dataJson.names[0],
      emphasis: {
        focus: 'series'
      },
      data: dataJson.datas[2]
    },
    {
      name: dataJson.names[3],
      type: 'bar',
      stack: dataJson.names[0],
      emphasis: {
        focus: 'series'
      },
      data: dataJson.datas[3]
    },
    {
      name: dataJson.names[4],
      type: 'bar',
      data: dataJson.datas[4],
      emphasis: {
        focus: 'series'
      },
      markLine: {
        lineStyle: {
          type: 'dashed'
        },
        data: [[{ type: 'min' }, { type: 'max' }]]
      }
    },
    {
      name: dataJson.names[5],
      type: 'bar',
      stack: dataJson.names[1],
      emphasis: {
        focus: 'series'
      },
      data: dataJson.datas[5]
    },
    {
      name: dataJson.names[6],
      type: 'bar',
      stack: dataJson.names[1],
      barWidth: 5,
      emphasis: {
        focus: 'series'
      },
      data: dataJson.datas[6]
    },
    {
      name: dataJson.names[7],
      type: 'bar',
      stack: dataJson.names[1],
      emphasis: {
        focus: 'series'
      },
      data: dataJson.datas[7]
    },
    {
      name: dataJson.names[8],
      type: 'bar',
      stack: dataJson.names[1],
      emphasis: {
        focus: 'series'
      },
      data: dataJson.datas[8]
    }
  ]
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = BarStackConfig.key
  public chartConfig = cloneDeep(BarStackConfig)
  // 图表配置项
  public option = echartOptionProfixHandle(option, includes)
}
