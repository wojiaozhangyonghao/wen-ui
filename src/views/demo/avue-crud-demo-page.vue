<template>
  <a-card>
    <avue-crud
      v-model="formObj"
      :option="tableOption"
      :data="data"
      :table-loading="tableLoading"
      :page="page"
      componentId="todayTask"
      ref="crud"
      :steps="steps"
      @row-save="rowSave"
      @row-update="rowUpdate"
      @row-del="rowDel"
      @refresh-change="handleList"
      @current-change="currentChange"
      @search-change="handleSearchChange"
      @size-change="sizeChange"
      @form-change="formChange"
      @export-file="exportFile"
      @selection-change="selectionChange"
    >
     <!-- <template slot="searchSlot">
        <a-button  type="primary" style="margin-left: 20px" id="todayTask_searchBtn">导出</a-button>
        <a-button  type="primary" style="margin-left: 20px" id="todayTask_addBtn">导出</a-button>
      </template> -->
      <template slot="menuLeft">
        <a-button  type="primary" style="margin-left: 20px" id="todayTask_searchBtn">导出</a-button>
        <!-- <a-button  type="primary" style="margin-left: 20px" id="todayTask_addBtn">导出</a-button> -->
      </template>
      <template slot="menuRight">
        <!-- <a-button  type="primary" style="margin-left: 20px" id="todayTask_searchBtn">导出</a-button>
        <a-button  type="primary" style="margin-left: 20px" id="todayTask_addBtn">导出</a-button> -->
          <!-- 金额：
          <a-select  style="width:75px;" default-value="万元">
            <a-select-option value="万元">万元</a-select-option>
            <a-select-option value="元">元</a-select-option>
          </a-select> -->
      </template>
       <template slot-scope="scope" slot="menu">
      <a-icon type="edit" @click="rowEdit(scope)" id="todayTask_aaa" style="margin:0 10px;" class="a-icon-edit-outline" />
       <!-- <a-button   id="todayTask_aaa" type="primary" @click="rowEdit3(scope)" >form</a-button> -->
    </template>
    <template slot="name9Form" slot-scope="scope">
      <a-button  type="primary" @click="rowEdit3(scope)" >自定义表单</a-button>
    </template>
      <!-- <template slot="action" slot-scope="{ tableRow }">
					<a @click="handleTableInfo(tableRow)" href="javascript:void(0);"> Info </a> -->
      <!-- <a @click="handleTableUpdate(tableRow)" href="javascript:void(0);"> Update </a>
					<a @click="handleTableDelete(tableRow)" href="javascript:void(0);"> Delete </a> -->
      <!-- </template> -->
      <template slot-scope="scope" slot="id">
         {{scope.row.name1}}
        <!-- <a @click="handleTableEmmm(tableRow)" href="javascript:void(0);">{{
          tableRow.name1
        }}</a> -->
      </template>
    </avue-crud>
       <!-- <a-table :data-source="data2">
    <a-table-column-group>
      <span slot="title" style="color: #1890ff">Name</span>
      <a-table-column key="firstName" ellipsis="true" data-index="firstName">
        <span slot="title" style="color: #1890ff">First Name</span>
      </a-table-column>
      <a-table-column key="lastName" ellipsis="true" title="Last Name" data-index="lastName" />
    </a-table-column-group>
    <a-table-column key="age" title="Age" data-index="age" />
    <a-table-column key="address" ellipsis="true" title="Address" data-index="address" />
    <a-table-column key="tags" title="Tags" data-index="tags">
      <template slot-scope="tags">
        <span>
          <a-tag v-for="tag in tags" :key="tag" color="blue">{{ tag }}</a-tag>
        </span>
      </template>
    </a-table-column>
    <a-table-column key="action" title="Action">
      <template slot-scope="text, record">
        <span>
          <a>Action 一 {{ record.firstName }}</a>
          <a-divider type="vertical" />
          <a>Delete</a>
        </span>
      </template>
    </a-table-column>
  </a-table> -->
   <!-- <a-form-model layout="inline" :model="formInline" @submit="handleSubmit" @submit.native.prevent>
    <a-form-model-item>
      <a-input v-model="formInline.user" placeholder="Username">
        <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
      </a-input>
    </a-form-model-item>
    <a-form-model-item>
      <a-date-picker
      v-model="formInline.password"
      format="YYYY-MM-DD"
      valueFormat= "YYYY-MM-DD"
    />
    </a-form-model-item>
    <a-form-model-item>
      <a-button
        type="primary"
        html-type="submit"
       
      >
        Log in
      </a-button>
    </a-form-model-item>
  </a-form-model> -->
  </a-card>
</template>
<script>
import { tableOption,steps , delObj, putObj } from "./avue-crud-demo";
export default {
  name: "avue-crud-demo-page",
  components: {},
  data() {
    return {
      // formInline: {
      //   user: '',
      //   password: undefined,
      // },
//        data2 : [
//   {
//     key: '1',
//     firstName: 'JohnNew York No. 1 LakeNew York No. 1 LakeNew York No. 1 LakeNew York No. 1 LakeNew York No. 1 LakeNew York No. 1 LakeNew York No. 1 LakeNew York No. 1 LakeNew York No. 1 Lake',
//     lastName: 'Brown',
//     age: 32,
//     address: 'New York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake ParkNew York No. 1 Lake Park',
//     tags: ['nice', 'developer'],
//   },
//   {
//     key: '2',
//     firstName: 'Jim',
//     lastName: 'Green',
//     age: 42,
//     address: 'London No. 1 Lake Park',
//     tags: ['loser'],
//   },
//   {
//     key: '3',
//     firstName: 'Joe',
//     lastName: 'Black',
//     age: 32,
//     address: 'Sidney No. 1 Lake Park',
//     tags: ['cool', 'teacher'],
//   },
// ],
      steps:{},
      tableOption: {}, //表格设置属性
      data: [], //表格的数据
      formObj: {},
      tableLoading: false,
      page: {
        total: 0, //总页数
        page: 1, //当前页数
        size: 10, //每页显示多少条
      },
    };
  },
  created() {
    this.steps = steps
    this.tableOption = tableOption;
    this.handleList();
  },
  mounted() {},
  methods: {
    rowEdit( row){
      console.log(row,'row')
      this.$store.commit('SET_ROUTER_PARAMS', {title: '项目编辑', params: row.row, boxType: 'edit',})
        this.$router.push('/form')
    },
     handleSubmit(e) {
      console.log(this.formInline);
    },
    handleTableEmmm(val) {
      console.log(val, "val");
    },
    rowSave(form, done) {
      console.log(form, done);
      this.$message.success("模拟网络请求");
      setTimeout(() => {
        this.$message.success("新增数据" + JSON.stringify(form));
        form = Object.assign({ key: new Date().getTime() }, form);
        this.data.push(form);
        done();
      }, 2000);
      console.log(this.data, "this.data");
    },
    rowUpdate(form, index, done) {
      //  putObj(form).then(response => {
      //       this.handleList();
      //       this.$message.success('修改成功');
      //     });
      //     done()
      this.$message.success("模拟网络请求");
      setTimeout(() => {
        this.$message.success(
          "编辑数据" + JSON.stringify(form) + "数据序号" + index
        );
        done();
      }, 2000);
    },
    rowDel(row, index) {
      let that = this;
      this.$confirm({
        title: `确定删除序号${index + 1}?`,
        content: "提示",
        okText: "确定",
        okType: "danger",
        cancelText: "取消",
        onOk() {
          that.data.splice(index, 1);
          that.$message.success('删除数据' + JSON.stringify(row))
          // delObj(row.id).then((response) => {
          //   that.handleList();
          //   that.$message.success("删除成功");
          // });
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    },
    handleList() {
       this.data =[
          {
            id:"1",
            planName:'WEB',
            company:"野战电话机14",
            name1:'13258.00',
            name2:'aa',
            name3:'SMS',
            name4:'APP',
            offerPriceTime:'2020-02-02 12:12:12',
            planYear:'2020-01-01 12:12:12',
            examinePriceTime:'2020-09-09 12:12:12',
            name9:'承制单位',
            goalPrice:1000,
            bz:'备注',
            name8:'装直价[2019]171号',
            examineOrg:'aaa',
            name5:'dsfdsfdsfdsf反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第',
            name6:'反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三方'
          },
          {
            id:"2",
            planName:'WEB',
            company:"野战电话机141",
            name1:'13258.00',
            name2:'aa',
            name3:'SMS',
            name4:'APP',
            offerPriceTime:'2020-02-02 12:12:12',
            planYear:'2020-01-01 12:12:12',
            examinePriceTime:'2020-09-09 12:12:12',
            name9:'承制单位',
            goalPrice:1000,
            bz:'备注',
            name8:'装直价[2019]171号',
            examineOrg:'aaa',
            // name5:'dsfdsfdsfdsf反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第',
            // name6:'反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三方'
          },
          {
            id:"3",
            planName:'WEB',
            company:"野战电话机142",
            name1:'13258.00',
            name2:'aa',
            name3:'SMS',
            name4:'APP',
            offerPriceTime:'2020-02-02 12:12:12',
            planYear:'2020-01-01 12:12:12',
            examinePriceTime:'2020-09-09 12:12:12',
            name9:'承制单位',
            goalPrice:1000,
            bz:'备注',
            name8:'装直价[2019]171号',
            examineOrg:'aaa',
            // name5:'dsfdsfdsfdsf反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第',
            // name6:'反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三方'
          },
          {
            id:"4",
            planName:'WEB',
            company:"野战电话机143",
            name1:'13258.00',
            name2:'aa',
            name3:'SMS',
            name4:'APP',
            offerPriceTime:'2020-02-02 12:12:12',
            planYear:'2020-01-01 12:12:12',
            examinePriceTime:'2020-09-09 12:12:12',
            name9:'承制单位',
            goalPrice:1000,
            bz:'备注',
            name8:'装直价[2019]171号',
            examineOrg:'aaa',
            // name5:'dsfdsfdsfdsf反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第',
            // name6:'反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三方'
          },
          {
            id:"5",
            planName:'WEB',
            company:"野战电话机144",
            name1:'13258.00',
            name2:'aa',
            name3:'SMS',
            name4:'APP',
            offerPriceTime:'2020-02-02 12:12:12',
            planYear:'2020-01-01 12:12:12',
            examinePriceTime:'2020-09-09 12:12:12',
            name9:'承制单位',
            goalPrice:1000,
            bz:'备注',
            name8:'装直价[2019]171号',
            examineOrg:'aaa',
            // name5:'dsfdsfdsfdsf反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第',
            // name6:'反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三方'
          },
          {
            id:"6",
            planName:'WEB',
            company:"野战电话机145",
            name1:'13258.00',
            name2:'aa',
            name3:'SMS',
            name4:'APP',
            offerPriceTime:'2020-02-02 12:12:12',
            planYear:'2020-01-01 12:12:12',
            examinePriceTime:'2020-09-09 12:12:12',
            name9:'承制单位',
            goalPrice:1000,
            bz:'备注',
            name8:'装直价[2019]171号',
            examineOrg:'aaa',
            // name5:'dsfdsfdsfdsf反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第',
            // name6:'反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三方'
          },
          {
            id:"7",
            planName:'WEB',
            company:"野战电话机146",
            name1:'13258.00',
            name2:'aa',
            name3:'SMS',
            name4:'APP',
            offerPriceTime:'2020-02-02 12:12:12',
            planYear:'2020-01-01 12:12:12',
            examinePriceTime:'2020-09-09 12:12:12',
            name9:'承制单位',
            goalPrice:1000,
            bz:'备注',
            name8:'装直价[2019]171号',
            examineOrg:'aaa',
            // name5:'dsfdsfdsfdsf反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第',
            // name6:'反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三方'
          },
          {
            id:"8",
            planName:'WEB',
            company:"野战电话机147",
            name1:'13258.00',
            name2:'aa',
            name3:'SMS',
            name4:'APP',
            offerPriceTime:'2020-02-02 12:12:12',
            planYear:'2020-01-01 12:12:12',
            examinePriceTime:'2020-09-09 12:12:12',
            name9:'承制单位',
            goalPrice:1000,
            bz:'备注',
            name8:'装直价[2019]171号',
            examineOrg:'aaa',
            // name5:'dsfdsfdsfdsf反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第',
            // name6:'反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三方'
          },
          {
            id:"9",
            planName:'WEB',
            company:"野战电话机148",
            name1:'13258.00',
            name2:'aa',
            name3:'SMS',
            name4:'APP',
            offerPriceTime:'2020-02-02 12:12:12',
            planYear:'2020-01-01 12:12:12',
            examinePriceTime:'2020-09-09 12:12:12',
            name9:'承制单位',
            goalPrice:1000,
            bz:'备注',
            name8:'装直价[2019]171号',
            examineOrg:'aaa',
            // name5:'dsfdsfdsfdsf反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第',
            // name6:'反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三方'
          },
          {
            id:"10",
            planName:'WEB',
            company:"野战电话机149",
            name1:'13258.00',
            name2:'aa',
            name3:'SMS',
            name4:'APP',
            offerPriceTime:'2020-02-02 12:12:12',
            planYear:'2020-01-01 12:12:12',
            examinePriceTime:'2020-09-09 12:12:12',
            name9:'承制单位',
            goalPrice:1000,
            bz:'备注',
            name8:'装直价[2019]171号',
            examineOrg:'aaa',
            // name5:'dsfdsfdsfdsf反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第',
            // name6:'反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三方'
          },
        ]
         this.page = {
          total: this.data.length,
          page: 1,
          size: 10,
        };
      // this.tableLoading = true;
      // fetchList(this.page).then((response) => {
      //   this.data = response.data.data.list;
      //   console.log(this.data,'this.data')
      //   this.page = {
      //     total: response.data.data.total,
      //     currentPage: response.data.data.pageNum,
      //     pageSize: response.data.data.pageSize,
      //   };
      //   this.tableLoading = false;
      // });
    },
    handleSearchChange(form) {
      console.log(form,'form')
      this.page.size = 1;
      this.page = Object.assign(this.page, form);
      this.handleList();
    },
    sizeChange(val, form) {
      console.log(val, "pageSize");
      this.page.page = val; //第几页
      this.handleList();
    },
    currentChange(val, form) {
      this.page.size = val; //每页多少条
      this.handleList();
    },
    formChange(val) {
      console.log(val);
    },
    exportFile(form) {
      console.log(form);
    },
    selectionChange(selectedRowKeys) {
      console.log(selectedRowKeys);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>