<template>
  <!-- <i class="iconfont icon-shujuku"></i> -->
  <n-tree
  :on-update:expanded-keys="updatePrefixWithExpaned"
  :on-load="loadNode"
  :node-props="nodeProps"
    :data="treedata"
    expand-on-click
  />
</template>
<script lang="ts" setup>
import { defineComponent,ref, reactive,watch,h } from 'vue'
import {
  Folder,
  FolderOpenOutline,
  FileTrayFullOutline,
  GitBranchOutline,
  ListOutline
} from '@vicons/ionicons5'
import { TreeNodeType } from '@/enums/treeEnum'
import { repeat } from 'seemly'
import { TreeOption,NIcon, useMessage } from 'naive-ui'
import { datasourceListApi,datasourceTreeApi,tableTreeApi,columnTreeApi,functionsTreeApi } from '@/api/sqlserver'
import { viewsTreeApi } from '@/api/sqlserver'
import { SystemStoreEnum, SystemStoreNodeTableInfoEnum } from '@/store/modules/systemStore/systemStore.d'
import { useSystemStore } from '@/store/modules/systemStore/systemStore'
const message = useMessage()
const nodeProps = ({ option }: { option: TreeOption }) => {
  return {
    onDblclick () {
      if(option.treeNodeType == TreeNodeType.TABLE){
        // message.info('[DoubleClick] ' + option.label)
        // console.log(option);
        const extraParams:any = option.extraParams
        const obj = {
          dataSourceId:extraParams.dataSourceId,
          databaseType:extraParams.databaseType,
          schemaName:extraParams.schemaName,
          tableName:extraParams.tableName
        }
        const {dataSourceId, databaseType, schemaName, tableName} = obj
        const systemStore = useSystemStore()
        // 存储到 pinia 
        systemStore.setItem(SystemStoreEnum.NODE_TABLE_INFO, {
          [SystemStoreNodeTableInfoEnum.DATA_SOURCE_ID]: dataSourceId,
          [SystemStoreNodeTableInfoEnum.DATABASE_TYPE]: databaseType,
          [SystemStoreNodeTableInfoEnum.SCHEMA_NAME]: schemaName,
          [SystemStoreNodeTableInfoEnum.TABLE_NAME]: tableName
        })
      }
    },
    
  }
}
const props = defineProps({
    opdata: Array
})
watch(props, newValue => {
  treedata.value = newValue.opdata
})
const setToken = () => {

    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpblR5cGUiOiJsb2dpbiIsImxvZ2luSWQiOjIsImRldmljZSI6ImRlZmF1bHQtZGV2aWNlIiwiZWZmIjoxNzA2ODU0NTMwMDI3LCJyblN0ciI6Ik1RcHRPOUVBVlJlbGRQa1RFN01MZUpLeG5KTGVwRFpaIn0.knOw08E6mwWF_GpkeQ8KflQlfQuNu4jd-_Bgh7EnCj4'
}
const treedata:any = ref([])
const defaultExpandedKeys = ref([])


const updatePrefixWithExpaned = (
  _keys: Array<string | number>,
  _option: Array<TreeOption | null>,
  meta: {
    node: TreeOption | null
    action: 'expand' | 'collapse' | 'filter'
  }
) => {
  if (!meta.node) return
  switch (meta.action) {
    case 'expand':
      meta.node.prefix = () =>
        h(NIcon, null, {
          default: () => h(FolderOpenOutline)
        })
      break
    case 'collapse':
      meta.node.prefix = () =>
        h(NIcon, null, {
          default: () => h(Folder)
        })
      break
  }
}

const loadNode = async (node: TreeOption)=>{
  // console.log(node,'node');
 
    // 取table名
    if(node.treeNodeType == TreeNodeType.SCHEMAS){
      
        const _extraParams:any = node.extraParams;
        const params = {
           dataSourceId:node.value,
           dataSourceName: node.label,
           refresh: false,
         };
         const res = await datasourceTreeApi(params)
         if(res.data){
          const dataSourceId:any = node.value
          const dataSourceName:any = node.label

          const arrChild: any = ref([])
          res.data.forEach(item => {
            const preCode = [dataSourceId,dataSourceName,item.name].join('-');
            let obj = {
              schemaName: item.name,
              treeNodeType: TreeNodeType.SCHEMAS,
              label:item.name,
              key: item.name,
              isLeaf: false,
              prefix: () =>
              h(NIcon, null, {
                default: () => h(Folder)
              }),
              extraParams: {
                databaseType:_extraParams.databaseType,
                dataSourceId:_extraParams.dataSourceId,
                dataSourceName:_extraParams.dataSourceName,
                databaseName: item.name,
              },
              children:[
                {
                  treeNodeType: TreeNodeType.TABLES,
                  key: `${preCode}-tables`,
                  label:'tables',
                  isLeaf: false,
                  prefix: () =>
                  h(NIcon, null, {
                    default: () => h(Folder)
                  }),
                  extraParams: {
                    databaseType:_extraParams.databaseType,
                    dataSourceId:_extraParams.dataSourceId,
                    dataSourceName:_extraParams.dataSourceName,
                    databaseName: item.name,
                    schemaName: item.name,
                  },
                },
                {
                  treeNodeType: TreeNodeType.VIEWS,
                  key: `${preCode}-views`,
                  label:'views',
                  isLeaf: false,
                  prefix: () =>
                  h(NIcon, null, {
                    default: () => h(Folder)
                  }),
                  extraParams: {
                    databaseType:_extraParams.databaseType,
                    dataSourceId:_extraParams.dataSourceId,
                    dataSourceName:_extraParams.dataSourceName,
                    databaseName: item.name,
                    schemaName: item.name,
                  },
                },
                {
                  treeNodeType: TreeNodeType.FUNCTIONS,
                  key: `${preCode}-functions`,
                  label:'functions',
                  isLeaf: false,
                  prefix: () =>
                  h(NIcon, null, {
                    default: () => h(Folder)
                  }),
                  extraParams: {
                    databaseType:_extraParams.databaseType,
                    dataSourceId:_extraParams.dataSourceId,
                    dataSourceName:_extraParams.dataSourceName,
                    databaseName: item.name,
                    schemaName: item.name,
                  },
                },
                {
                  treeNodeType: TreeNodeType.PROCEDURES,
                  key: `${preCode}-procedures`,
                  label:'procedures',
                  isLeaf: false,
                  prefix: () =>
                  h(NIcon, null, {
                    default: () => h(Folder)
                  }),
                  extraParams: {
                    databaseType:_extraParams.databaseType,
                    dataSourceId:_extraParams.dataSourceId,
                    dataSourceName:_extraParams.dataSourceName,
                    databaseName: item.name,
                    schemaName: item.name,
                  },
                },
                {
                  treeNodeType: TreeNodeType.TRIGGERS,
                  key: `${preCode}-triggers`,
                  label:'triggers',
                  isLeaf: false,
                  prefix: () =>
                  h(NIcon, null, {
                    default: () => h(Folder)
                  }),
                  extraParams: {
                    databaseType:_extraParams.databaseType,
                    dataSourceId:_extraParams.dataSourceId,
                    dataSourceName:_extraParams.dataSourceName,
                    databaseName: item.name,
                    schemaName: item.name,
                  },
                },
              ]
            }
            arrChild.value.push(obj)
          });

          return new Promise<void>((resolve) => {
             node.children = arrChild.value
             resolve()
          })
         }else{
          return new Promise<void>((resolve) => {
             node.children = []
             resolve()
          })
        
        }

    }
    else if(node.treeNodeType == TreeNodeType.TABLES){
      // 下一种
      const _extraParams:any = node.extraParams;
      // console.log(_extraParams,"_extraParams");
      
        const params = {
           dataSourceId:_extraParams.dataSourceId,
           dataSourceName: _extraParams.dataSourceName,
           databaseType: _extraParams.databaseType,
           schemaName: _extraParams.schemaName,
           pageNo:1,
           pageSize:1000,
           refresh: false,
         };
         const res = await tableTreeApi(params)
        //  console.log(res.data);
         
         if(res.data){
          const dataSourceId:any = _extraParams.dataSourceId
          const databaseName:any = _extraParams.databaseName
          const schemaName:any = _extraParams.schemaName

          const arrChild: any = ref([])
          res.data.data.forEach(item => {
            const preCode = [dataSourceId,databaseName,schemaName,item.name].join('-');
            let obj = {
              pinned: item.pinned,
              comment: item.comment,
              treeNodeType: TreeNodeType.TABLE,
              label:item.name,
              key: item.name,
              isLeaf: false,
              prefix: () =>
              h(NIcon, null, {
                default: () => h(Folder)
              }),
              extraParams: {
                databaseType:_extraParams.databaseType,
                dataSourceId:_extraParams.dataSourceId,
                dataSourceName:_extraParams.dataSourceName,
                databaseName: _extraParams.databaseName,
                schemaName: _extraParams.schemaName,
                tableName: item.name,
              },
              children:[
                {
                  treeNodeType: TreeNodeType.COLUMNS,
                  key: `${preCode}-columns`,
                  label:'columns',
                  isLeaf: false,
                  prefix: () =>
                  h(NIcon, null, {
                    default: () => h(Folder)
                  }),
                  extraParams: {
                      databaseType:_extraParams.databaseType,
                      dataSourceId:_extraParams.dataSourceId,
                      dataSourceName:_extraParams.dataSourceName,
                      databaseName: _extraParams.databaseName,
                      schemaName: _extraParams.schemaName,
                      tableName: item.name,
                  },
                },
                {
                  treeNodeType: TreeNodeType.KEYS,
                  key: `${preCode}-keys`,
                  label:'keys',
                  isLeaf: false,
                  prefix: () =>
                  h(NIcon, null, {
                    default: () => h(Folder)
                  }),
                  extraParams: {
                      databaseType:_extraParams.databaseType,
                      dataSourceId:_extraParams.dataSourceId,
                      dataSourceName:_extraParams.dataSourceName,
                      databaseName: _extraParams.databaseName,
                      schemaName: _extraParams.schemaName,
                      tableName: item.name,
                  },
                },
                {
                  treeNodeType: TreeNodeType.INDEXES,
                  key: `${preCode}-indexs`,
                  label:'indexs',
                  isLeaf: false,
                  prefix: () =>
                  h(NIcon, null, {
                    default: () => h(Folder)
                  }),
                  extraParams: {
                      databaseType:_extraParams.databaseType,
                      dataSourceId:_extraParams.dataSourceId,
                      dataSourceName:_extraParams.dataSourceName,
                      databaseName: _extraParams.databaseName,
                      schemaName: _extraParams.schemaName,
                      tableName: item.name,
                  },
                },
                
              ]
            }
            arrChild.value.push(obj)
          });

          return new Promise<void>((resolve) => {
             node.children = arrChild.value
             resolve()
          })
         }else{
          return new Promise<void>((resolve) => {
             node.children = []
             resolve()
          })
        
        }
       
    }
    else if(node.treeNodeType == TreeNodeType.FUNCTIONS){
      // 下一种
      const _extraParams:any = node.extraParams;
      // console.log(_extraParams,"_extraParams");
      
        const params = {
           dataSourceId:_extraParams.dataSourceId,
           dataSourceName: _extraParams.dataSourceName,
           databaseType: _extraParams.databaseType,
           schemaName: _extraParams.schemaName,
           pageNo:1,
           pageSize:1000,
           refresh: false,
         };
         const res = await functionsTreeApi(params)
        //  console.log(res.data);
         
         if(res.data){
          const dataSourceId:any = _extraParams.dataSourceId
          const databaseName:any = _extraParams.databaseName
          const schemaName:any = _extraParams.schemaName

          const arrChild: any = ref([])
          res.data.data.forEach(item => {
            const preCode = [dataSourceId,databaseName,schemaName,item.name].join('-');
            let obj = {
              treeNodeType: TreeNodeType.FUNCTION,
              label:item.functionName,
              key: item.functionName,
              isLeaf: true,
              prefix: () =>
              h(NIcon, null, {
                default: () => h(GitBranchOutline)
              }),
              extraParams: {
                databaseType:_extraParams.databaseType,
                dataSourceId:_extraParams.dataSourceId,
                dataSourceName:_extraParams.dataSourceName,
                databaseName: _extraParams.databaseName,
                schemaName: _extraParams.schemaName,
                functionName: item.name,
              }
            }
            arrChild.value.push(obj)
          });

          return new Promise<void>((resolve) => {
             node.children = arrChild.value
             resolve()
          })
         }else{
          return new Promise<void>((resolve) => {
             node.children = []
             resolve()
          })
        
        }


    }
    else if(node.treeNodeType == TreeNodeType.VIEWS){
      // 下一种
      const _extraParams:any = node.extraParams;
      // console.log(_extraParams,"_extraParams");
      
        const params = {
           dataSourceId:_extraParams.dataSourceId,
           dataSourceName: _extraParams.dataSourceName,
           databaseType: _extraParams.databaseType,
           schemaName: _extraParams.schemaName,
           pageNo:1,
           pageSize:1000,
           refresh: false,
         };
         const res = await viewsTreeApi(params)
        //  console.log(res.data);
         
         if(res.data){
          const dataSourceId:any = _extraParams.dataSourceId
          const databaseName:any = _extraParams.databaseName
          const schemaName:any = _extraParams.schemaName

          const arrChild: any = ref([])
          res.data.data.forEach(item => {
            const preCode = [dataSourceId,databaseName,schemaName,item.name].join('-');
            let obj = {
              pinned: item.pinned,
              comment: item.comment,
              treeNodeType: TreeNodeType.VIEW,
              label:item.name,
              key: item.name,
              isLeaf: false,
              prefix: () =>
              h(NIcon, null, {
                default: () => h(Folder)
              }),
              extraParams: {
                databaseType:_extraParams.databaseType,
                dataSourceId:_extraParams.dataSourceId,
                dataSourceName:_extraParams.dataSourceName,
                databaseName: _extraParams.databaseName,
                schemaName: _extraParams.schemaName,
                tableName: item.name,
              },
              children:[
                {
                  treeNodeType: TreeNodeType.COLUMNS,
                  key: `${preCode}-columns`,
                  label:'columns',
                  isLeaf: false,
                  prefix: () =>
                  h(NIcon, null, {
                    default: () => h(Folder)
                  }),
                  extraParams: {
                      databaseType:_extraParams.databaseType,
                      dataSourceId:_extraParams.dataSourceId,
                      dataSourceName:_extraParams.dataSourceName,
                      databaseName: _extraParams.databaseName,
                      schemaName: _extraParams.schemaName,
                      tableName: item.name,
                  },
                }
                
              ]
            }
            arrChild.value.push(obj)
          });

          return new Promise<void>((resolve) => {
             node.children = arrChild.value
             resolve()
          })
         }else{
          return new Promise<void>((resolve) => {
             node.children = []
             resolve()
          })
        
        }
       
    }
    else if(node.treeNodeType == TreeNodeType.COLUMNS){
      // 下一种
      const _extraParams:any = node.extraParams;
      // console.log(_extraParams,"_extraParams");
      
        const params = {
           dataSourceId:_extraParams.dataSourceId,
           dataSourceName: _extraParams.dataSourceName,
           databaseType: _extraParams.databaseType,
           schemaName: _extraParams.schemaName,
           tableName:_extraParams.tableName,
           pageNo:1,
           pageSize:1000,
           refresh: false,
         };
         const res = await columnTreeApi(params)
        //  console.log(res.data);
         
         if(res.data){
          const dataSourceId:any = _extraParams.dataSourceId
          const databaseName:any = _extraParams.databaseName
          const schemaName:any = _extraParams.schemaName

          const arrChild: any = ref([])
          res.data.forEach(item => {
            const preCode = [dataSourceId,databaseName,schemaName,item.name].join('-');
            let obj = {
              treeNodeType: TreeNodeType.FUNCTION,
              label:item.name,
              key: `${preCode}-COLUMNitem`,
              isLeaf: true,
              prefix: () =>
              h(NIcon, null, {
                default: () => h(ListOutline)
              }),
              extraParams: {
                databaseType:_extraParams.databaseType,
                dataSourceId:_extraParams.dataSourceId,
                dataSourceName:_extraParams.dataSourceName,
                databaseName: _extraParams.databaseName,
                schemaName: _extraParams.schemaName
              }
            }
            arrChild.value.push(obj)
          });

          return new Promise<void>((resolve) => {
             node.children = arrChild.value
             resolve()
          })
         }else{
          return new Promise<void>((resolve) => {
             node.children = []
             resolve()
          })
        
        }


    }
    else{

      return new Promise<void>((resolve) => {
             node.children = []
             resolve()
          })
    }

  
 }




const dataSourceOptions: TreeOption[] = []




</script>
<style lang="scss" scoped>
@import url('../../../../../../../assets/font/iconfont.css');

</style>