<template>
  <a-card>
    <avue-crud
      v-model="formObj"
      :option="tableOption"
      :data="data"
      :table-loading="tableLoading"
      :page="page"
      ref="crud"
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
      <template slot="menuLeft">
        <a-button  type="primary" style="margin-left: 20px">导出</a-button>
      </template>
       <template slot-scope="scope" slot="menu">
      <a-icon type="edit" @click="rowEdit(scope)" class="a-icon-edit-outline" />
    </template>
    <template slot="examineOrgForm" slot-scope="scope">
      <a-button  type="primary" @click="rowEdit3(scope)">form</a-button>
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
       <!-- <template slot="name4" slot-scope="row">
        <span>{{row.name4}}</span>
        <a @click="handleTableEmmm(tableRow)" href="javascript:void(0);">{{
          tableRow.name4
        }}</a>
      </template> -->
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
import { tableOption, fetchList, delObj, putObj } from "./avue-crud-demo";
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
      tableOption: {}, //表格设置属性
      data: [], //表格的数据
      formObj: {},
      tableLoading: false,
      page: {
        total: 0, //总页数
        currentPage: 1, //当前页数
        pageSize: 10, //每页显示多少条
      },
    };
  },
  created() {
    this.tableOption = tableOption;
    this.handleList();
  },
  mounted() {},
  methods: {
    rowEdit( row){
      this.$store.commit('SET_ROUTER_PARAMS', {title: 'lll', params: row, boxType: 'ooo',})
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
       putObj(form).then(response => {
            this.handleList();
            this.$message.success('修改成功');
          });
          done()
      // this.$message.success("模拟网络请求");
      // setTimeout(() => {
      //   this.$message.success(
      //     "编辑数据" + JSON.stringify(form) + "数据序号" + index
      //   );
      //   done();
      // }, 2000);
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
          // that.data.splice(index, 1);
          // that.$message.success('删除数据' + JSON.stringify(form))
          delObj(row.id).then((response) => {
            that.handleList();
            that.$message.success("删除成功");
          });
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    },
    handleList() {
       this.data =[
          {
            name1:'大幅度发的说法',
            name2:'dsfdsfdsfdsf',
            name3:'dsfdsfdsfdsf',
            name4:'dsfdsfdsfdsf',
            name5:'dsfdsfdsfdsf反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第',
            name6:'反倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三倒是第三方第三方'
          },
          {
            name1:'大幅度发的说法111',
            name2:'dsfdsfdsfdsf211',
            name3:'反倒是第三方第三方111'
          }
        ]
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
      this.page.pageSize = 1;
      this.page = Object.assign(this.page, form);
      this.handleList();
    },
    sizeChange(val, form) {
      console.log(val, "pageSize");
      this.page.currentPage = val; //第几页
      this.handleList();
    },
    currentChange(val, form) {
      this.page.pageSize = val; //每页多少条
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