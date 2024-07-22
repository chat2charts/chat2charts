<template>
  <n-modal v-model:show="showRef" class="go-create-modal" @afterLeave="closeHandle">
    <n-space size="large">
      <n-card class="card-box" hoverable>
        <template #header>
          <!-- <n-text class="card-box-tite">{{ $t('project.create_tip') }}</n-text> -->
          {{ isupd + modalTitle }}
        </template>
        <template #header-extra>
          <n-text @click="closeHandle">
            <n-icon size="20">
              <component :is="CloseIcon"></component>
            </n-icon>
          </n-text>
        </template>
        <n-space class="card-box-content" justify="center">
          <n-form
            ref="formRef"
            label-placement="left"
            label-width="auto"
            require-mark-placement="right-hanging"
          >
        
          <n-form-item label="名称">
              <n-input v-model:value="alias"/>
            </n-form-item>
            <n-form-item label="环境">
              <n-select
                label-field="name"
                value-field="id"
               
                v-model:value="environmentId"
                :options="enviOptions" />
            </n-form-item>
            <n-form-item label="主机">
              <n-input v-model:value="host" />
            </n-form-item>
            <n-form-item label="端口">
              <n-input v-model:value="port" />
            </n-form-item>
            <n-form-item label="身份验证">
              <n-select
                v-model:value="needUname"
                :options="needUnameOptions" />
            </n-form-item>
            <div :style="{ display: needUname === '1' ? '' : 'none' }">
              <n-form-item label="用户名">
                <n-input v-model:value="user" />
              </n-form-item>
            </div>
            <div :style="{ display: needUname === '1' ? '' : 'none' }">
              <n-form-item label="密码">
                <n-input v-model:value="password" 
                type="password"
                show-password-on="mousedown"/>
              </n-form-item>
            </div>
            <n-form-item label="数据库">
              <n-input v-model:value="database" />
            </n-form-item>
            <n-form-item label="URL">
              <n-input v-model:value="url" />
            </n-form-item>


            <n-card>
              <n-collapse>
                <n-collapse-item title="驱动" name="1">
                    <div>
                      <n-form-item label="驱动">
                        <n-select
                          v-model:value="jdbcDriver"
                          :options="jdbcDriverOptions.value" />
                      </n-form-item>
                      <n-form-item label="Class">
                        <n-select
                        disabled
                          v-model:value="jdbcDriverClass"
                          :options="jdbcDriverClassOptions.value" />
                      </n-form-item>
                    </div>
                  </n-collapse-item>
                  <n-collapse-item title="SSH" name="2">
                    <div>

                      <n-form-item label="使用SSH">
                        <n-select
                        v-model:value="useSSH"
                        :options="useSSHOptions" />
                      </n-form-item>
                      <n-form-item label="SSH主机">
                        <n-input v-model:value="sshHostName" />
                      </n-form-item>
                      <n-form-item label="SSH端口">
                        <n-input v-model:value="sshPort" />
                      </n-form-item>
                      <n-form-item label="用户名">
                        <n-input v-model:value="sshUserName" />
                      </n-form-item>
                      <n-form-item label="本地端口">
                        <n-input v-model:value="sshLocalPort" />
                      </n-form-item>
                      <n-form-item label="身份验证">
                        <n-select
                        v-model:value="sshUse"
                        :options="sshUseOptions" />
                      </n-form-item>
                      <div :style="{ display: sshUse == 1 ? '' : 'none' }">
                        <n-form-item label="密钥文件">
                          <n-input v-model:value="sshKeyFile" />
                        </n-form-item>
                      </div>
                      <div :style="{ display: sshUse == 1 ? '' : 'none' }">
                        <n-form-item label="密钥短语">
                          <n-input v-model:value="sshPassphrase" 
                          type="password"
                          show-password-on="mousedown"/>
                        </n-form-item>
                      </div>
                      <div :style="{ display: sshUse == 0 ? '' : 'none' }">
                        <n-form-item label="密码">
                          <n-input v-model:value="sshPassword" type="password"/>
                        </n-form-item>
                      </div>

                    </div>
                  </n-collapse-item>
                  <n-collapse-item title="高级配置" name="3">
                    <div>
                      <n-data-table :columns="columns" :data="data" />
                    </div>
                  </n-collapse-item>
                </n-collapse>
            </n-card>
            



          </n-form>
            
        </n-space>
        <template #action>
          <div style="display: flex;justify-content: space-between;">
          
            <div>
              <n-button>测试链接</n-button>
            </div>
            <div>
              <n-button @click="cancel">取消</n-button>&nbsp;&nbsp;&nbsp;
              <n-button @click="submit" type="primary">
                保存
              </n-button>
              
            </div>

          </div>
        </template>
      </n-card>
    </n-space>
  </n-modal>
</template>

<script lang="ts" setup>
import { NIcon, SelectOption, SelectGroupOption, NInput, NText } from 'naive-ui'
import { ref, watch, shallowRef, VNodeChild, h, computed } from 'vue'
import { icon } from '@/plugins'
import { PageEnum, ChartEnum } from '@/enums/pageEnum'
import { fetchPathByName, routerTurnByPath, renderLang, getUUID } from '@/utils'

import { createSource, driverList, updateSource, getUpdSource } from '@/api/sqlserver'

import type { DataTableColumns } from 'naive-ui'
import { Json } from '@vicons/carbon'
const isupd = ref('新建数据源')
type RowData = {
  key: string
  value: string
}
const createData = (): RowData[] => [
  {
    key:'zeroDateTimeBehavior',
    value:'convertToNull'
  },
  {
    key:'',
    value:''
  }
]
const data = ref(createData())
const createColumns = (): DataTableColumns<RowData> => [
      {
        title: '名称',
        key: 'key',
        render (row, index) {
          if(row.key == 'zeroDateTimeBehavior'){
            return h(NText, { depth: 2 }, { default: () => 'zeroDateTimeBehavior' })
          }else{
            return h(NInput, {
              value: row.key,
              onUpdateValue (v) {
                data.value[index].key = v
              }
            })
          }
        }
      },
      {
        title: '值',
        key: 'value',
        render (row, index) {
          return h(NInput, {
            value: row.value,
            onUpdateValue (v) {
              data.value[index].value = v
            }
          })
        }
      }
    ]
   const columns =  createColumns()


// 以上是可编辑表格
const { FishIcon, CloseIcon, EllipseIcon } = icon.ionicons5
const { StoreIcon, ObjectStorageIcon } = icon.carbon
const showRef = ref(false)


const modalTitle:any = ref('')

const emit = defineEmits(['close'])
const props = defineProps({
  show: Boolean,
  dat:Object
})



const jdbcDriverOptions:any = []
const jdbcDriverClassOptions:any = []


const jdbcDriverArray:any = []

const clear = () => {
  // ==清空
  strHead.value = ''
  alias.value = ''
  environmentId.value = ''
  host.value = ''
  port.value = ''
  needUname.value = ''
  user.value = ''
  password.value = ''
  database.value = ''
  jdbcDriver.value = ''
  jdbcDriverClass.value = ''
  useSSH.value = 1
  sshKeyFile.value = ''
  sshPassphrase.value = ''
  sshPassword.value = ''
  sshHostName.value = ''
  sshPort.value = ''
  sshUserName.value = ''
  sshLocalPort.value = ''
  sshUse.value = 0
  data.value= [
    {
      key:'zeroDateTimeBehavior',
      value:'convertToNull'
    },
    {
      key:'',
      value:''
    }
  ]
  // ==清空结束
}

// 关闭对话框
const closeHandle = () => {
  emit('close', false)
}

// 处理按钮点击
const btnHandle = (key: string) => {
  closeHandle()
  const id = getUUID()
  const path = fetchPathByName(ChartEnum.CHART_HOME_NAME, 'href')
  routerTurnByPath(path, [id], undefined, true)
}



// 0311起始
const ids = ref('')
const authenticationType = ref('')


const strHead:any = ref('')
const alias:any = ref('@localhost')
const environmentId:any = ref('')
const host:any = ref('localhost')
const port:any = ref('3306')
const needUname:any = ref('1')
const user:any = ref('root')
const password:any = ref('')
const database:any = ref('')
const url:any = ref('')
// const url:any = computed(() => {
//   if(host.value || port.value || database.value){
//     return `${strHead.value}://${host.value}:${port.value}/${database.value}`
//   }else{
//     return ''
//   }
// });

const jdbcDriver:any = ref('')
const jdbcDriverClass:any = ref('')
const useSSHOptions = [
  {
    label: 'true',
    value: 1
  },
  {
    label: 'false',
    value: 0
  }
]
const useSSH = ref(1)


const sshKeyFile = ref('')
const sshPassphrase = ref('')

const sshPassword:any = ref('')


const sshHostName:any = ref('')
const sshPort:any = ref('')
const sshUserName:any = ref('')
const sshLocalPort:any = ref('')

const sshUse = ref(0)

const sshUseOptions = [
  {
    label: 'password',
    value: 0
  },
  {
    label: 'Private key',
    value: 1
  }
  
]


const submit = async () => {
  // console.log(data);
  
  // console.log(obj);
  if(isupd.value == '新建数据源'){
    let obj = {
      alias: alias.value,
      authenticationType: "1",
      connectionEnvType: "DAILY",
      database: database.value,
      driverConfig: 
        {
          jdbcDriverClass: jdbcDriverClass.value, 
          jdbcDriver: jdbcDriver.value
        },
      environmentId: environmentId.value,
      extendInfo: data.value,
      host: host.value,
      password: "",//
      port: port.value,
      ssh: 
      {
        // authenticationType: "keyFile",
        // hostName: "11",
        // keyFile: "55",//
        // localPort: "44",
        // passphrase: "66",//
        // password:'',//
        // port: "22",
        // use: false,
        // userName: "33"
      },
      type: modalTitle.value.toUpperCase(),
      url: url.value,
      user: ""//
    }
    if(needUname.value == '1'){
      obj.user = user.value
      obj.password = password.value
    }else{
      delete obj[user]
      delete obj[password]
    }
    if(sshUse.value == 0){
      obj.ssh = {
        authenticationType: "password",
        hostName: sshHostName.value,
        localPort: sshLocalPort.value,
        password:sshPassword.value,//
        port: sshPort.value,
        use: useSSH.value == 1 ? true : false,
        userName: sshUserName.value
      }
    }else{
      obj.ssh = {
        authenticationType: "keyFile",
        hostName: sshHostName.value,
        keyFile: sshKeyFile.value,//
        localPort: sshLocalPort.value,
        passphrase: sshPassphrase.value,//
        port: sshPort.value,
        use: useSSH.value == 1 ? true : false,
        userName: sshUserName.value
      }
    }
    const res = await createSource(obj)
    console.log(res);
  }else{
    let obj = {
      id: "",
      alias: alias.value,
      authenticationType: authenticationType.value,
      connectionEnvType: "DAILY",
      database: database.value,
      driverConfig: 
        {
          jdbcDriverClass: jdbcDriverClass.value, 
          jdbcDriver: jdbcDriver.value
        },
      environmentId: environmentId.value,
      extendInfo: data.value,
      host: host.value,
      password: "",//
      port: port.value,
      ssh: 
      {
        // authenticationType: "keyFile",
        // hostName: "11",
        // keyFile: "55",//
        // localPort: "44",
        // passphrase: "66",//
        // password:'',//
        // port: "22",
        // use: false,
        // userName: "33"
      },
      type: modalTitle.value.toUpperCase(),
      url: url.value,
      user: ""//
    }
    if(needUname.value == '1'){
      obj.user = user.value
      obj.password = password.value
    }else{
      delete obj[user]
      delete obj[password]
    }
    if(sshUse.value == 0){
      obj.ssh = {
        authenticationType: "password",
        hostName: sshHostName.value,
        localPort: sshLocalPort.value,
        password:sshPassword.value,//
        port: sshPort.value,
        use: useSSH.value == 1 ? true : false,
        userName: sshUserName.value
      }
    }else{
      obj.ssh = {
        authenticationType: "keyFile",
        hostName: sshHostName.value,
        keyFile: sshKeyFile.value,//
        localPort: sshLocalPort.value,
        passphrase: sshPassphrase.value,//
        port: sshPort.value,
        use: useSSH.value == 1 ? true : false,
        userName: sshUserName.value
      }
    }
    obj.id = ids.value
    const res = await updateSource(obj)
    console.log(res);
    
  }
  
    closeHandle()

}

// const showUname:any = ref(true)



// watch(() => needUname, (newValue) => {
//   if(newValue == '1'){
//     showUname.value = true
//   }else{
//     showUname.value = false
//   }
// })


const needUnameOptions = [
  {
    label: 'User&Password',
    value: '1'
  },
  {
    label: 'NONE',
    value: '2'
  }
]

const enviOptions = [
    {
        id: 1,
        name: "Release Environment",
        shortName: "RELEASE",
        color: "RED"
    },
    {
        id: 2,
        name: "Test Environment",
        shortName: "TEST",
        color: "GREEN"
    }
]
const renderLabel = (option: SelectOption): VNodeChild => {
  return [
    h(
      NIcon,
      {
        style: {
          verticalAlign: '-0.15em',
          marginRight: '4px'
        }
      },
      // {
      //   default: () => h(EllipseIcon)
      // }
    ),
    option.name as string
  ]
}
// 0311末尾


const cancel = () => {
  closeHandle()
  clear()
}
watch(props, newValue => {
  environmentId.value = 1
  showRef.value = newValue.show
  if(showRef.value){
    modalTitle.value = newValue.dat?.title
    driverList(newValue.dat?.title.toUpperCase()).then(res => {

    let obj = res.data
    let subStr1 = obj.defaultDriverConfig.url
    url.value = subStr1



    host.value = subStr1.substring(subStr1.indexOf('://')+3, subStr1.lastIndexOf(':'))
    port.value = subStr1.substring(subStr1.lastIndexOf(':')+1, subStr1.lastIndexOf('/'));
    strHead.value = subStr1.substring(0, subStr1.indexOf('://'))
        
    let arrayOption = obj.driverConfigList
    jdbcDriverArray.value = obj.driverConfigList
    const arr1:any = []
    const arr2:any = []
    for(let i = 0; i < arrayOption?.length; i++){
      let obj1 = {
        label: arrayOption[i].jdbcDriver,
        value: arrayOption[i].jdbcDriver
      }
      let obj2 = {
        label: arrayOption[i].jdbcDriverClass,
        value: arrayOption[i].jdbcDriverClass
      }
      arr1.push(obj1)
      arr2.push(obj2)
      // console.log(obj1,obj2,'obj2');
    
      if(arrayOption[i].defaultDriver){
        jdbcDriverClass.value = arrayOption[i].jdbcDriverClass
      }
    }
    // console.log(res,'res.data');
    jdbcDriverOptions.value = arr1
    jdbcDriverClassOptions.value = arr2
    // console.log(arr1,jdbcDriverClassOptions.value,'jdbcDriverClassOptions');
    
    
    })
    if(newValue.dat?.isupd == 'add'){
      isupd.value = '新建数据源'
      
    }else{
      isupd.value = '修改数据源'
      ids.value = newValue.dat?.id
      
      // console.log(newValue.dat?.id,'hshshs');
      getUpdSource(ids.value).then(res => {
        // console.log(res.data);
        let obj = JSON.parse(JSON.stringify(res.data))
        authenticationType.value = obj.authenticationType
        // strHead.value = obj.
        alias.value = obj.alias
        environmentId.value = obj.environmentId
        host.value = obj.host
        port.value = obj.port
        needUname.value = obj.user ? '1' : '2'
        user.value = obj.user
        password.value = obj.password
        database.value = obj.url.indexOf('/') != -1 ? obj.url.substring(obj.url.lastIndexOf('/')+1) : ''
        url.value = obj.url
        jdbcDriver.value = obj.driverConfig.jdbcDriver
        jdbcDriverClass.value = obj.driverConfig.jdbcDriverClass
        useSSH.value = obj.ssh.use ? 1 : 0
        sshKeyFile.value = obj.ssh.keyFile
        sshPassphrase.value = obj.ssh.passphrase
        sshPassword.value = obj.ssh.password
        sshHostName.value = obj.ssh.hostName
        sshPort.value = obj.ssh.port
        sshUserName.value = obj.ssh.userName
        sshLocalPort.value = obj.ssh.localPort
        sshUse.value = obj.ssh.keyFile ? 1 : 0

        data.value = obj.extendInfo
        // console.log(obj.url.substring(obj.url.lastIndexOf('/')+1),'jsdjsjsjs')
        
      })
    }
  }else{
    clear()
  }
  
})
</script>
<style lang="scss" scoped>
$cardWidth: 570px;
::v-deep(.n-space.card-box-content>div){
  width: 100% !important;
}

@include go('create-modal') {
  position: fixed;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  
  .card-box {
    max-height: 800px;
  overflow-y: scroll;
    width: $cardWidth;
    cursor: pointer;
    border: 1px solid rgba(0, 0, 0, 0);
    @extend .go-transition;
    &:hover {
      @include hover-border-color('hover-border-color');
    }
    &-tite {
      font-size: 14px;
    }
    &-content {
      padding: 0px 10px;
      width: 100%;
    }
  }
}
</style>
