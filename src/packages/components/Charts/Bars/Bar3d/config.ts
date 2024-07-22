import { echartOptionProfixHandle, PublicConfigClass } from '@/packages/public'
import { Bar3dConfig } from './index'
import { CreateComponentType } from '@/packages/index.d'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'
export const includes = ['legend', 'xAxis', 'yAxis', 'grid']

export const option = {
  dataset: dataJson,
  legend: {
    show: false
  },
  backgroundColor: '#062544',
  grid: {
    top: '10%',
    left: '5%',
    bottom: '5%',
    right: '5%',
    containLabel: true
  },
  tooltip: {
    trigger: 'item'
  },
  animation: false,
  xAxis: 
    {
      type: 'category',
      data: dataJson.xData,
      axisTick: {
        alignWithLabel: true
      },
      axisLine: {
        show: false
      },
      axisLabel: {
        textStyle: {
          color: '#ddd'
        },
        margin: 30
      },
      interval: 1
    }
  ,
  yAxis: 
    {
      show: true,
      type: 'value'
    }
  ,
  series: [
    {
      name: '上部圆',
      type: 'pictorialBar',
      silent: true,
      symbolSize: [40, 10],
      symbolOffset: [0, -6],
      symbolPosition: 'end',
      z: 12,
      label: {
          show: true,
          position: 'top',
          fontSize: 15,
          fontWeight: 'bold',
          color: '#5BFCF4'
      },
      color: '#5BFCF4',
      data: dataJson.yData
    },
    {
      name: '底部圆',
      type: 'pictorialBar',
      silent: true,
      symbolSize: [40, 10],
      symbolOffset: [0, 7],
      z: 12,
      color: '#5BFCF4',
      data: dataJson.yData
    },
    {
      name: '内层波浪',
      type: 'pictorialBar',
      silent: true,
      symbolSize: [50, 15],
      symbolOffset: [0, 12],
      z: 10,
      itemStyle: {
          color: 'transparent',
          borderColor: '#5BFCF4',
          borderType: 'solid',
          borderWidth: 8
      },
      data: dataJson.yData
    },
    {
      name: '外层波浪',
      type: 'pictorialBar',
      silent: true,
      symbolSize: [70, 20],
      symbolOffset: [0, 18],
      z: 10,
      itemStyle: {
          color: 'transparent',
          borderColor: 'rgba(91,252,244,0.5)',
          borderType: 'solid',
          borderWidth: 5
      },
      data: dataJson.yData
    },
    {
      name: '柱体',
      type: 'bar',
      barWidth: '40',
      barGap: '10%', // Make series be overlap
      barCateGoryGap: '10%',
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: 'rgba(210,210,210,0.3)' // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#5BFCF4' // 100% 处的颜色
            }
          ],
          global: false // 缺省为 false
        },
        opacity: 0.8
      },
      data: dataJson.yData
    }
  ]
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = Bar3dConfig.key
  public chartConfig = cloneDeep(Bar3dConfig)
  // 图表配置项
  public option = echartOptionProfixHandle(option, includes)
}
