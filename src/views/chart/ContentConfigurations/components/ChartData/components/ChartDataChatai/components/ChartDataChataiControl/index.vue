<template>
  <div> 
  <n-modal class="go-chart-data-chatai-control" v-model:show="modelShowRef" :mask-closable="false">
    <n-card :bordered="false" role="dialog" size="small" aria-modal="true" style="width: 1200px; height: 650px;overflow-y: scroll;">
      <template #header></template>
      <div class="pond-content">
        <!-- 展示区域 -->
        
        <div class="container flex">
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
                  <!-- <n-select
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
                  </n-select> -->
                </div>
              </div>

          </div>
          <div class="workspace-bottom">
            


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
           
            

          </div>
        </div>
      </div>
      <!-- 底部 -->
      <template #action>
        <n-space justify="space-between">
          <div></div>
          <div>
            <n-button type="primary" @click="closeHandle" style="margin-right:10px;">确 定</n-button>
            <n-button @click="closeHandleOB">取 消</n-button>
          </div>
        </n-space>
      </template>
    </n-card>
  </n-modal>

  
</div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { MonacoEditor } from '@/components/Pages/MonacoEditor'
import { ref, reactive, onMounted, defineComponent, defineProps, watch } from 'vue'  


import { CaretForwardOutline as CaretForwardIcon } from '@vicons/ionicons5'


import { JSONStringify,JSONParse } from '@/utils';
import { Key } from '@vicons/ionicons5';
import { aiSqlApi,executeSql, datasourceListApi, datasourceTreeApi, executeTable } from '@/api/sqlserver'
const props = defineProps({
  modelShow: Boolean
})
  
onMounted(() => { 
  
})  


const errorMessage:any = ref()



const headList:any = ref([])
const bodyList:any = ref([])

const dbChoice:any = ref()
const dbChoiceOptions:any = ref([])
const tbChoice:any = ref()
const tbChoiceOptions:any = ref([])

const sqlValue = ref(`SELECT FIELD_NAME, FIELD_LENGTH
FROM UPRR_B.BIONE_USER_ATTR
WHERE ROWNUM <= 10;
SELECT TO_CHAR(bione_user_info.last_update_time, 'YYYY-MM') AS MONTH, COUNT(*) AS REGISTERED_USERS
FROM bione_user_info
GROUP BY TO_CHAR(bione_user_info.last_update_time, 'YYYY-MM');
SELECT *
FROM UPRR_B.BIONE_USER_ATTR
WHERE ROWNUM <= 10;`)
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

const tableValue1:any = ref()

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
    tableValue1.value = newConfig
    headList.value = newConfig.headerList
    bodyList.value = newConfig.dataList
  }

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

watch(() => props.modelShow, (newValue) => {
  modelShowRef.value = newValue
})

const emit = defineEmits(['update:modelShow', 'sendHandle'])
  
const modelShowRef = ref<boolean>(false)  



const closeHandle = () => {
  
  emit('update:modelShow', false)
  emit('handleDataAi', tableValue1.value || [])//转换后

}
const closeHandleOB=()=>{
  emit('update:modelShow', false)
}




</script>

<style lang="scss" scoped>
@include go('chart-data-ai-control') {

  
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
