<template>
  <div class="go-project-items">
    <div class="container">
      <div class="workspace-left">
        <div class="leftHead">
          Connections
          <n-menu
            v-model:value="activeKey"
            :root-indent="36"
            :indent="12"
            :options="dataSourceOptions"
          />
            <!-- <n-select v-model:value="dataSourceId" :options="dataSourceOptions">
              <template v-slot:default="{ option }">
                <div v-html="option.label"></div>
              </template>
            </n-select> -->
        </div>
        <!-- <n-list>
          <n-list-item v-for="(item,index) in optionsConnect.value" :key="index" @click="handleSelectConnect(item.id)">
            {{ item.alias }}
          </n-list-item>
        </n-list> -->
        
      </div>
      <div class="workspace-right">
        <!-- <i class="iconfont icon-mysql"></i> -->
        <div class="dataBaseListBox">
          <div class="dataBaseList">
            <div class="databaseItem" v-for="item in databaseTypeList" :key="item.code" @click="handleCreateConnections(item)">
              <div class="databaseItemMain">
                <div class="databaseItemLeft">
                  <div class="logoBox">
                    <i class="icon iconfont">{{ item.icon }}</i>
                  </div>
                  {{item.name}}
                </div>
                <div class="databaseItemRight">
                  <span class="icon iconfont">&#xeb78;</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <CreateModalDB :show="modalShow" @close="closeHandle" :dat="newSourceParam" :isupd="isupd"></CreateModalDB>
  </div>
  
</template>

<script setup lang="ts">
import { CreateModalDB } from './components/CreateModalDB/index'

import { databaseTypeList } from '@/constants';


import { ref, reactive, onMounted, watch } from 'vue'
import { datasourceListApi } from '@/api/sqlserver'


const activeKey = ref('')

const optionsConnect:any = []

const handleSelectConnect = id => {

}
async function getDatasourceList() {
  const dataSourceList = await datasourceListApi({
    pageNo: 1,
    pageSize: 999,
    refresh: true,
  });
  const result = dataSourceList.data
  const formattedData = result.data.map((item) => ({
    ...item,
    key: item.id,
    value: item.id,
    label: item.alias
      // <div className={styles.optionItem}>
      //   <Iconfont className={styles.optionItemIcon} code={databaseMap[item.type]?.icon} />
      //   <div className={styles.optionItemText}>{item.alias}</div>
      // </div>,
  }));
  
  dataSourceOptions.value = formattedData
  optionsConnect.value = result.data
  // console.log(optionsConnect.value,'hshshshshsh');
  
  
}
// getDatasourceList()
onMounted(() => {

  getDatasourceList()

})
const isupd = ref<string>('add')
const newSourceParam:any = reactive({
  title:'',
  isupd:'',
  id:''
})

const modalShow = ref<boolean>(false)


const clickHandle = () => {
  modalShow.value = true
}

const closeHandle = () => {
  modalShow.value = false
}

watch(() => modalShow.value, (newValue) => {
  if(!newValue){
    // console.log('whwhwhwh');
    
    getDatasourceList()
  }
})
const setToken = () => {

  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpblR5cGUiOiJsb2dpbiIsImxvZ2luSWQiOjIsImRldmljZSI6ImRlZmF1bHQtZGV2aWNlIiwiZWZmIjoxNzA2ODU0NTMwMDI3LCJyblN0ciI6Ik1RcHRPOUVBVlJlbGRQa1RFN01MZUpLeG5KTGVwRFpaIn0.knOw08E6mwWF_GpkeQ8KflQlfQuNu4jd-_Bgh7EnCj4'
}



const handleCreateConnections = item => {
  clickHandle()

  newSourceParam.title = item.name
  newSourceParam.isupd = 'add'
}
watch(() => activeKey.value, (newValue) => {
  updateHandle(newValue)
})
const updateHandle = index => {
  clickHandle()
  // console.log(index);
  for(let i = 0; i < dataSourceOptions.value.length; i++){
    const item:any = dataSourceOptions.value[i]
    if(index == item.id){
      newSourceParam.title = item.type
      newSourceParam.id = item.id
      newSourceParam.isupd = 'upd'
    }
  }
  
}






const dataSourceId = ref('')
const dataSourceOptions = ref([])

</script>

<style lang="scss" scoped>
@import url('../../../assets/font/iconfont.css');
// $WorkspaceLeftWidth:20vw;
@include go(project-items) {
  padding: 10px 10px;
}
.container{
  display: flex;
  // flex-direction: row;
}
.workspace-left{
  width: 20%;
  height: 100%;
}
.workspace-right{
  width: 75%;
  height: 100%;
  .dataBaseListBox{
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100%;
    .dataBaseList{
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      max-width: 800px;
      .databaseItem:hover {
        // background-color: var(--color-bg-medium);
        border-color: var(--n-color-primary);
        // color: var(--n-color-primary);
        // border: 1px solid var(--n-color-target);
        cursor: pointer;
      }
      .databaseItem{
        flex-grow: 1;
        height: 50px;
        width: 210px;
        margin: 10px 20px;
        padding: 0 16px;
        border-radius: 8px;
        overflow: hidden;
        box-sizing: border-box;
        border: 1px solid rgba(211, 211, 212, 0.4);
        .databaseItemMain{
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 50px;
          border-radius: 8px;
          .databaseItemLeft{
            display: flex;
            align-items: center;
            .logoBox{
              display: flex;
              justify-content: center;
              align-items: center;
              height: 28px;
              width: 28px;
              border-radius: 8px;
              margin-right: 16px;
            }
          }
          // .databaseItemRight{
          //   display: none;
          // }
        }
      }
    }
  }
}
</style>
