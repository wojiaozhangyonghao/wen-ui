<template>
  <section id="price">
    <a-layout>
      <!-- <a-layout-header>
        <headers></headers>
      </a-layout-header> -->
      <!-- <div class="contentWidth">
        <a-layout-content>
          <a-card>
            <div class="contentTop">
              <div class="searchInput">
                <a-input-search
                  :value="page.searchBar"
                  @change="handleInputChange"
                  placeholder="请输入搜索内容"
                  @search="onSearch"
                  enterButton="搜索"
                  size="large"
                >
                  <a-select
                    slot="addonBefore"
                    v-model="seachType"
                    default-value="zb"
                    @change="seachTypeChange"
                    style="width: 90px"
                  >
                    <a-select-option value="outer">zb</a-select-option>
                    <a-select-option value="inner">分系统</a-select-option>
                  </a-select>
                </a-input-search>
              </div>
              <div style="margin-left:150px;">
                <a-button  type="primary" @click="showModel" >点击上传</a-button>
              </div>
            </div>
          </a-card>
          <a-card style="margin-top:16px;">
            <a-spin :spinning="spinning">
              <a-table
                :columns="columns"
                :dataSource="data"
                bordered
                size="small"
                :rowClassName="tableClass"
                :pagination="false"
                @change="handleTableChange"
              >
                 <template slot="operation" slot-scope="text, record">
          <a href="javascript:;" @click="() => rowClick(text, record, index)">详情</a>
      </template>
                <template slot-scope="text, record, index" slot="operation">
                  <a @click="() => rowClick(text, record, index)">详情</a>
                </template>
              </a-table>
            </a-spin>
            <a-pagination
              style="float:right;margin-top:10px;"
              showSizeChanger
              :show-total="total => `共 ${total} 条`"
              :pageSizeOptions="pageSizeOptions"
              @showSizeChange="onShowSizeChange"
              @change="pageChange"
              v-model="current"
              :total="total"
            />
          </a-card>
        </a-layout-content>
        <a-layout-footer style="background:white;padding:0 10px;"></a-layout-footer>
      </div> -->
       <avue-crud :option="tableOption" :data="data">
       </avue-crud>
       <a-modal
      :width="1000"
      title="导入卡片"
      :visible="visible2"
      footer
      @cancel="handleCancel"
      :closable="true"
      :maskClosable="false"
    >
      <!-- :bodyStyle="{ height: '600px', overflow: 'auto' }" -->
      <upload></upload>
    </a-modal>
    </a-layout>
  </section>
</template>

<script>
// import crud from "../../../packages/mixins/crud.js";
import upload from "./upload.vue"
import { 
  // fetchList,
   column2, column } from "./search.js";
export default {
  name: "search",
  components: {upload},
  //  mixins: [crud()],
  data() {
    return {
      tableOption :{
        // width:500,
    border: true,
    selection: true,
    // menuWidth: 80,
    searchSize: "small",
    addBtn: true,
    editBtn: true,
    viewBtn: true,
    delBtn:true,
    align:"right",
    // labelWidth: 180,
    labelCol:{ span: 4 },
    column: [
        {
            label: "zb名称",
            prop: "zhuangBeiMingCheng",
            sortable: false,
            type: "input",
            dicData: "topicId",
            dicUrl: "",
            span: 12,
            width: 160,
            overHidden: true,
            search: true,
            sortable:true,
            rules: [ //{ required: true, message: "请输入系统备注", trigger: "blur"},
        {
          required: true,
          message: "系统备注的最大长度为660个字符",
          trigger: "blur",
          pattern: '^.{0,660}$'
        }
      ]
        },
        {
            label: "zb名称2",
            prop: "zhuangBeiMingCheng2",
            sortable: false,
            type: "input",
            dicData: "topicId",
            dicUrl: "",
            span: 12,
            width: 160,
            overHidden: true,
            search: true
        },
         {
            label: "zb名称2",
            prop: "zhuangBeiMingCheng3",
            sortable: false,
            type: "input",
            dicData: "topicId",
            dicUrl: "",
            span: 12,
            width: 160,
            overHidden: true,
            search: true
        },
        //  {
        //     label: "zb名称2",
        //     prop: "zhuangBeiMingCheng4",
        //     sortable: false,
        //     type: "input",
        //     dicData: "topicId",
        //     dicUrl: "",
        //     span: 12,
        //     width: 160,
        //     overHidden: true,
        //     search: true
        // },
        //  {
        //     label: "zb名称2",
        //     prop: "zhuangBeiMingCheng5",
        //     sortable: false,
        //     type: "input",
        //     dicData: "topicId",
        //     dicUrl: "",
        //     span: 12,
        //     width: 160,
        //     overHidden: true,
        //     search: true
        // },
        //  {
        //     label: "zb名称2",
        //     prop: "zhuangBeiMingCheng11",
        //     sortable: false,
        //     type: "input",
        //     dicData: "topicId",
        //     dicUrl: "",
        //     span: 12,
        //     width: 160,
        //     overHidden: true,
        //     search: true
        // },
        //  {
        //     label: "zb名称2",
        //     prop: "zhuangBeiMingCheng22",
        //     sortable: false,
        //     type: "input",
        //     dicData: "topicId",
        //     dicUrl: "",
        //     span: 12,
        //     width: 160,
        //     overHidden: true,
        //     search: true
        // },
        //  {
        //     label: "zb名称2",
        //     prop: "zhuangBeiMingCheng33",
        //     sortable: false,
        //     type: "input",
        //     dicData: "topicId",
        //     dicUrl: "",
        //     span: 12,
        //     width: 160,
        //     overHidden: true,
        //     search: true
        // },
        //  {
        //     label: "zb名称2",
        //     prop: "zhuangBeiMingCheng44",
        //     sortable: false,
        //     type: "input",
        //     dicData: "topicId",
        //     dicUrl: "",
        //     span: 12,
        //     width: 160,
        //     overHidden: true,
        //     search: true
        // },
        //  {
        //     label: "zb名称2",
        //     prop: "zhuangBeiMingCheng55",
        //     sortable: false,
        //     type: "input",
        //     dicData: "topicId",
        //     dicUrl: "",
        //     span: 12,
        //     width: 160,
        //     overHidden: true,
        //     search: true
        // },
    ]
      },
      searchForm: {},
      visible2:false,
      seachType: "outer",
      spinning: false,
      total: 0,
      current: 1,
      page: {
        searchBar: "",
        page: 1,
        size: 10,
        unit: "元"
      },
      pageSizeOptions: ["10", "20", "30", "40", "50"],
      columns: [],
      data: [
        {
          key:0,
          zhuangBeiMingCheng:'sdd'
        },
          {
          key:1,
          zhuangBeiMingCheng2:'sdd'
        },
          {
          key:2,
          zhuangBeiMingCheng:'sdd'
        },
          {
          key:3,
          zhuangBeiMingCheng:'sdd'
        }
      ]
    };
  },
  created() {
    this.columns = column;
    // this.handleList();
  },
  mounted() {},
  methods: {
     handleCancel() {
      this.visible2 = false;
    },
    showModel(){
      this.visible2 = true
    },
     tableClass(record, index) {
      console.log(record, index);
      if ( record.key % 2 === 1) {
        return "highlight";
      } else {
        return "";
      }
    },
    seachTypeChange(val) {
      console.log(val);
    },
    handleTableChange(pagination, filters, { field, order }) {
      console.log(pagination, filters, { field, order });
    },
    handleInputChange(e) {
      this.page.searchBar = e.target.value;
    },
    rowClick(text, record) {
      this.$router.push({ path: "/detail", query: record });
    },
    onSearch() {
      if (this.seachType == "outer") {
        this.columns = column;
      } else {
        this.columns = column2;
      }
      this.page.page = 1;
      this.current = 1;
      this.handleList();
    },
    // handleList() {
    //   // this.page = Object.assign({}, this.page, obj);
    //   this.spinning = true;
    //   fetchList(this.page, { type: this.seachType }).then(response => {
    //     if (response.status == 200) {
    //       this.spinning = false;
    //       this.data = response.data.message.data;
    //       this.total = response.data.message.totalValue;
    //     } else {
    //       this.spinning = false;
    //     }
    //   });
    // },
    onShowSizeChange(current, pageSize) {
      this.page.size = pageSize;
      this.page.page = current;
      this.current = current;
      // this.page = Object.assign(this.page, form)
      this.handleList();
      console.log(current,pageSize)
    },
    pageChange(page) {
      this.page.page = page;
      this.handleList();
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/.ant-table-tbody {
  .highlight {
    background: #F8FAFA;
  }
}
#price {
  .contentTop {
    padding: 10px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .searchInput {
      width: 40%;
    }
  }
  /deep/.ant-table {
    table-layout: fixed;
  }
  /deep/.ant-table-tbody > tr > td {
    max-width: 110px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  /deep/.ant-card-body {
    padding: 5px 24px;
  }
}
</style>
