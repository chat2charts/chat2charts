<template>
  <SourceTree :opdata="dataSourceOptions"></SourceTree>
  <!-- <CreateModal :show="modalShow" @close="closeHandle"></CreateModal> -->
</template>
<script setup lang="ts">
import { defineComponent,ref, reactive, onMounted, h} from 'vue'
import {
  Folder,
  FolderOpenOutline,
  FileTrayFullOutline
} from '@vicons/ionicons5'
import { TreeNodeType } from '@/enums/treeEnum'
import { useDesignStore } from '@/store/modules/designStore/designStore'
import { CreateModal } from './components/CreateModal/index'
import { SourceTree } from './components/SourceTree/index'
import { icon } from '@/plugins'
import { NIcon } from 'naive-ui'
import { datasourceListApi } from '@/api/sqlserver'
onMounted(() => {

  getDatasourceList()

})
const setTokenCur = () => {

  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpblR5cGUiOiJsb2dpbiIsImxvZ2luSWQiOjIsImRldmljZSI6ImRlZmF1bHQtZGV2aWNlIiwiZWZmIjoxNzA2ODU0NTMwMDI3LCJyblN0ciI6Ik1RcHRPOUVBVlJlbGRQa1RFN01MZUpLeG5KTGVwRFpaIn0.knOw08E6mwWF_GpkeQ8KflQlfQuNu4jd-_Bgh7EnCj4'
}
const dataSourceOptions = ref([])
const getDatasourceList = async () => {
    const dataSourceList = await datasourceListApi({
      pageNo: 1,
      pageSize: 999,
      refresh: false,
    });
    const result = dataSourceList.data
    const formattedData = result.data.map((item) => ({
      key: `dataSource-${item.id}`,
      value: item.id,
      label: item.alias,
      isLeaf: false,
      treeNodeType: TreeNodeType.SCHEMAS,
      extraParams: {
        databaseType: item.type,
        dataSourceId: item.id,
        dataSourceName: item.alias,
      },
      prefix: () =>
      h(NIcon, null, {
        default: () => h(Folder)
      }),
      
    }));

    dataSourceOptions.value = formattedData
}

const { DuplicateIcon, DuplicateOutlineIcon } = icon.ionicons5
const designStore = useDesignStore()

const props = defineProps({
  collapsed: Boolean
})

const modalShow = ref<boolean>(false)

const clickHandle = () => {
  modalShow.value = true
}

const closeHandle = () => {
  modalShow.value = false
}
</script>
