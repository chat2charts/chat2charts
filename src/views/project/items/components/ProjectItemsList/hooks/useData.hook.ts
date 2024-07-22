import { ref ,reactive } from 'vue'
import { goDialog ,httpErrorHandle } from '@/utils'
import { DialogEnum } from '@/enums/pluginEnum'
import { Chartype, ChartList } from '../../../index.d'
import { ResultEnum } from '@/enums/httpEnum'
// import { projectListApi, deleteProjectApi, changeProjectReleaseApi,saveProjectApi } from '@/api/path'
import { projectListApi, deleteProjectApi, changeProjectReleaseApi,saveProjectApi } from '@/api/prolist'

import dataJson from './1wsx.json'

import { readFile, downloadByReport, downloadReport, JSONStringify, JSONParse } from '@/utils'


import { useSystemStore } from '@/store/modules/systemStore/systemStore'
import { json } from 'node:stream/consumers'

// 数据初始化
export const useDataListInit = () => {

  const loading = ref(true)

  const paginat = reactive({
    // 当前页数
    page: 1,
    // 每页值
    limit: 12,
    // 总数
    count: 10
  })

  const list = ref<ChartList>([])

  // 数据请求
  const fetchList = async () => {


    let arr2 = [
      {
        id: "1805869230548639745",
        projectName: "yunyuboard",
        state: -1,
        createTime: "2024-06-26 15:42:30",
        createUserId: "",
        isDelete: "",
        indexImage: "/images/screenImg/12.jpg",
        remarks: ""
      },
      {
        id: "1805889018347970562",
        projectName: "社保卡客群统计看板",
        state: -1,
        createTime: "2024-06-26 17:01:08",
        createUserId: "",
        isDelete: "",
        indexImage: "/images/screenImg/1.jpg",
        remarks: ""
      },
      {
        id: "1805889269972656129",
        projectName: "客群分类营销管理可视化",
        state: -1,
        createTime: "2024-06-26 17:02:08",
        createUserId: "",
        isDelete: "",
        indexImage: "/images/screenImg/2.jpg",
        remarks: ""
      },
      {
        id: "1805889412750958594",
        projectName: "云物流可视化看板",
        state: -1,
        createTime: "2024-06-26 17:02:42",
        createUserId: "",
        isDelete: "",
        indexImage: "/images/screenImg/3.jpg",
        remarks: ""
      },
      {
        id: "1805889461056757761",
        projectName: "合力营销作战图",
        state: -1,
        createTime: "2024-06-26 17:02:53",
        createUserId: "",
        isDelete: "",
        indexImage: "/images/screenImg/4.jpg",
        remarks: ""
      },
      {
        id: "1805889495022231554",
        projectName: "客群建设全景视图",
        state: -1,
        createTime: "2024-06-26 17:03:02",
        createUserId: "",
        isDelete: "",
        indexImage: "/images/screenImg/5.jpg",
        remarks: ""
      },
      {
        id: "1805889531504287746",
        projectName: "客户经理平衡计分卡可视化看板",
        state: -1,
        createTime: "2024-06-26 17:03:10",
        createUserId: "",
        isDelete: "",
        indexImage: "/images/screenImg/6.jpg",
        remarks: ""
      },
      {
        id: "1805889586319646721",
        projectName: "对公科创金融看板",
        state: -1,
        createTime: "2024-06-26 17:03:23",
        createUserId: "",
        isDelete: "",
        indexImage: "/images/screenImg/7.jpg",
        remarks: ""
      },
      {
        id: "1805889659220844545",
        projectName: "客户链穿透视图",
        state: -1,
        createTime: "2024-06-26 17:03:41",
        createUserId: "",
        isDelete: "",
        indexImage: "/images/screenImg/8.jpg",
        remarks: ""
      },
      {
        id: "1805889686177636354",
        projectName: "信用风险看板",
        state: -1,
        createTime: "2024-06-26 17:03:47",
        createUserId: "",
        isDelete: "",
        indexImage: "/images/screenImg/9.jpg",
        remarks: ""
      },
      {
        id: "1805889730725339137",
        projectName: "工会卡客群统计看板",
        state: -1,
        createTime: "2024-06-26 17:03:58",
        createUserId: "",
        isDelete: "",
        indexImage: "/images/screenImg/10.jpg",
        remarks: ""
      },
      {
        id: "1805889762140676097",
        projectName: "信用卡高管驾驶舱",
        state: -1,
        createTime: "2024-06-26 17:04:05",
        createUserId: "",
        isDelete: "",
        indexImage: "/images/screenImg/11.jpg",
        remarks: ""
    },
     
  
    ]
    // 注释列表固定版数据
  // arr2.forEach(e => {
  //   const { id, projectName, state, createTime, indexImage, createUserId } = e
  //   let obj =  reactive({
  //     id: id,
  //     title: projectName,
  //     createId: createUserId,
  //     time: createTime,
  //     image: indexImage,
  //     release: state !== -1,
  //     label:projectName
  //   })
  //   list.value.push(obj)
  // })
  // 结束注释


  // 注释后端版接口列表
    // loading.value = true


    let params = new FormData() 
    params.append('projectId', '1805889018347970562')
    params.append('content', JSONStringify(dataJson))

    let obj = {
      projectId:'1805869230548639745',
      content:dataJson
    }
    // saveProjectApi(params).then(res => {
    //   console.log(res,'res');
      
    // })

    const res = await projectListApi({
      page: paginat.page,
      limit: paginat.limit
    })
    console.log(res,'res');
    



    if (res && res.data) {
      const { count } = res as any // 这里的count与data平级，不在Response结构中
      paginat.count = count
      list.value = res.data.map(e => {
        const { id, projectName, state, createTime, indexImage, createUserId } = e
        return {
          id: id,
          title: projectName,
          createId: createUserId,
          time: createTime,
          image: indexImage,
          release: state !== -1
        }
      })
      
      setTimeout(() => {
        loading.value = false
      }, 500)
      return
    }
  }
  
  // ==
 
  // ==
  // 修改页数
  const changePage = (_page: number) => {
    paginat.page = _page
    fetchList()
  }

  // 修改大小
  const changeSize = (_size: number) => {
    paginat.limit = _size
    fetchList()
  }
  // 生成报告
  const reportHandle = (cardData: Chartype, index: number) => {
    const { id, release, title } = cardData
    
    try {
      window['$message'].success('生成中，请耐心等待...')
      // downloadReport(JSONStringify(cardData), title, 'docx')
      // ==固定了名称为exampleReport.docx
      // const docxUrl = new URL('/public/exampleReport.docx', window.location.href); 
      // window.open(docxUrl.href);
      // ==

      const docxUrl = new URL('/public/exampleReport.docx', window.location.href); 
      const stringNew = cardData.title;

      const anchor = document.createElement('a');
      anchor.href = docxUrl.href;
      anchor.download = stringNew;
      anchor.click();
    } catch (error) {
      window['$message'].error('生成失败，数据错误！')
    }

    // console.log(cardData,'cardData');
    
    // httpErrorHandle()
  }
  // 发布处理
  const releaseHandle = async (cardData: Chartype, index: number) => {
    const { id, release } = cardData
    // const res = await changeProjectReleaseApi({
    //   id: id,
    //   // [-1未发布, 1发布]
    //   state: !release ? 1 : -1
    // })
    // console.log(res)
    // if (res && res.code === ResultEnum.SUCCESS) {
    //   list.value = []
    //   fetchList()
    //   // 发布 -> 未发布
    //   if (release) {
    //     window['$message'].success(window['$t']('global.r_unpublish_success'))
    //     return
    //   }
    //   // 未发布 -> 发布
    //   window['$message'].success(window['$t']('global.r_publish_success'))
    //   return
    // }
    // httpErrorHandle()
  }
  // 删除
  const deleteHandle = (cardData: Chartype, index: number) => {
    goDialog({
      type: DialogEnum.DELETE,
      promise: true,
      onPositiveCallback: () =>
        // new Promise(res => setTimeout(() => res(1), 1000)),
      // 后端版请求删除
        // 0103起
        new Promise(res => {
          res(
            deleteProjectApi({
              ids: cardData.id
            })
          )
        }),
        // // 0103尾


        // 截取版json删除
      // promiseResCallback: (e: any) => {
      //   window.$message.success('删除成功')
      //   list.value.splice(index, 1)
      // }
    })
  }
  fetchList()
  return {
    loading,
    paginat,
    list,
    fetchList,
    releaseHandle,
    changeSize,
    changePage,
    deleteHandle,
    reportHandle
  }
}

