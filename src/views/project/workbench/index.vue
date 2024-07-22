<template>
  <div class="go-project-items">
    <n-tabs
      ref="tabsInstRef"
      v-model:value="valueTab"
      type="card"
      :addable="addable"
      :closable="closable"
      tab-style="min-width: 80px;"
      @close="handleClose"
      @add="handleAdd"
    >

      <!-- <n-tab-panel key="panel" name="panel">
        <n-button @click="getTable"> wwwww </n-button>
        <n-table :bordered="true" :single-line="false">
          <thead>
            <tr>
              <th v-for="(item,index) in headerListNode" :key="index+item.name">{{ item.name }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in dataListNode" :key="index">
              <td v-for="tex in item">{{ tex }}</td>
            </tr>
          </tbody>
        </n-table>
        
        <n-divider dashed>
          以上为节点table表
        </n-divider>
        <n-pagination
          v-model:page="pagePanel"
          :page-count="100"
          show-quick-jumper
          show-size-picker
        />
        <n-table :bordered="true" :single-line="false">
          <thead>
            <tr>
              <th v-for="(item,index) in headerList" :key="index+item.name">{{ item.name }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in dataList" :key="index">
              <td v-for="tex in item">{{ tex }}</td>
            </tr>
          </tbody>
        </n-table>
        
      </n-tab-panel> -->

    <n-tab-pane :key="0" name="RunSQL">
       <!-- 0204 -->
       <div class="container">
          <div class="workspace-top">
            <n-space vertical>
              <n-input-group>
                <n-input
                v-model:value="inputInfo"
                 :style="{ width: '33%' }"  placeholder="在这里输入纯文本语句">
                 <template #prefix>
                  <img src="~@/assets/images/exception/ai.svg" alt="" />
                  </template>
                </n-input>
                <n-input-group-label style="cursor: pointer;" @click=submitInfo>
                  <i class="iconfont icon-huiche"></i>

                </n-input-group-label>
              </n-input-group>
            </n-space>
            <div style="width: 100%;">
              <monaco-editor v-model:modelValue="sqlValue" width="100%" height="260px" language="sql" />
            </div>

              <div style="padding: 15px;display: flex;justify-content: space-between;align-items: center;">
                <div class="leftBut">
                  <n-button round @click="runSql" type="primary">
                    <template #icon>
                      <n-icon><caret-forward-icon /></n-icon>

                    </template>
                    执行
                  </n-button>
                  <n-button>格式化</n-button>
                </div>
                <div class="rightBut">
                  <n-select
                    v-model:value="dbChoice"
                    size="small"
                    :options="dbChoiceOptions"
                  >
                  </n-select>
                  <n-select
                    v-model:value="tbChoice"
                    size="small"
                    :options="tbChoiceOptions"
                  >
                  </n-select>
                </div>
              </div>

          </div>
          <div class="workspace-bottom">
            <!-- <n-tabs type="card" size="medium" closable>
              <n-tab-pane name="Bione_User_Info" tab="bione_user_info">
                <n-data-table
                  :columns="columns"
                  :data="tableData"
                  :row-class-name="rowClassName"
                  :pagination="pagination"
                />
                <div style="width: 100%;display: flex;justify-content: center;">
                  <v-chart
                    ref="vChartRefBar"
                    :option="deviceOption"
                    :manual-update="true"
                    autoresize
                    :style="chartStyle"
                  ></v-chart>
                </div>
              </n-tab-pane>
              <n-tab-pane name="tab2" tab="Tab2">
                <n-table :bordered="false" :single-line="false">
                  <thead>
                    <tr>
                      <th v-for="(item,index) in headList" :key="index+item.name">{{ item.name }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,index) in bodyList">
                      <td v-for="tex in item">{{ tex }}</td>
                    </tr>
                  </tbody>
                </n-table>
                <n-pagination v-model:page="page" :page-count="100" />
              </n-tab-pane>
              <n-tab-pane name="jay chou" tab="Jay Chou">
                Jay Chou Seven
              </n-tab-pane>
              
            </n-tabs> -->


            <!-- run出来的表和图 -->
            <n-table :bordered="false" :single-line="false">
              <thead>
                <tr>
                  <th v-for="(item,index) in headList" :key="index+item.name">{{ item.name }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in bodyList">
                  <td v-for="tex in item">{{ tex }}</td>
                </tr>
              </tbody>
            </n-table>

            <div v-show="errorMessage">
              {{ errorMessage }}
            </div>
            <!-- <div style="width: 100%;display: flex;justify-content: center;">
              <v-chart
                ref="vChartRefBar"
                :option="deviceOption"
                :manual-update="true"
                autoresize
                :style="chartStyle"
              ></v-chart>
            </div> -->
            

          </div>
        </div>
    
      </n-tab-pane>
      
    
      <n-tab-pane v-for="(table,index1) in curTableArr" :key="processTableName(table.tableName)" :name="processTableName(table.tableName)" :tab="processTableName(table.tableName)">
        <n-table :bordered="false" :single-line="false">
          <thead>
            <tr>
              <th v-for="(item,index) in table.headerList" :key="index+item.name">{{ item.name }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in table.dataList">
              <td v-for="tex in item">{{ tex }}</td>
            </tr>
          </tbody>
        </n-table>
        <!-- <n-pagination
          v-model:page="pagePanel"
          :page-count="100"
          show-quick-jumper
          show-size-picker
        /> -->
      </n-tab-pane>
      <!-- <template #prefix>
        Prefix
      </template>
      <template #suffix>
        Suffix
      </template> -->
    </n-tabs>
    
  </div>
</template>

<script setup lang="ts">

import { PieChart } from 'echarts/charts'
import type { EChartsOption } from 'echarts'
import VChart from 'vue-echarts'

import { CaretForwardOutline as CaretForwardIcon } from '@vicons/ionicons5'
import { NInput } from 'naive-ui'
import { MonacoEditor } from '@/components/Pages/MonacoEditor'
import { ref, reactive, onMounted, h, computed, watch, nextTick } from 'vue'
import { aiSqlApi,executeSql, datasourceListApi, datasourceTreeApi, executeTable } from '@/api/sqlserver'
import type { DataTableColumns,TabsInst } from 'naive-ui'

import { useSystemStore } from '@/store/modules/systemStore/systemStore'
import { json } from 'stream/consumers'


const sqlConsoleArr = ref([
  {

  }
])
interface Table {
  tableName: string;
  sql: string;
  originalSql: string;
  description: string;
  message: any;
  success: any;
  updateCount: any;
  headerList: any[];
  dataList: any[];
  sqlType: string;
  hasNextPage: boolean;
  pageNo: number;
  pageSize: number;
  fuzzyTotal: string;
  duration: number;
  canEdit: boolean;
}

const curTableArr = ref([] as Table[]);
const curTableArr1 = ref([
  // {
  //   headerList: [
  //       {
  //           dataType: "CHAT2DB_ROW_NUMBER",
  //           name: "Row Number",
  //           primaryKey: null,
  //           comment: null,
  //           defaultValue: null,
  //           autoIncrement: null,
  //           nullable: null,
  //           columnSize: null,
  //           decimalDigits: null
  //       },
  //       {
  //           dataType: "STRING",
  //           name: "FIELD_NAME",
  //           primaryKey: null,
  //           comment: null,
  //           defaultValue: null,
  //           autoIncrement: null,
  //           nullable: null,
  //           columnSize: null,
  //           decimalDigits: null
  //       },
  //       {
  //           dataType: "STRING",
  //           name: "FIELD_LENGTH",
  //           primaryKey: null,
  //           comment: null,
  //           defaultValue: null,
  //           autoIncrement: null,
  //           nullable: null,
  //           columnSize: null,
  //           decimalDigits: null
  //       }
  //   ],
  //   dataList: [
  //       [
  //           "1",
  //           "userId",
  //           "0"
  //       ],
  //       [
  //           "2",
  //           "userNo",
  //           "32"
  //       ],
  //       [
  //           "3",
  //           "userName",
  //           "50"
  //       ],
  //       [
  //           "4",
  //           "userPwd",
  //           "15"
  //       ],
  //       [
  //           "5",
  //           "userPwdTo",
  //           "15"
  //       ],
  //       [
  //           "6",
  //           "sex",
  //           "0"
  //       ],
  //       [
  //           "7",
  //           "birthday",
  //           "10"
  //       ],
  //       [
  //           "8",
  //           "email",
  //           "100"
  //       ],
  //       [
  //           "9",
  //           "userAgname",
  //           "50"
  //       ],
  //       [
  //           "10",
  //           "mobile",
  //           "20"
  //       ]
  //   ],
  //   tableName: "\"ACT_GE_PROPERTY\""
  // }
])

const processTableName = (name: string) => {
  return name.replace(/["\\]/g, '');
};
// import { createPinia } from 'pinia'
 
// const pinia = createPinia()
// watch(
//   pinia.state,
//   (state) => {
//     // 每当状态发生变化时，将所有 state 持久化到本地存储
//     localStorage.setItem('piniaState', JSON.stringify(state))
//   },
//   { deep: true }
// )
const headerListNode:any = ref([])
const dataListNode:any = ref([])
const systemStore = useSystemStore()


// watch(() => curTableArr.value, (newData: any) => {
//   if (newData) {
//     console.log(newData,'curTableArr.value');
    
//   }
// })
const valueTab:any = ref('RunSQL')
const valueRef:any = ref(0)
const tabsInstRef = ref<TabsInst | null>(null)
systemStore.$subscribe(async (mutation, state) => {
  // localStorage.setItem('counter', JSON.stringify(state))
  // console.log(mutation,'mutation',state,'state');
  const nodeTableInfo = state.nodeTableInfo
  let obj = {
    dataSourceId: Number(nodeTableInfo.dataSourceId),
    databaseType: nodeTableInfo.databaseType,
    hasNextPage: true,
    pageNo: 1,
    pageSize: 10,
    schemaName: nodeTableInfo.schemaName,
    sql: "SELECT * FROM \"" + nodeTableInfo.tableName + "\"",
    tableName: nodeTableInfo.tableName,
    total: 0,
    type: "ORACLE"
  }

  const res = await executeTable(obj)
  // console.log(res.data,res.data);
  const newConfig = res.data[0]
  headerListNode.value = newConfig.headerList
  dataListNode.value = newConfig.dataList
  
  // console.log(curTableArr.value);
  let arr = curTableArr.value
  // console.log(arr,'arr');
  
  const str:any = ref()
  let bol = false
  for(let i = 0; i < arr.length; i++){
    if(newConfig.tableName == arr[i].tableName){
      bol = true
    }
  }
  
  str.value = newConfig.tableName
  if(bol){
    
  }else{
    curTableArr.value.push(newConfig)
  }
  valueTab.value = str.value != 'RunSQL' ? str.value.replace(/["\\]/g, '') : str.value;
  nextTick(() => tabsInstRef.value?.syncBarPosition())
  // console.log('valueRef.value',valueTab.value);
  
  // console.log(headerListNode.value,'headerListNode.value',dataListNode.value,'dataListNode.value');
  
})

const objTableNode:any = computed(() => {
  return systemStore.getNodeTableInfo
})


const nodeTableData:any = async () => {
  let obj = {
    dataSourceId: Number(objTableNode.dataSourceId),
    databaseType: objTableNode.databaseType,
    hasNextPage: true,
    pageNo: 1,
    pageSize: 10,
    schemaName: objTableNode.schemaName,
    sql: "SELECT * FROM \"" + objTableNode.tableName + "\"",
    tableName: objTableNode.tableName,
    total: 0,
    type: "ORACLE"
  }
  const res = await executeTable(obj)
  // console.log(res.data,res.data);
  const newConfig = res.data[0]
  // headerList.value = newConfig.headerList
  // dataList.value = newConfig.dataList
  return newConfig
}


const panelsRef = ref([1, 2, 3, 4, 5])
const addableRef = computed(() => {
  return {
    disabled: panelsRef.value.length >= 10
  }
})
const closableRef = computed(() => {
  return panelsRef.value.length > 1
})

const panels = panelsRef
const addable = addableRef
const closable = closableRef
const handleAdd = () => {
  const newValue = Math.max(...panelsRef.value) + 1
  panelsRef.value.push(newValue)
  valueRef.value = newValue
}
const handleClose = (name: number) => {
  const { value: panels } = panelsRef
  const nameIndex = panels.findIndex((panelName) => panelName === name)
  if (!~nameIndex) return
  panels.splice(nameIndex, 1)
  if (name === valueRef.value) {
    valueRef.value = panels[Math.min(nameIndex, panels.length - 1)]
  }
}





const headerList:any = ref([])
const dataList:any = ref([])
const getTable = async () => {

  // let obj = {
  //   dataSourceId: 3,
  //   databaseType: "ORACLE",
  //   hasNextPage: true,
  //   pageNo: 1,
  //   pageSize: 10,
  //   schemaName: "UPRR_B",
  //   sql: "SELECT * FROM \"BIONE_AUTH_OBJ_USER_REL\"",
  //   tableName: "BIONE_AUTH_OBJ_USER_REL",
  //   total: 0,
  //   type: "ORACLE"
  // }
  // const res = await executeTable(obj)
  // // console.log(res.data);
  // const newConfig = res.data[0]
  // headerList.value = newConfig.headerList
  // dataList.value = newConfig.dataList
  let json1 = ``
    // console.log(JSON.parse(json1));
    

}



const errorMessage:any = ref()

const headList:any = ref([])
const bodyList:any = ref([])

const dbChoice:any = ref()
const dbChoiceOptions:any = ref([])
const tbChoice:any = ref()
const tbChoiceOptions:any = ref([])

const page = ref(2)
const pagePanel = ref(7)


const tableString:any = ref('')
components: {
  CaretForwardIcon
}
const editorLoading = ref(true)
type RowData = {
  key: number
  field_name: string
  field_length: string
}
const chartStyle = {
  width: '528px',
  height: '200px'
}
const pagination = {
  pageSize: 10
}
const createData = (): RowData[] => [
  {
    key: 0,
    field_name: 'userId',
    field_length: '0'
  },
  {
    key: 1,
    field_name: 'userNo',
    field_length: '32'
  },
  {
    key: 2,
    field_name: 'userName',
    field_length: '50'
  },
  {
    key: 3,
    field_name: 'userPwd',
    field_length: '15'
  },
  {
    key: 4,
    field_name: 'userPwdTo',
    field_length: '15'
  },
  {
    key: 5,
    field_name: 'sex',
    field_length: '0'
  },
  {
    key: 6,
    field_name: 'birthday',
    field_length: '10'
  },
  {
    key: 7,
    field_name: 'email',
    field_length: '100'
  },
  {
    key: 8,
    field_name: 'userAgname',
    field_length: '50'
  },
  {
    key: 9,
    field_name: 'mobile',
    field_length: '20'
  },
  {
    key: 10,
    field_name: 'orgNo',
    field_length: '32'
  }
]
const tableData = ref(createData())

const columns = [
  {
    title: 'FIELD_NAME',
    key: 'field_name',
    render (row, index) {
      return h(NInput, {
        value: row.field_name,
        onUpdateValue (v) {
          tableData.value[index].field_name = v
        }
      })
    }
  },
  {
    title: 'FIELD_LENGTH',
    key: 'field_length',
    render (row, index) {
      return h(NInput, {
        value: row.field_length,
        onUpdateValue (v) {
          tableData.value[index].field_length = v
        }
      })
    }
  }
]
const rowClassName = (row: RowData) => {
  // if (Number(row.field_length) > 32) {
  //   return 'too-old'
  // }
  return ''
}

const deviceOption =ref({
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      top: '10%',
      left: '55%',
      data: ['userId', 'userNo','userName', 'userPwd','userPwdTo', 'sex','birthday', 'email','userAgname', 'mobile', 'orgNo']
    },
    series: [
      {
        name:'数据源BIONE_USER_ATTR',
        type: 'pie',
        radius: ['60%', '90%'],
        center: ['25%', '50%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        labelLine: {
          show: false
        },
        data: [
                {
                    value: 0,
                    name: "userId"
                },
                {
                    value: 32,
                    name: "userNo"
                },
                {
                    value: 50,
                    name: "userName"
                },
                {
                    value: 15,
                    name: "userPwd"
                },
                {
                    value: 15,
                    name: "userPwdTo"
                },
                {
                    value: 0,
                    name: "sex"
                },
                {
                    value: 10,
                    name: "birthday"
                },
                {
                    value: 100,
                    name: "email"
                },
                {
                    value: 50,
                    name: "userAgname"
                },
                {
                    value: 20,
                    name: "mobile"
                },
                {
                    value: 32,
                    name: "orgNo"
                }
            ]
      }
    ],
    color: ["rgb(84, 112, 198)",
          "rgb(145, 204, 117)",
          "rgb(250, 200, 88)",
          "rgb(238, 102, 102)",
          "rgb(59, 162, 114)",
          "rgb(252, 132, 82)",
          "rgb(115, 192, 222)",
          "rgb(154, 96, 180)",
          "rgb(234, 124, 204)",
          "rgb(145, 204, 117)",
          "rgb(250, 200, 88)"]
  
})
const initSelect = async () => {
  const params = {
    refresh: true,
    pageNo:1,
    pageSize:1000
  }
  const res = await datasourceListApi(params)
  // console.log(res.data);
  const arr:any = ref([])

  res.data.data.forEach(item => {
    let obj = JSON.parse(JSON.stringify(item))
    obj.label = item.alias
    obj.value = item.id
    arr.value.push(obj)

  })
  // console.log(arr);
  
  dbChoiceOptions.value = arr.value
  dbChoice.value = dbChoiceOptions.value[0].id

}
onMounted(() => {
  initSelect()
  getTable()
})
const setToken = () => {

  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpblR5cGUiOiJsb2dpbiIsImxvZ2luSWQiOjIsImRldmljZSI6ImRlZmF1bHQtZGV2aWNlIiwiZWZmIjoxNzA2ODU0NTMwMDI3LCJyblN0ciI6Ik1RcHRPOUVBVlJlbGRQa1RFN01MZUpLeG5KTGVwRFpaIn0.knOw08E6mwWF_GpkeQ8KflQlfQuNu4jd-_Bgh7EnCj4'
}

// const sqlValue = ref('')
// const sqlValue = ref(`SELECT TO_CHAR(bione_user_info.last_update_time, 'YYYY-MM') AS MONTH, COUNT(*) AS REGISTERED_USERS
// FROM bione_user_info
// GROUP BY TO_CHAR(bione_user_info.last_update_time, 'YYYY-MM');`)
const sqlValue = ref(`SELECT FIELD_NAME, FIELD_LENGTH
FROM UPRR_B.BIONE_USER_ATTR
WHERE ROWNUM <= 10;
SELECT TO_CHAR(bione_user_info.last_update_time, 'YYYY-MM') AS MONTH, COUNT(*) AS REGISTERED_USERS
FROM bione_user_info
GROUP BY TO_CHAR(bione_user_info.last_update_time, 'YYYY-MM');`)
const inputInfo = ref('')

function parseString(input: string): { id: string | null, data: any, retry: number }[] {
    const objectsArray: { id: string | null, data: any, retry: number }[] = [];
    const lines = input.trim().split('\n');

    let currentObject: { id: string | null, data: any, retry: number } | null = null;
    lines.forEach(line => {
        if (line.startsWith("id:") && !line.startsWith("id:[DONE]")) {
            // If a new object begins, push the previous one (if exists) and start a new object
            if (currentObject) {
                objectsArray.push(currentObject);
            }
            currentObject = { id: line.substring(3), data: null, retry: 0 };
        } else if (line.startsWith("data:") && !line.startsWith("data:[DONE]")) {
            // Parse data
            if (currentObject) {
                currentObject.data = JSON.parse(line.substring(5));
            }
        } else if (line.startsWith("retry:")) {
            // Parse retry
            if (currentObject) {
                currentObject.retry = parseInt(line.substring(6));
            }
        }
    });

    // Push the last object
    if (currentObject) {
        objectsArray.push(currentObject);
    }

    return objectsArray;
}

const submitInfo = async () => {
  
  // console.log(inputInfo.value);
  
  // window['$message'].success(inputInfo.value)
  const params = {
    message:inputInfo.value,
    promptType: 'NL_2_SQL',
    dataSourceId: '3',
    schemaName: 'UPRR_B',
    tableNames: 'ACT_EVT_LOG'
  }
  const res:any = await aiSqlApi(params)
  // console.log(res,'resaiSqlApi');
  let str = sqlValue.value
  str += res.data


  
  // sqlValue.value = res

  // sqlValue.value = objParse.map(item => (item.data && item.data.content ? item.data.content : "")).join("\n");
  const parsedData = parseString(res);
  sqlValue.value = parsedData
        .filter(item => item.data && item.data.content && item.data !="[DONE]")
        .map(item => item.data.content)
        .join("");

}

const runSql = async () => {
  let obj = {
    // sql: "SELECT TO_CHAR(bione_user_info.last_update_time, 'YYYY-MM') AS MONTH, COUNT(*) AS REGISTERED_USERS\r\nFROM bione_user_info\r\nGROUP BY TO_CHAR(bione_user_info.last_update_time, 'YYYY-MM');",
    sql:sqlValue.value,
    pageNo: 1,
    pageSize: 200,
    total: 0,
    hasNextPage: true,
    dataSourceId: 3,
    dataSourceName: "@ip",
    databaseName: null,
    databaseType: "ORACLE",
    schemaName: "UPRR_B",
    consoleId: 13,
    status: "RELEASE",
    connectable: true,
    type: "ORACLE"
  }
  const res = await executeSql(obj)
  // console.log(res.data);
  const newConfig = res.data[0]
  if(newConfig.message){
    errorMessage.value = newConfig.message
  }else{
    headList.value = newConfig.headerList
    bodyList.value = newConfig.dataList
  }
  

  

}


</script>

<style lang="scss" scoped>
@import url('../../../assets/font/iconfont.css');

@include go(project-items) {
  padding: 10px 10px;
}
.leftBut{
  width: 170px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.rightBut{
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  div{

    width: 120px;
  }
}
.workspace-top{
  width: 100%;
  padding: 10px;
}
.workspace-bottom{
  width: 100%;
  padding: 10px;
}
.n-input{

  width: 100% !important;

}
:deep(.too-old td) {
  color: rgba(255, 0, 0, 0.75) !important;
}
:deep(.age) {
  color: rgba(0, 128, 0, 0.75) !important;
}
:deep(.too-old .age) {
  color: rgba(0, 0, 128, 0.75) !important;
}
.mtk1 {
    color: #d4d4d4;
}
</style>
