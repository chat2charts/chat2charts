import { reactive, h } from 'vue'
import { renderIcon } from '@/utils'
import { RouterLink } from 'vue-router'
import { PageEnum } from '@/enums/pageEnum'
import { MenuOption, MenuGroupOption } from 'naive-ui'
import { icon } from '@/plugins'
import { ProjectLayoutCreate } from '../ProjectLayoutCreate/index'
import { DataSourceTree } from '../DataSourceTree/index'
const { HardwareChipOutlineIcon, DuplicateIcon, LinkOutlineIcon } = icon.ionicons5
const { ObjectStorageIcon, DevicesIcon, ConnectSourceIcon, GroupResourceIcon } = icon.carbon
export const renderMenuLabel = (option: MenuOption | MenuGroupOption) => {
  return option.label
}

export const expandedKeys = () => ['all-project']

export const menuOptionsInit = () => {
  const t = window['$t']

  return reactive([
    // ==始
    {
      label: () => h('span', null, { default: () => t('project.datasource_management') }),
      key: 'datasource-management',
      icon: renderIcon(HardwareChipOutlineIcon),
      children: [
        {
          label: () =>
            h(
              RouterLink,
              {
                to: {
                  name: PageEnum.NEW_DATASOURCE_NAME,
                },
              },
              { default: () => t('project.new_datasource') }
            ),
          key: PageEnum.NEW_DATASOURCE_NAME,
          icon: renderIcon(LinkOutlineIcon),
        },
        {
          // label: () => h(DataSourceTree),
          label: () =>
            h(
              RouterLink,
              {
                to: {
                  name: PageEnum.BASE_HOME_SQLSERVER_NAME,
                },
              },
              { default: () => h(DataSourceTree) }
            ),
          key: PageEnum.DATASOURCE_TREE_NAME,
          // icon: renderIcon(ObjectStorageIcon),
        },
      ],
    },
    // ==终

    {
      key: 'divider-1',
      type: 'divider',
    },

    // ==始
    {
      label: () => h('span', null, { default: () => t('project.project_management') }),
      key: 'project-management',
      icon: renderIcon(DevicesIcon),
      children: [
        {
          label: () => h(ProjectLayoutCreate),
          key: 'project-create',
          icon: renderIcon(DuplicateIcon),
        },
        {
          label: () =>
            h(
              RouterLink,
              {
                to: {
                  name: PageEnum.BASE_HOME_ITEMS_NAME,
                },
              },
              { default: () => t('project.project') }
            ),
          key: PageEnum.BASE_HOME_ITEMS_NAME,
          icon: renderIcon(ObjectStorageIcon),
        },
        
      ],
    },
    // ==终
  ])
}
