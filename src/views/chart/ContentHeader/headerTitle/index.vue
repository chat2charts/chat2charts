<template>
  <n-space>
    <n-icon size="20" :depth="3">
      <fish-icon></fish-icon>
    </n-icon>
    <n-text @click="handleFocus">
      工作空间 -
      <n-button v-show="!focus" secondary size="tiny">
        <span class="title">
          {{ comTitle }}
        </span>
      </n-button>
    </n-text>

    <n-input
      v-show="focus"
      ref="inputInstRef"
      size="small"
      type="text"
      maxlength="16"
      show-count
      placeholder="请输入项目名称"
      v-model:value.trim="title"
      @keyup.enter="handleBlur"
      @blur="handleBlur"
    ></n-input>
  </n-space>
</template>

<script setup lang="ts">
import { ref, nextTick, computed, watchEffect } from 'vue'
import { fetchRouteParamsLocation, setTitle } from '@/utils'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { EditCanvasConfigEnum } from '@/store/modules/chartEditStore/chartEditStore.d'
import { useSync } from '../../hooks/useSync.hook'
import { icon } from '@/plugins'

const { FishIcon } = icon.ionicons5
const chartEditStore = useChartEditStore()
const { dataSyncUpdate } = useSync()

const focus = ref<boolean>(false)
const inputInstRef = ref(null)

// 根据路由 id 参数获取项目信息
const fetchProhectInfoById = () => {
  const id = fetchRouteParamsLocation()
  if (id.length) {
    return id[0]
  }
  return ''
}

// const title = ref<string>(fetchProhectInfoById() || '')

const title = ref<string>(fetchRouteParamsLocation())

watchEffect(() => {
  title.value = chartEditStore.getProjectInfo.projectName || ''
})
const comTitle = computed(() => {
  // eslint-disable-next-line vue/no-side-effects-in-computed-properties
  title.value = title.value.replace(/\s/g, '')
  const newTitle = title.value.length ? title.value : '新项目'
  setTitle(`工作空间-${newTitle}`)
  chartEditStore.setEditCanvasConfig(EditCanvasConfigEnum.PROJECT_NAME, newTitle)
  return newTitle
})

const handleFocus = () => {
  focus.value = true
  nextTick(() => {
    inputInstRef.value && (inputInstRef.value as any).focus()
  })

  // const res = (await updateProjectApi({
  //   id: fetchRouteParamsLocation(),
  //   projectName: title.value
  // }))
  // if (res && res.code === ResultEnum.SUCCESS) {
  //   dataSyncUpdate()
  // } else {
  //   httpErrorHandle()
  // }

}

const handleBlur = () => {
  focus.value = false
}
</script>
<style lang="scss" scoped>
.title {
  padding-left: 5px;
  padding-right: 5px;
  font-size: 15px;
}
</style>
