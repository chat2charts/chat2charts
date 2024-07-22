<template>
  <!-- Echarts 全局设置 -->
  <global-setting :optionData="optionData"></global-setting>
  <CollapseItem v-for="(item, index) in seriesList" :key="index" :name="`柱状图-${index + 1}`" :expanded="true">
      <SettingItemBox v-if="item.type === 'bar'" name="柱子颜色">
      <setting-item name="开始颜色">
        <n-color-picker size="small" :modes="['hex']" v-model:value="item.itemStyle.color.colorStops[0].color"></n-color-picker>
      </setting-item>
      <setting-item name="结束颜色">
        <n-color-picker size="small" :modes="['hex']" v-model:value="item.itemStyle.color.colorStops[1].color"></n-color-picker>
      </setting-item>
      </SettingItemBox>
      <SettingItemBox v-if="item.name === '上部圆'" name="上部圆">
      <setting-item name="颜色">
        <n-color-picker size="small" :modes="['hex']" v-model:value="item.color"></n-color-picker>
      </setting-item>
      <setting-item name="字体颜色">
        <n-color-picker size="small" :modes="['hex']" v-model:value="item.label.color"></n-color-picker>
      </setting-item>
      </SettingItemBox>
      <SettingItemBox v-if="item.name === '底部圆'" name="底部圆">
      <setting-item name="颜色">
        <n-color-picker size="small" :modes="['hex']" v-model:value="item.color"></n-color-picker>
      </setting-item>
      </SettingItemBox>
      <SettingItemBox v-if="item.name === '内层波浪'" name="内层波浪">
      <setting-item name="颜色">
        <n-color-picker size="small" :modes="['hex']" v-model:value="item.itemStyle.color"></n-color-picker>
      </setting-item>
      </SettingItemBox>
      <SettingItemBox v-if="item.name === '外层波浪'" name="外层波浪">
      <setting-item name="颜色">
        <n-color-picker size="small" :modes="['hex']" v-model:value="item.itemStyle.color"></n-color-picker>
      </setting-item>
      </SettingItemBox>
  </CollapseItem>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue'
import { GlobalSetting, CollapseItem, SettingItemBox, SettingItem } from '@/components/Pages/ChartItemSetting'
import { GlobalThemeJsonType } from '@/settings/chartThemes/index'

const props = defineProps({
  optionData: {
    type: Object as PropType<GlobalThemeJsonType>,
    required: true
  }
})

const seriesList = computed(() => {
  return props.optionData.series
})
</script>
