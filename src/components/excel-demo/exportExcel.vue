<template>
  <div style="background:white;">
    <a-button style="margin:20px;" type="primary" icon="download" @click="exportExcel">导出excel</a-button>
    <a-table
      :columns="column"
      :dataSource="data"
      bordered
      size="small"
      :rowSelection="rowSelection"
    />
  </div>
</template>
<script>
import { export2Excel } from "./index.js";
export default {
  data() {
    return {
      rowSelection: {
        onSelect: (record, selected, selectedRows) => {
          this.selecteData = selectedRows;
        }
      },
      selecteData: [], //表格已选数据
      column: [
        {
          title: "名称",
          dataIndex: "name",
          key: "name",
          width: 150
        },
        {
          title: "类型/种类",
          dataIndex: "type",
          key: "type",
          width: 80
        },
        {
          title: "项目编号",
          dataIndex: "projectId",
          key: "projectId",
          width: 75
        },
        {
          title: "项目名称",
          dataIndex: "projectName",
          key: "projectName",
          width: 75
        },
        {
          title: "负责群组",
          dataIndex: "projectGroup",
          key: "projectGroup",
          width: 150
        },
        {
          title: "价格类型",
          dataIndex: "priceType",
          key: "priceType",
          width: 80
        },
        {
          title: "批价文号",
          dataIndex: "priceTag",
          key: "priceTag",
          width: 75
        },
        {
          title: "批价",
          dataIndex: "priceFixing",
          key: "priceFixing",
          width: 75
        },
        {
          title: "批价年度",
          dataIndex: "priceFixingYear",
          key: "priceFixingYear",
          width: 75
        }
      ],
      data: [
        {
          key: 1,
          name: "zb名称",
          type: "科研预算",
          projectId: "CHDH8589941",
          projectName: "测试",
          projectGroup: "测试",
          priceType: "测试",
          priceTag: "测试",
          priceFixing: "测试",
          priceFixingYear: "测试"
        },
        {
          key: 2,
          name: "zb名称",
          type: "科研预算",
          projectId: "CHDH8589941",
          projectName: "测试",
          projectGroup: "测试",
          priceType: "测试",
          priceTag: "测试",
          priceFixing: "测试",
          priceFixingYear: "测试"
        },
        {
          key: 3,
          name: "zb名称",
          type: "科研预算",
          projectId: "CHDH8589941",
          projectName: "测试",
          projectGroup: "测试",
          priceType: "测试",
          priceTag: "测试",
          priceFixing: "测试",
          priceFixingYear: "测试"
        },
        {
          key: 4,
          name: "zb名称",
          type: "科研预算",
          projectId: "CHDH8589941",
          projectName: "测试",
          projectGroup: "测试",
          priceType: "测试",
          priceTag: "测试",
          priceFixing: "测试",
          priceFixingYear: "测试"
        },
        {
          key: 5,
          name: "zb名称",
          type: "科研预算",
          projectId: "CHDH8589941",
          projectName: "测试",
          projectGroup: "测试",
          priceType: "测试",
          priceTag: "测试",
          priceFixing: "测试",
          priceFixingYear: "测试"
        },
        {
          key: 6,
          name: "zb名称",
          type: "科研预算",
          projectId: "CHDH8589941",
          projectName: "测试",
          projectGroup: "测试",
          priceType: "测试",
          priceTag: "测试",
          priceFixing: "测试",
          priceFixingYear: "测试"
        },
        {
          key: 7,
          name: "zb名称",
          type: "科研预算",
          projectId: "CHDH8589945",
          projectName: "测试",
          projectGroup: "测试",
          priceType: "测试",
          priceTag: "测试",
          priceFixing: "测试",
          priceFixingYear: "测试"
        },
        {
          key: 8,
          name: "zb名称",
          type: "科研预算",
          projectId: "CHDH8589941",
          projectName: "测试",
          projectGroup: "测试",
          priceType: "测试",
          priceTag: "测试",
          priceFixing: "测试",
          priceFixingYear: "测试"
        },
        {
          key: 9,
          name: "zb名称",
          type: "科研预算",
          projectId: "CHDH8589941",
          projectName: "测试",
          projectGroup: "测试",
          priceType: "测试",
          priceTag: "测试",
          priceFixing: "测试",
          priceFixingYear: "测试"
        },
        {
          key: 10,
          name: "zb名称",
          type: "科研预算",
          projectId: "CHDH8589941",
          projectName: "测试",
          projectGroup: "测试",
          priceType: "测试",
          priceTag: "测试",
          priceFixing: "测试",
          priceFixingYear: "测试"
        },
        {
          key: 11,
          name: "zb名称",
          type: "科研预算",
          projectId: "CHDH8589941",
          projectName: "测试",
          projectGroup: "测试",
          priceType: "测试",
          priceTag: "测试",
          priceFixing: "测试",
          priceFixingYear: "测试"
        }
      ]
    };
  },
  created() {},
  methods: {
    exportExcel() {
      const column = [
        { title: "名称", key: "name" },
        { title: "类型/种类", key: "type" },
        { title: "项目编号", key: "projectId" },
        { title: "项目名称", key: "projectName" },
        { title: "负责群组", key: "projectGroup" },
        { title: "价格类型", key: "priceType" },
        { title: "批价文号", key: "priceTag" },
        { title: "批价", key: "priceFixing" },
        { title: "批价年度", key: "priceFixingYear" }
      ]; //表格title       //表格输出数据
      export2Excel(column, this.selecteData, "excelName"); //excelName:excel表名字；column：表格头；selecteData：表格数据
    }
  }
};
</script>

<style lang="scss" >
</style>