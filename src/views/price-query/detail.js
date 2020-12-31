import request from '@/routes/axios'
export const column = [
    {
      title: "分系统名称",
      dataIndex: "fenXiTongMingCheng",
      key: "fenXiTongMingCheng",
      width: 170,
      ellipsis: true,
      // fixed: 'left',
      scopedSlots: { customRender: 'fenXiTongMingCheng' },
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
    }
   
] 
//项目详情
// export function basicDetail(obj) {
//     return request({
//       url: '/display/getGearBasicDetailInfo',
//       method: 'get',
//       params: obj
//     })
//   }

//   export function detail(obj) {
//     return request({
//       url: '/display/getComponentDetailInfoTree',
//       method: 'get',
//       params: obj
//     })
//   }
  export function detail(obj) {
    return request({
      url: '/display/getDetailInfo',
      method: 'get',
      params: obj
    })
  }
  export function detailInfoLower(obj) {
    return request({
      url: '/display/getComponentDetailInfoLower',
      method: 'get',
      params: obj
    })
  }
  //zb图片
  export function getPicture(obj) {
    return request({
      url: '/display/getDetailPicture',
      method: 'get',
      responseType: 'blob',
      params: obj
    })
  }