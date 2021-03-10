import request from '@/routes/axios'
// import { Tooltip } from 'ant-design-vue';
// let dicUrl = `/admin/dict/type/{{key}}`
const DIC = {
  channels: [{
    label: '短信',
    id: 'SMS'
  },
    {
      label: '邮件',
      id: 'MAIL'
    },
    {
      label: 'PC端',
      id: 'WEB'
    }, 
    {
      label: '移动端',
      id: 'APP'
    }, 
    {
      label: 'IPAD端',
      id: 'IPAD'
    },                  
  ],   
}
export const steps  = {

    "tourSteps": [
      {
        "element": "#todayTask_searchBtn",
        "popover": {
          "title": "查询",
          "description": "点击按钮可以查询任务信息",
          "position": "top-right"
        }
      },
      {
        "element": "#todayTask_addBtn",
        "popover": {
          "title": "新增任务",
          "description": "点击按钮新增任务",
          "position": "bottom-center"
        }
      }
    ]
}
export const tableOption = {
  showBar:true,
  functionName:'装备查询',
  menu:true,// 操作列是否显示
  selection: true,//table 左侧的可选框是否显示
  // dicUrl: dicUrl,//dicUrl : 字典服务器地址
  menuWidth: 120,// table 右侧操作按钮列的宽度，默认为120,
  workflow: false,//必填，标记工作流状态
  width:500, //表格宽度     不写宽度表格底部scroll 消失
  // height:"auto", // 表格高度
  border: true, // 表格是否有边框 
  // searchSize: "small", // 搜索按钮 与搜索条件 大小  Large Default  small
  addBtn: true,  // 新增按钮是否显示
  editBtn: true, // 编辑按钮是否显示
  viewBtn: false, // 查看按钮是否显示
  delBtn:true, // 删除按钮 是否显示
  exportFileBtn:false,// 导出按钮是否显示
  labelCol:{ span: 12 }, // 表单label width
  refreshBtn:true, // 刷新按钮 是否显示
  showClomnuBtn:true, // 配置表格显示列按钮 是否显示
  showSearchBtn:true, // 是否 收起搜索条件按钮  是否显示
  pagination:false, // 是否显示默认的分页
  pageSizeOptions: ['10', '20', '30', '40', '50'],//指定每页可以显示多少条
  size:"small",    //表格大小  default | middle | small
  showHeader:true,  // 是否显示表头
  // align:"left",    //设置列内容的对齐方式  	'left' | 'right' | 'center'
  column :[
    {
      dataIndex: 'name1',
      key: 'name1',
      title: '系统ID',
      search: true,
      ellipsis: true,
      width: 200,
      span:12,
      prefix:'¥', //输入框头部内容
      suffix:'RMB',//输入框尾部内容
      allowClear:false,
      placeholder:"sssssssssss",
      // slots: { title: 'customTitle' },
      scopedSlots: { customRender: 'id' },
      // render:(text)=>{
      //   if (text){
      //     return <a-tooltip placement="bottom" title={text}>{text}</a-tooltip>
      //   }
      // }
    },
    {
     groupName: '技术状态固化情况',
        children: [
          {
            title: "是否定型（含配套）",
            dataIndex: "technicalStatusIsFixed ",
            key: "technicalStatusIsFixed ",
            width: 180,
            ellipsis: true,
        },
         {
            title: "图纸是否鉴章（含配套）",
            dataIndex: "technicalStatusIsSignature ",
            key: "technicalStatusIsSignature ",
            width: 100,
          //   ellipsis: true,
        },
        {
            title: "配套装备是否存在待竞争确定价格情况（军方组织或军方委托承制单位组织的）",
            dataIndex: "technicalStatusWaitCompete ",
            key: "technicalStatusWaitCompete ",
            width: 180,
          //   ellipsis: true,
        },
        ]
    },
    {
      title: '采购方式',
      dataIndex: 'planName',
      key: 'planName',
      // ellipsis: true,
      type:'select',
      span:12,
      // search: true,
      dicData:DIC.channels,
      showSearch:true,
      width: 200,
      // formsolt: true,
    },
    {
      title: '程研单位',
      dataIndex: 'name3',
      key: 'name3',
      span:12,
      type:'select',
      multiple:'multiple',
      dicData:DIC.channels,
      ellipsis: true,
      width: 200,
      // scopedSlots: { customRender: 'name' },
    },
    {
      title: "价格类型",
      dataIndex: "goalPrice",
      key: 'goalPrice',
      width: 250,
      type: "number",
      minRows:1000,
      maxRows:10000,
      // dicData:"name4",
      // scopedSlots: { customRender: 'name4' },
      // dicData:DIC.channels,
      // customRender: (text, row, index) => {
        // console.log(text, row, index,'text, row, index')
        // if (index < 4) {
        //   return <a href="javascript:;">{text}</a>;
        // }
        // return {
        //   children: <a href="javascript:;">{text}</a>,
        //   attrs: {
        //     colSpan: 5,
        //   },
        // };
      // },
      // dicUrl: "/planinfos/dropBox",
      // dicData: "SYSTEM_TYPE",
      // sortable: true,
      // multiple: true,
      // search: true,
      span: 12,
      ellipsis: true, // 超过宽度将自动省略
    },
    // {
    //   title: "月份",
    //   key: 'offerPriceTime',
    //   type:'week',
    //   search: true,
    //   dataIndex: "offerPriceTime",
    //   // valueFormat: "YYYY-MM-DD",
    //   format: "YYYY-MM",
    //   width: 200,
    //   ellipsis: true, // 超过宽度将自动省略
    // },
    {
      title: "月份",
      key: 'offerPriceTime',
      type:'month',
      search: true,
      dataIndex: "offerPriceTime",
      valueFormat: "YYYY-MM",
      format: "YYYY-MM",
      width: 200,
      span:12,
      ellipsis: true, // 超过宽度将自动省略
    },
    {
      title: "批价年度",
      key: 'examinePriceTime',
      type:'date',
      span:12,
      search: true,
      dataIndex: "examinePriceTime",
      valueFormat: "YYYY-MM-DD",
      format: "YYYY-MM-DD",
      width: 200,
      ellipsis: true, // 超过宽度将自动省略
    },
    {
      title: "年度",
      key: 'planYear',
      type:'year',
      span:12,
      search: true,
      dataIndex: "planYear",
      valueFormat: "YYYY",
      format: "YYYY",
      width: 200,
      ellipsis: true, // 超过宽度将自动省略
    },
    // {
    //   title: "年度range",
    //   key: 'reportPriceTime',
    //   type:'yearRange',
    //   hide:true,
    //   search: true,
    //   addVisdiplay:false,
    //   editVisdiplay:false,
    //   viewVisdiplay:false,
    //   dataIndex: "reportPriceTime",
    //   // valueFormat: "YYYY-MM-DD",
    //   format: "YYYY",
    //   width: 200,
    //   ellipsis: true, // 超过宽度将自动省略
    // },
    {
      title: "年限range",
      key: 'reportPriceTime',
      type:'dateRange',
      search: true,
      span:12,
      dataIndex: "reportPriceTime",
      addVisdiplay:false,
      editVisdiplay:false,
      viewVisdiplay:false,
      width: 200,
      ellipsis: true, // 超过宽度将自动省略
    },
    {
      title: "zb类型",
      key: 'examineOrg',
      dataIndex: "examineOrg",
      width: 200,
      span:12,
      // formsolt:true,
      ellipsis: true, // 超过宽度将自动省略
    },
    {
      title: "zb名称",
      key: 'company',
      dataIndex: "company",
      width: 200,
      span:12,
      // type:"ueditor",
      // sortable: true,
      ellipsis: true, // 超过宽度将自动省略
    },
    {
      title: "批价文号",
      key: 'name8',
      dataIndex: "name8",
      width: 200,
      span:12,
      ellipsis: true, // 超过宽度将自动省略
    },
    {
      title: "审价年度",
      key: 'name9',
      dataIndex: "name9",
      width: 200,
      span:12,
      formsolt:true,
      ellipsis: true, // 超过宽度将自动省略
    },
    {
      title: "系统备注",
      key: 'name10',
      dataIndex: "name10",
      minRows: 2,
      maxRows: 6,
      span:12,
      type: "textarea",
      // search: false,// 是否在搜索条件显示
      width: 250,//列宽
      align:"left", // 设置列内容的对齐方式
      ellipsis: true, // 超过宽度将自动省略
      // sortable:true, //是否开启排序
      // fixed:"left", // 列可固定   true(等效于 left)  left|right  
      rules: [ //{ required: true, message: "请输入系统备注", trigger: "blur"},
        {
          required: true,
          message: "系统备注的最大长度为660个字符",
          trigger: "blur",
          pattern: '^.{0,660}$'
        }
      ]
    },
    // {
    //   title: '操作',
    //   // key: 'action',
    //   // dataIndex: "action",
    //   addVisdiplay:false,
    //   editVisdiplay:false,
    //   viewVisdiplay:false,
    //   scopedSlots: { customRender: 'action' },
    //   width: 100,//列宽
    //   fixed: 'right',
    // },
  ],
  // column: [{
  //     label: "系统ID",
  //     prop: "name1",
  //     width: "80",
  //     search: true,
  //     type:'input',
  //     addVisdiplay:false,
  //     editVisdiplay:false,
  //     viewVisdiplay:false,
  //     // ellipsis: true, // 超过宽度将自动省略
  //     // solt:true,
  //   },
  //   {
  //     label: "单位",
  //     prop: "name2",
  //     width: "80",
  //     search: true,
  //     // solt:true,
  //     // ellipsis: true, // 超过宽度将自动省略
  //   },
  //   {
  //     label: "程研单位",
  //     prop: "name3",
  //     width: "80",
  //     search: true,
  //     // ellipsis: true, // 超过宽度将自动省略
  //   },
  //   {
  //     label: "价格类型",
  //     prop: "name4",
  //     width: "250",
  //     // type: "select",
  //     // dicData: "SYSTEM_TYPE",
  //     // sortable: true,
  //     // multiple: true,
  //     search: true,
  //     span: 12,
  //     // ellipsis: true, // 超过宽度将自动省略
  //   },
  //   {
  //     label: "批价年度",
  //     prop: "name5",
  //     width: "80",
  //     solt:true,
  //     // ellipsis: true, // 超过宽度将自动省略
  //   },
  //   {
  //     label: "zb类型",
  //     prop: "name6",
  //     width: "250",
  //     // ellipsis: true, // 超过宽度将自动省略
  //   },
  //   {
  //     label: "zb名称",
  //     prop: "name7",
  //     width: "250",
  //     // sortable: true,
  //     // ellipsis: true, // 超过宽度将自动省略
  //   },
  //   {
  //     label: "批价文号",
  //     prop: "name8",
  //     // formsolt: true,
  //     // ellipsis: true, // 超过宽度将自动省略
  //   },
  //   {
  //     label: "审价年度",
  //     prop: "name9",
  //     // formsolt: true,
  //     // ellipsis: true, // 超过宽度将自动省略
  //   },
  //   {
  //     label: "系统备注",
  //     prop: "name10",
  //     type: "textarea",
  //     search: false,// 是否在搜索条件显示
  //     width: "250",//列宽
  //     align:"left", // 设置列内容的对齐方式
  //     // ellipsis: true, // 超过宽度将自动省略
  //     // sortable:true, //是否开启排序
  //     // fixed:"left", // 列可固定   true(等效于 left)  left|right  
  //     rules: [ //{ required: true, message: "请输入系统备注", trigger: "blur"},
  //       {
  //         required: true,
  //         message: "系统备注的最大长度为660个字符",
  //         trigger: "blur",
  //         pattern: '^.{0,660}$'
  //       }
  //     ]
  //   }
  // ]const updateByPlanid = (data) => axios.post(`${window.apiObj.api}/updateByPlanid`, data);
};

// export function fetchList(query) {
//   return request({
//     url: 'message-total/listByCondition',
//     method: 'get',
//     params: query
//   })
// }
export function fetchList(data) {
  return request({
    url: '/price/situations/listByCondition',
    method: 'post',
    data: data
  })
}
// export function fetchList(query) {
//   return request({
//     url: '/planinfos',
//     method: 'get',
//     params: query
//   })
// }

export function getObj(id) {
  return request({
    url: '/product/bearSysInfo/' + id,
    method: 'get'
  })
}

export function addObj(obj) {
  return request({
    url: '/product/bearSysInfo/',
    method: 'post',
    data: obj
  })
}

export function putObj(obj) {
  return request({
    url: '/updateByPlanid',
    method: 'post',
    data: obj
  })
}

export function delObj(id, audit) {
  return request({
    url: '/planinfos/' + id,
    method: 'delete',
    params: audit
  })
}

export function testMockServer() {
  return request({
    url: '/mock/24/platform/platform/all',
    method: 'get',
  })
}