<template>
  <section id="detail">
    <a-layout>
      <div class="contentWidth">
        <a-card>
          <div class="contentTop">
            <a-button @click="goClick" class="but" icon="arrow-left">返回</a-button>
            <div class="searchInput">zb详情</div>
          </div>
        </a-card>
        <a-card style="min-height:600px;margin-top: 16px;">
          <a-layout-content>
            <div style="margin-top:10px;">
                 <a-row style="margin-bottom: 5px;">
              <div  class="descriptions2">
                  <a-col :span="18">
                <a-descriptions bordered :column="2" size="small">
                  <a-descriptions-item label="zb编码">{{basicData.zhuangBeiBianMa}}</a-descriptions-item>
                  <a-descriptions-item label="zb名称">{{basicData.zhuangBeiMingCheng}}</a-descriptions-item>
                  <a-descriptions-item label="使命任务" :span="2">
                    <div class="shiMingRenWu">
                      {{basicData.shiMingRenWu}}
                      <div class="showMore" v-if="showMore1" @click="showDetail('1')">更多</div>
                    </div>
                  </a-descriptions-item>
                  <a-descriptions-item label="主要战技指标" :span="2">
                    <div class="shiMingRenWu">
                      {{basicData.zhuYaoZhanJiZhiBiao}}
                      <div class="showMore" v-if="showMore2" @click="showDetail('2')">更多</div>
                    </div>
                  </a-descriptions-item>
                </a-descriptions>
                </a-col>
              </div>
                  <a-col :span="6">
              <a-card class="card">
                <imgview
                  style="height:198px;cursor:pointer"
                  v-if="picUrl"
                  :imgUrl="picUrl"
                ></imgview>
                <a-empty v-if="empty" style="height:198px;" description="暂无图片" />
              </a-card>
                </a-col>
                </a-row>
              <div class="descriptions">
                <a-descriptions bordered :column="5" size="small">
                  <a-descriptions-item label="承研单位">  <a-tooltip placement="topLeft" :title="basicData.chengYanDanWei"><div class="content">{{basicData.chengYanDanWei}}</div> </a-tooltip></a-descriptions-item>
                  <a-descriptions-item label="批复立项文号"><a-tooltip placement="topLeft" :title="basicData.piFuLiXiangWenHao"><div class="content">{{basicData.piFuLiXiangWenHao}}</div></a-tooltip></a-descriptions-item>
                  <a-descriptions-item label="立项概算">{{basicData.liXiangGaiSuan}}</a-descriptions-item>
                  <a-descriptions-item label="调整/超概算">{{basicData.chaoGaiSuan}}</a-descriptions-item>
                  <a-descriptions-item label="订购目标价格">{{basicData.dingGouMuBiaoJiaGe}}</a-descriptions-item>
                  <a-descriptions-item label="承制单位"><a-tooltip placement="topLeft" :title="basicData.chengZhiDanWei"><div class="content">{{basicData.chengZhiDanWei}}</div></a-tooltip></a-descriptions-item>
                  <a-descriptions-item label="承制批价文号"><a-tooltip placement="topLeft" :title="basicData.chengZhiPiJiaWenHao"><div class="content">{{basicData.chengZhiPiJiaWenHao}}</div></a-tooltip></a-descriptions-item>
                  <a-descriptions-item label="已订购总量">{{basicData.yiDingGouZongLiang}}</a-descriptions-item>
                  <a-descriptions-item label="定价批次数量">{{basicData.dingJiaPiCiShuLiang}}</a-descriptions-item>
                  <a-descriptions-item label="订购价格">{{basicData.dingGouJiaGe}}</a-descriptions-item>
                  <a-descriptions-item label="承修单位"> <a-tooltip placement="topLeft" :title="basicData.chengXiuDanWei"><div class="content">{{basicData.chengXiuDanWei}}</div> </a-tooltip></a-descriptions-item>
                  <a-descriptions-item label="承修批价文号"><a-tooltip placement="topLeft" :title="basicData.chengXiuPiJiaWenHao"><div class="content">{{basicData.chengXiuPiJiaWenHao}}</div> </a-tooltip></a-descriptions-item>
                  <a-descriptions-item label="首批首次大修数量">{{basicData.shouPiShouCiDaXiuShuLiang}}</a-descriptions-item>
                  <a-descriptions-item label="大修目标价格">{{basicData.daXiuMuBiaoJiaGe}}</a-descriptions-item>
                  <a-descriptions-item label="大修价格">{{basicData.daXiuJiaGe}}</a-descriptions-item>
                </a-descriptions>
              </div>
            </div>
            <div style="clear:both;padding-top:10px;">
              <a-tabs defaultActiveKey="1" type="card" style>
                <a-tab-pane tab="分系统信息" key="1">
                  <div style>
                    <a-spin :spinning="spinning">
                      <a-table
                        rowKey="id"
                        :defaultExpandedRowKeys="defaultExpandedRowKeys"
                        :columns="columns"
                        :pagination="false"
                        :rowClassName="tableClass"
                        :dataSource="data"
                        bordered
                        @expandedRowsChange="expandedRowsChange"
                        @expand="expand"
                        size="small"
                      />
                    </a-spin>
                  </div>
                </a-tab-pane>
              </a-tabs>
            </div>
            <a-modal
              footer
              :width="1000"
              title="详情"
              :visible="visible"
              @ok="handleOk"
              :confirmLoading="confirmLoading"
              @cancel="handleCancel"
              :closable="true"
              :bodyStyle="{ height: '600px', overflow: 'auto' }"
            >
              <p>{{ detail }}</p>
            </a-modal>
          </a-layout-content>
          <a-layout-footer style="background:white;padding:0 10px;"></a-layout-footer>
        </a-card>
      </div>
    </a-layout>
  </section>
</template>

<script>
import { getPicture, column, detail, detailInfoLower } from "./detail.js";
import imgview from "@/components/img-view/img-view.vue";
export default {
  name: "detail",
  components: {
    imgview
  },
  data() {
    return {
      empty: false,
      defaultExpandedRowKeys: [],
      basicData: {},
      detail: "",
      showMore1: false,
      showMore2: false,
      confirmLoading: false,
      visible: false,
      spinning: false,
      data: [],
      picUrl: "",
      total: 0,
      current: 1,
      page: 1,
      size: 10
    };
  },
  created() {
    this.columns = column;
    let id = this.$route.query.id;
    this.getDetail(id);
    getPicture({ id: id }).then(response => {
      if (response.data.size == 0) {
        // this.picUrl = "";
        this.empty = true;
      } else {
        this.picUrl = window.URL.createObjectURL(response.data);
      }
    });
  },
  mounted() {},
  methods: {
    expandedRowsChange(expandedRows) {
      console.log(expandedRows, "expandedRows");
    },
    expand(expanded, record) {
      console.log(expanded, record, "expanded, record");
      detailInfoLower({
        id: record.id
      }).then(response => {
        // let arr = response.data.message.idList
        console.log(response.data.message.tree, "response");
        // arr.forEach((item,index)=>{
        //   this.$set(this.defaultExpandedRowKeys,index,item)
        // })
        record.children = response.data.message.tree;
        console.log(
          this.defaultExpandedRowKeys,
          "this.defaultExpandedRowKeys1111"
        );
      });
    },
    tableClass(record, index) {
      console.log(record, index);
      if (record.id == this.$route.query.id) {
        return "red";
      } else {
        return "";
      }
    },
    showDetail(val) {
      this.visible = true;
      if (val == "1") {
        this.detail = this.basicData.shiMingRenWu;
      } else if (val == "2") {
        this.detail = this.basicData.zhanJiZhiBiao;
      }
    },
    handleOk() {},
    handleCancel() {
      this.visible = false;
    },
    getDetail(id) {
      this.spinning = true;
      detail({
        id: id
        // page: this.page,
        // size: this.size,
      }).then(response => {
        if (response.status == 200) {
          this.spinning = false
          this.basicData = response.data.message.getGearBasicDetailInfo.head;
          this.data = response.data.message.getComponentDetailInfoTree.tree;
          let arr = response.data.message.getComponentDetailInfoTree.idList;
          console.log(this.data, "response.data");
          if (arr) {
            arr.forEach((item, index) => {
              this.$set(this.defaultExpandedRowKeys, index, item);
            });
          }
          // this.$nextTick(()=>{
          //   this.defaultExpandedRowKeys = response.data.message.getComponentDetailInfoTree.idList.reverse().slice(0,-1)

          // })
          console.log(
            this.defaultExpandedRowKeys,
            "this.defaultExpandedRowKeys"
          );
        } else {
          this.spinning = false;
        }
      });
    },
    goClick() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/.ant-table-tbody {
  .red {
    background: #e6f7ff;
    font-weight: 500;
  }
}
#detail {
  .but {
    background-color: #e8f2ff;
    border: 1px solid #77a6fc;
  }
  /deep/.ant-table-tbody
    > tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected)
    > td {
    background-color: transparent;
  }
  /deep/.descriptions .ant-descriptions-bordered .ant-descriptions-item-label {
    width: 100px;
    padding: 16px 10px;
  }
  /deep/.descriptions .ant-descriptions-item-content{
    width: 120px;
      // padding-right: 20px;
    // position: relative;
    // height: 60px;
    // display: -webkit-box;
    // -webkit-box-orient: vertical;
    // -webkit-line-clamp: 1;
    // overflow: hidden;
  }
  .content{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
  /deep/.descriptions2 .ant-descriptions-bordered .ant-descriptions-item-label {
    width: 140px;
    padding: 16px 10px;
  }
  .contentTop {
    // padding: 10px 0;
    height: 50px;
    display: flex;
    align-items: center;
    // justify-content: center;
    .searchInput {
      margin-left: 20px;
      font-size: 20px;
      font-weight: 700;
    }
  }
  .shiMingRenWu {
    padding-right: 20px;
    position: relative;
    height: 60px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    .showMore {
      cursor: pointer;
      position: absolute;
      right: 0;
      top: 42px;
      background: white;
      color: #1890ff;
    }
  }
  .card {
    // float: left;
    margin-left: 10px;
    /deep/ .ant-card-body {
      padding: 5px !important;
    }
  }
  /deep/ .ant-card-body {
    padding: 5px 24px;
  }
  .contentBottom {
    padding: 0 10px;
    width: 100%;
    .contentTip {
      margin-top: 10px;
      padding: 0 10px;
      border-top: 2px solid #e8e8e8;
      border-bottom: 2px solid #e8e8e8;
      height: 30px;
      line-height: 30px;
      background: #fafafa;
      a {
        color: rgba(0, 0, 0, 0.65);
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.ant-table-tbody > tr {
  .red {
    background: red;
  }
}
</style>
