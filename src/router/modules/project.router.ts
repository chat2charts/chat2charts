import { RouteRecordRaw } from 'vue-router'
import { PageEnum } from '@/enums/pageEnum'

// 引入路径
const importPath = {
  'PageEnum.BASE_HOME_NAME': () => import('@/views/project/index.vue'),
  'PageEnum.BASE_HOME_ITEMS_NAME': () => import('@/views/project/items/index.vue'),
  'PageEnum.BASE_HOME_TEMPLATE_NAME': () => import('@/views/project/mtTemplate/index.vue'),
  'PageEnum.BASE_HOME_TEMPLATE_MARKET_NAME': () => import('@/views/project/templateMarket/index.vue'),
  'PageEnum.BASE_HOME_SQLSERVER_NAME': () => import('@/views/project/workbench/index.vue'),
  'PageEnum.NEW_DATASOURCE_NAME': () => import('@/views/project/newDatasource/index.vue')
}

const projectRoutes: RouteRecordRaw = {
  path: PageEnum.BASE_HOME,
  name: PageEnum.BASE_HOME_NAME,
  component: importPath['PageEnum.BASE_HOME_NAME'],
  redirect: PageEnum.BASE_HOME_ITEMS,
  meta: {
    title: '项目',
    isRoot: true
  },
  children: [
    {
      path: PageEnum.BASE_HOME_ITEMS,
      name: PageEnum.BASE_HOME_ITEMS_NAME,
      component: importPath['PageEnum.BASE_HOME_ITEMS_NAME'],
      meta: {
        title: '全部项目'
      }
    },
    {
      path: PageEnum.BASE_HOME_TEMPLATE,
      name: PageEnum.BASE_HOME_TEMPLATE_NAME,
      component: importPath['PageEnum.BASE_HOME_TEMPLATE_NAME'],
      meta: {
        title: '我的模板'
      }
    },
    {
      path: PageEnum.BASE_HOME_TEMPLATE_MARKET,
      name: PageEnum.BASE_HOME_TEMPLATE_MARKET_NAME,
      component: importPath['PageEnum.BASE_HOME_TEMPLATE_MARKET_NAME'],
      meta: {
        title: '模板市场'
      }
    },
    {
      path: PageEnum.BASE_HOME_SQLSERVER,
      name: PageEnum.BASE_HOME_SQLSERVER_NAME,
      component: importPath['PageEnum.BASE_HOME_SQLSERVER_NAME'],
      meta: {
        title: '工作台'
      }
    },
    {
      path: PageEnum.NEW_DATASOURCE,
      name: PageEnum.NEW_DATASOURCE_NAME,
      component: importPath['PageEnum.NEW_DATASOURCE_NAME'],
      meta: {
        title: '新建数据源'
      }
    }
  ]
}

export default projectRoutes
