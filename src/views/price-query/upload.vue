<!-- 登录 -->
<template>
  <section id="upload">
    <a-layout>
      <!-- <a-layout-header>
        <headers></headers>
      </a-layout-header> -->
      <div class="contentWidth2">
        <a-card style="min-height:600px;">
          <div style="width:800px;margin:0 auto;">
            <a-row>
              <a-col :span="4">
                <span>模板类型：</span>
              </a-col>
              <a-col :span="4">
                <a-select v-model="value" defaultValue="project" style="width: 190px">
                  <a-select-option value="project">zb价格数据卡片</a-select-option>
                </a-select>
              </a-col>
            </a-row>
            <div style="margin-top:20px;">
              <a-row>
                <a-col :span="4">
                  <span>选择文件：</span>
                </a-col>
                <a-col :span="3">
                  <div>
                    <a-upload
                      accept=".xls, .xlsx"
                      name="file"
                      :multiple="true"
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      :headers="headers"
                      :file-list="fileList2"
                      :customRequest="customRequest"
                    >
                      <a-button type="primary">
                        <a-icon type="cloud-upload" />上传文件
                      </a-button>
                    </a-upload>
                  </div>
                </a-col>
                <a-col :span="16" :offset="1">
                  <div>
                    <a-upload
                      accept=".xls, .xlsx"
                      name="file"
                      :multiple="false"
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      :headers="headers"
                      directory
                      :file-list="fileList"
                      :beforeUpload="beforeUpload"
                      :remove="handleRemove"
                    >
                      <!-- <a-button class="uploader-btn">
                        <a-icon type="file" />上传文件夹
                      </a-button> -->
                      <a-button  class="but" > <a-icon type="file" />上传文件夹</a-button>
                    </a-upload>
                  </div>
                  <a-button
                    type="primary"
                    :disabled="fileList.length === 0"
                    @click="handleUpload"
                  >开始导入</a-button>
                </a-col>
              </a-row>
            </div>
          </div>
          <loading :value="loadingValue"></loading>
        </a-card>
      </div>
    </a-layout>
    <a-modal
      :width="1000"
      title="导入失败"
      :visible="visible"
      footer
      @cancel="handleCancel"
      :closable="true"
      :maskClosable="false"
      :bodyStyle="{ height: '600px', overflow: 'auto' }"
    >
      <div class="content">
        <div style="margin-bottom:10px;">
          <span style="margin-left:10px;">
            共导入
            <em style="color:#1890ff">{{ valueObj.totalValue }}</em>条
          </span>
          <span>
            失败
            <em style="color:red;">{{ valueObj.failValue }}</em>条
          </span>
        </div>
        <a-table
          :columns="columns"
          :data-source="data"
          size="small"
          :pagination="false"
          :scroll="{ y: 480 }"
        >
          <template slot-scope="scope" slot="reason">
            <span style="color:red;">{{ scope }}</span>
          </template>
        </a-table>
      </div>
    </a-modal>
  </section>
</template>
<script>
import loading from "@/components/loading/Loading.vue";
import { exportExcel } from "./search.js";
export default {
  name: "upload",
  components: {
    loading
  },
  data() {
    return {
      valueObj: {},
      columns: [
        {
          title: "文件名称",
          dataIndex: "fileName",
          key: "fileName"
        },
        {
          title: "工作表",
          dataIndex: "sheetName",
          key: "sheetName"
        },
        {
          title: "失败原因",
          dataIndex: "reason",
          key: "reason",
          scopedSlots: { customRender: "reason" }
        }
      ],
      data: [],
      visible: false,
      loadingValue: {},
      value: "project",
      fileList: [],
      fileList2: [],
      headers: {
        authorization: "authorization-text"
      }
    };
  },
  mounted() {},
  methods: {
    handleCancel() {
      this.visible = false;
    },
    beforeUpload(file) {
      // if (
      //   file.type !=
      //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" &&
      //   file.type != "application/vnd.ms-excel"
      // ) {
      //   this.$message.warning("上传文件夹里包含不是excel文件已自动删除");
      //   return false;
      // } else {
      //   }
        this.fileList = [...this.fileList, file];
    },
    handleRemove(file) {
      const index = this.fileList.indexOf(file);
      const newFileList = this.fileList.slice();
      newFileList.splice(index, 1);
      this.fileList = newFileList;
    },
    customRequest(file) {
      // const isexcel =
      //   file.file.type === "application/vnd.ms-excel" ||
      //   file.file.type ===
      //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      // if (!isexcel) {
      //   this.$message.error("请上传excel文件");
      // } else {
      //   }
        this.fileList = [...this.fileList, file.file];
    },
    handleUpload() {
      let formData = new FormData();
      this.loadingValue = {
        title: "导入文件",
        content: "文件正在导入请稍候...",
        showloading: true
      };
      this.fileList.forEach(item => {
        formData.append("files", item);
      });
      formData.append("fileType", this.value);
      exportExcel(formData).then(response => {
        if (response.data.status == 200) {
          this.$message.success("上传成功");
          this.loadingValue = {
            title: "上传成功",
            content: "",
            showloading: false
          };
          this.fileList = [];
          this.visible = false;
        } else {
          this.loadingValue = {
            title: "上传失败",
            content: "",
            showloading: false
          };
          this.fileList = [];
          this.visible = true;
          this.valueObj = response.data.message;
          this.data = response.data.message.data;
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
/deep/.ant-upload-list {
  max-height: 400px;
  overflow: auto;
  margin-top: 10px;
  margin-bottom: 10px;
  background: #fafafa;
  position: relative;
  width: 100%;
  left: -134px;
}
// .uploader-btn {
//   background: #67c23a;
//   border: 1px solid #67c23a;
//   color: #fff;
// }
 .but {
    background-color: #e8f2ff;
    border: 1px solid #77a6fc;
  }
 .contentWidth2{
        // width:1400px;
        width:100%;
        min-height:600px;
      }
</style>
