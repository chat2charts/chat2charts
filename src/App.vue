<template>
  <n-config-provider
    :theme="darkTheme"
    :hljs="hljsTheme"
    :locale="locale"
    :date-locale="dateLocale"
    :theme-overrides="overridesTheme"
  >
    <go-app-provider>
      <I18n></I18n>
      <router-view></router-view>
    </go-app-provider>
  </n-config-provider>
</template>
<style>
.n-menu .n-menu-item {
    height: auto !important;
}
.n-menu .n-submenu .n-menu-item-content {
    height: auto !important;
}
.n-menu .n-menu-item-content {
    line-height: 2.75;
}
/* 子菜单颜色 */
.n-menu .n-menu-item-content.n-menu-item-content--child-active .n-menu-item-content-header {
  color: inherit;
}
.n-menu .n-menu-item-content.n-menu-item-content--child-active .n-menu-item-content__icon {
    color: inherit; /* or use 'initial' or 'unset' */
}

/* 侧边栏宽度 */
/* .go-project-sider{
  width: 350px !important;
  max-width: 350px !important;
} */
</style>
<script lang="ts" setup>
import { NConfigProvider } from 'naive-ui'
import { GoAppProvider } from '@/components/GoAppProvider'
import { I18n } from '@/components/I18n'
import { useDarkThemeHook, useThemeOverridesHook, useCode, useLang } from '@/hooks'

// 暗黑主题
const darkTheme = useDarkThemeHook()

// 主题配置
const overridesTheme = useThemeOverridesHook()

// 代码主题
const hljsTheme = useCode()

// 全局语言
const { locale, dateLocale } = useLang()

</script>
