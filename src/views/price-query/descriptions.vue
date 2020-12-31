<template>
  <div class>
    <!-- 项目数据 -->
    <a-descriptions
      v-if="detailData.docType == 'project'"
      bordered
      :column="{ xxl: 4, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }"
    >
      <a-descriptions-item label="任务名称">{{detailData.renWuMingCheng}}</a-descriptions-item>
      <a-descriptions-item label="任务类型">{{detailData.renWuLeiXing}}</a-descriptions-item>
      <a-descriptions-item label="采购方式">{{detailData.caiGouFangShi}}</a-descriptions-item>
      <a-descriptions-item label="密级">{{detailData.miJi}}</a-descriptions-item>
      <a-descriptions-item label="主管业务部门" :span="2">{{detailData.zhuGuanYeWuBuMen}}</a-descriptions-item>
      <a-descriptions-item label="价格责任单位" :span="2">{{detailData.jiaGeZeRenDanWei}}</a-descriptions-item>
      <a-descriptions-item label="价格类型">{{detailData.jiaGeLeiXing}}</a-descriptions-item>
      <a-descriptions-item label="审价年度">{{detailData.shenJiaNianDu}}</a-descriptions-item>
      <a-descriptions-item label="项目计划价">{{detailData.jiHuaJia}}</a-descriptions-item>
      <a-descriptions-item label="项目报价">{{detailData.baoJia}}</a-descriptions-item>
      <a-descriptions-item label="项目审价">{{detailData.shenJia}}</a-descriptions-item>
      <a-descriptions-item label="批价文号">{{detailData.piJiaWenHao}}</a-descriptions-item>
      <a-descriptions-item label="批价年度">{{detailData.piJiaNianDu}}</a-descriptions-item>
      <a-descriptions-item label="项目批价">{{detailData.piJia}}</a-descriptions-item>
    </a-descriptions>
    <!-- zb数据 -->
    <a-descriptions
      v-if="detailData.docType == 'gear'"
      bordered
      :column="{ xxl: 4, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }"
    >
      <a-descriptions-item label="任务名称">{{detailData.renWuMingCheng}}</a-descriptions-item>
      <a-descriptions-item label="任务类型">{{detailData.renWuLeiXing}}</a-descriptions-item>
      <a-descriptions-item label="采购方式">{{detailData.caiGouFangShi}}</a-descriptions-item>
      <a-descriptions-item label="密级">{{detailData.miJi}}</a-descriptions-item>
      <a-descriptions-item label="主管业务部门" :span="2">{{detailData.zhuGuanYeWuBuMen}}</a-descriptions-item>
      <a-descriptions-item label="价格责任单位" :span="2">{{detailData.jiaGeZeRenDanWei}}</a-descriptions-item>
      <a-descriptions-item label="价格类型">{{detailData.jiaGeLeiXing}}</a-descriptions-item>
      <a-descriptions-item label="审价年度">{{detailData.shenJiaNianDu}}</a-descriptions-item>
      <a-descriptions-item label="zb计划价">{{detailData.jiHuaJia}}</a-descriptions-item>
      <a-descriptions-item label="zb报价">{{detailData.baoJia}}</a-descriptions-item>
      <a-descriptions-item label="zb审价">{{detailData.shenJia}}</a-descriptions-item>
      <a-descriptions-item label="批价文号">{{detailData.piJiaWenHao}}</a-descriptions-item>
      <a-descriptions-item label="批价年度">{{detailData.piJiaNianDu}}</a-descriptions-item>
      <a-descriptions-item label="zb批价">{{detailData.piJia}}</a-descriptions-item>
      <a-descriptions-item label="（拟）采购数量">{{detailData.caiGouShuLiang}}</a-descriptions-item>
    </a-descriptions>
    <!-- zb维修价格数据 -->
    <a-descriptions
      v-if="detailData.docType == 'maintain'"
      bordered
      :column="{ xxl: 4, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }"
    >
      <a-descriptions-item label="任务名称">{{detailData.renWuMingCheng}}</a-descriptions-item>
      <a-descriptions-item label="任务类型">{{detailData.renWuLeiXing}}</a-descriptions-item>
      <a-descriptions-item label="采购方式">{{detailData.caiGouFangShi}}</a-descriptions-item>
      <a-descriptions-item label="密级">{{detailData.miJi}}</a-descriptions-item>
      <a-descriptions-item label="主管业务部门" :span="2">{{detailData.zhuGuanYeWuBuMen}}</a-descriptions-item>
      <a-descriptions-item label="价格责任单位" :span="2">{{detailData.jiaGeZeRenDanWei}}</a-descriptions-item>
      <a-descriptions-item label="价格类型">{{detailData.jiaGeLeiXing}}</a-descriptions-item>
      <a-descriptions-item label="审价年度">{{detailData.shenJiaNianDu}}</a-descriptions-item>
      <a-descriptions-item label="批价年度">{{detailData.piJiaNianDu}}</a-descriptions-item>
      <a-descriptions-item label="批价文号">{{detailData.piJiaWenHao}}</a-descriptions-item>
      <a-descriptions-item label="zb名称">{{detailData.zhuangBeiMingCheng}}</a-descriptions-item>
    </a-descriptions>
  </div>
</template>
<script>
export default {
  name: "descriptions",
  props: {
    detailData: {
      type: Object,
      default: function() {
        return {};
      }
    },
    picUrl: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  created() {}
};
</script>

<style lang="scss" >

</style>