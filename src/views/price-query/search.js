import request from '@/routes/axios'
export const column= [
        {
          title: "zb编码",
          dataIndex: "zhuangBeiBianMa",
          key: "zhuangBeiBianMa",
          width: 150,
          ellipsis: true,
          // fixed: 'left'
          // scopedSlots: { customRender: 'renWuMingCheng' },
        },
        {
          title: "zb名称",
          dataIndex: "zhuangBeiMingCheng",
          key: "zhuangBeiMingCheng",
          width: 150,
          ellipsis: true,
          // fixed: 'left',
          // scopedSlots: { customRender: 'zhuangBeiMingCheng' },
        },
        {
          title: "批复立项文号",
          dataIndex: "piFuLiXiangWenHao",
          key: "piFuLiXiangWenHao",
          width: 120,
          ellipsis: true,
        },
        {
          title: "承制批价文号",
          dataIndex: "chengZhiPiJiaWenHao",
          key: "chengZhiPiJiaWenHao",
          width: 120,
          ellipsis: true,
        },
        {
          title: "承修批价文号",
          dataIndex: "chengXiuPiJiaWenHao",
          key: "chengXiuPiJiaWenHao",
          width: 120,
          ellipsis: true,
        },
        // {
        //   title: "立项概算",
        //   dataIndex: "liXiangGaiSuan",
        //   key: "liXiangGaiSuan",
        //   width: 120,
        //   ellipsis: true,
        // },
        
        // {
        //   title: "已订购总量",
        //   dataIndex: "yiDingGouZongLiang",
        //   key: "yiDingGouZongLiang",
        //   width: 120,
        //   ellipsis: true,
        //   // scopedSlots: { customRender: 'baoJia' },
        // },
        // {
        //   title: "首批首次大修数量",
        //   dataIndex: "shouPiShouCiDaXiuShuLiang",
        //   key: "shouPiShouCiDaXiuShuLiang",
        //   width: 150,
        //   ellipsis: true,
        // },
        // {
        //   title: "调整/超概算",
        //   dataIndex: "chaoGaiSuan",
        //   key: "chaoGaiSuan",
        //   width: 120,
        //   ellipsis: true,
        // },
        
        // {
        //   title: "定价批次数量",
        //   dataIndex: "dingJiaPiCiShuLiang",
        //   key: "dingJiaPiCiShuLiang",
        //   width: 120,
        //   ellipsis: true,
        //   // scopedSlots: { customRender: 'baoJia' },
        // },
        // {
        //   title: "大修目标价格",
        //   dataIndex: "daXiuMuBiaoJiaGe",
        //   key: "daXiuMuBiaoJiaGe",
        //   width: 120,
        //   ellipsis: true,
        // },
        // {
        //   title: "订购目标价格",
        //   dataIndex: "dingGouMuBiaoJiaGe",
        //   key: "dingGouMuBiaoJiaGe",
        //   width: 120,
        //   ellipsis: true,
        // },
        // {
        //   title: "订购价格",
        //   dataIndex: "dingGouJiaGe",
        //   key: "dingGouJiaGe",
        //   width: 95,
        //   ellipsis: true,
        //   sorter:true,
        //   // scopedSlots: { customRender: 'dingGouJiaGe' },
        // },
        // {
        //   title: "大修价格",
        //   dataIndex: "daXiuJiaGe",
        //   key: "daXiuJiaGe",
        //   width: 90,
        //   ellipsis: true,
        // },       
        {
          title: "承研单位",
          dataIndex: "chengYanDanWei",
          key: "chengYanDanWei",
          width: 150,
          ellipsis: true,
        },
        {
          title: "承制单位",
          dataIndex: "chengZhiDanWei",
          key: "chengZhiDanWei",
          width: 150,
          ellipsis: true,
        },
        {
          title: "承修单位",
          dataIndex: "chengXiuDanWei",
          key: "chengXiuDanWei",
          width: 150,
          ellipsis: true,
        },
        {
          width: 70,
          title: 'zb详情',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' },
        },
  ] 
  export const column2 = [
    {
      title: "分系统名称",
      dataIndex: "fenXiTongMingCheng",
      key: "fenXiTongMingCheng",
      width: 150,
      ellipsis: true,
      // fixed: 'left',
      // scopedSlots: { customRender: 'fenXiTongMingCheng' },
    },
    {
      title: "zb订购分解价格",
      // dataIndex: "shiMingRenWu",
      // key: "shiMingRenWu",
      // width: 120,
      children:[
        {
          title: "分承单位",
          dataIndex: "dingGouFenChengDanWei",
          key: "dingGouFenChengDanWei",
          width: 120,
          ellipsis: true,
        },
        {
          title: "目标价格",
          dataIndex: "dingGouMuBiaoJiaGe",
          key: "dingGouMuBiaoJiaGe",
          width: 120,
          ellipsis: true,
        },
        {
          title: "订购价格",
          dataIndex: "dingGouDingGouJiaGe",
          key: "dingGouDingGouJiaGe",
          width: 120,
          ellipsis: true,
        },
      ]
    },
    {
      title: "zb大修分解价格",
      // dataIndex: "shiMingRenWu",
      // key: "shiMingRenWu",
      // width: 120,
      children:[
        {
          title: "分承单位",
          dataIndex: "daXiuFenChengDanWei",
          key: "daXiuFenChengDanWei",
          width: 120,
          ellipsis: true,
        },
        {
          title: "目标价格",
          dataIndex: "daXiuMuBiaoJiaGe",
          key: "daXiuMuBiaoJiaGe",
          width: 120,
          ellipsis: true,
        },
        {
          title: "订购价格",
          dataIndex: "daXiuDingGouJiaGe",
          key: "daXiuDingGouJiaGe",
          width: 120,
          ellipsis: true,
        },
      ]
    },
    {
      title: "备注",
      dataIndex: "beiZhu",
      key: "beiZhu",
      width: 80,
      ellipsis: true,
    },
    {
      width: 70,
      title: 'zb详情',
      dataIndex: 'operation',
      scopedSlots: { customRender: 'operation' },
    },
   
] 
  //搜索条件
export function searchList(obj) {
  return request({
    url: '/display/getSearchKeyword',
    method: 'get',
    params: obj
  })
}
//导入
export function exportExcel(data) {
  return request({
    url: '/import/importFromExcel',
    method: 'post',
    data: data
  })
}
//项目信息
export function fetchList(data,obj) {
  return request({
    url: '/display/getInfoByMultiParams',
    method: 'post',
    data: data,
    params: obj
  })
}
//首页项目数量
export function getCount(data) {
  return request({
    url: '/display/countInfoSolid',
    method: 'post',
    data: data
  })
}