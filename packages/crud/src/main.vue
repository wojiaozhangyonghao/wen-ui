<template>
  <div class="crud-container pull-auto">
    <div class="crud-header">
        <a-collapse v-model="activeNames" accordion :bordered="false">
          <a-collapse-panel key="searchForm"  v-if="(searchFlag && searchShow) || option.searchSlot ">
            <template slot="header">
            <a-icon  type="setting"></a-icon>{{vaildData(option.functionName,'工具栏')}}   
            </template>
            <a-row v-if="option.showBar">
                <a-col
                  :span="24"
                  style="text-align: right; padding-right: 20px; margin-bottom: 15px"
                >
                  <a-button
                    id="global_back"
                    icon="left"
                    @click="goBack"
                    shape="circle"
                  ></a-button>
                  <a-button
                    id="global_forward"
                    icon="right"
                    @click="goForward"
                    shape="circle"
                    style="margin-left:10px;"
                  ></a-button>
                  <a-button
                    type="primary"
                    icon="question"
                    style="background: #3dbb2b; border-color: #3dbb2b;margin-left:10px;"
                    @click.prevent.stop="guide"
                  >使用帮助</a-button>
                </a-col>
              </a-row>
              <a-form-model  
              class="ant-advanced-search-form" 
              ref="form"
             :model="searchForm"
             :label-align="option.labelPosition"
             :label-col="option.searchLabelCol || { span: 8 }">
      <a-row :gutter="20" :span="24">
        <template v-for="(column,index) in option.column">
          <div :class="{'avue-row':column.row}"  :key="index" v-if="!column.groupName">
            <a-col :span="column.searchSpan || 6" v-if="column.search">
              <a-form-model-item :label="column.title"
                            :prop="column.dataIndex"
                            :label-col="column.searchLabelCol"
                            >
                <component :format="column.format"
                              :size="option.searchSize"
                              :is="getSearchType(column)"
                              v-model="searchForm[column.dataIndex]"
                              :type="column.type"
                              :isSearch="true"
                              :multiple="column.multiple"
                              :allowClear="column.allowClear"
                              :showSearch='column.showSearch'
                              :placeholder="column.title"
                               :valueFormat="column.valueFormat"
                               :searchDefault="column.searchDefault"
                               :dic="setDic(column.dicData,DIC[column.dicData])"></component>
              </a-form-model-item>
            </a-col>
          </div>
          <div :class="{'avue-row':column.row}"    v-else v-for="(column1,index) in column.children" :key="column.dataIndex">
            <a-col :span="column1.searchSpan || 6" v-if="column1.search">
              <a-form-model-item :label="column1.title"
                            :prop="column1.dataIndex"
                            :label-col="column1.searchLabelCol || { span: 6 }"
                            >
                <component :format="column.format"
                              :size="option.searchSizeBtn"
                              :is="getSearchType(column)"
                              v-model="searchForm[column.dataIndex]"
                              :type="column.type"
                              :isSearch="true"
                              :multiple="column.multiple"
                              :allowClear="column.allowClear"
                              :showSearch='column.showSearch'
                              :placeholder="column.title"
                               :valueFormat="column.valueFormat"
                               :searchDefault="column.searchDefault"
                               :dic="setDic(column.dicData,DIC[column.dicData])"></component>
              </a-form-model-item>
            </a-col>
          </div>

        </template>

        <a-col :span="6" v-if="vaildData(option.menuBtn,true)">
           <a-form-model-item v-if="!option.searchSlot">
                    <a-button type="primary"
                              @click="searchChnage(option.column)"
                              icon="search"
                              :size="option.searchSizeBtn">搜索</a-button>
                    <!-- <a-button type="success"
                          size="small"
                          @click="exportFile"
                          icon="document"
                          v-if="vaildData(option.exportFileBtn,false)">导出</a-button> -->
                    <a-button @click="searchReset"
                              icon="delete"
                              style="margin-left:20px;"
                              :size="option.searchSize">清空</a-button>
                  </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
                 <slot name="searchSlot"></slot>
          </a-collapse-panel>
        </a-collapse>
    </div>
    <!-- 表格功能列 -->
    <div class="crud-menu">
      <div class="crud-menu_left">
        <a-button type="primary"
                   @click="rowAdd"
                   icon="plus"
                   v-if="vaildData(option.addBtn,true)"
                   >新 增</a-button>
        <slot name="menuLeft"></slot>
      </div>
      <div class="crud-menu_right">
        <slot name="menuRight"></slot>
        <a-button   
                  id="global_refresh"
                  icon="reload"
                    shape="circle"
                   style="background:#67C23A;border-color:#67C23A;color:#fff;"
                   @click="refreshChange"
                   v-if="vaildData(option.refreshBtn,true)"></a-button>
        <a-button icon="appstore"
                    id="global_showClomnu"
                    shape="circle"
                   type="primary"
                   @click="showClomnuBox=true"
                   v-if="vaildData(option.showClomnuBtn,true)"></a-button>
        <a-button icon="search"
                     id="global_showSearch"
                    shape="circle"
                   style="background:#E6A23C;border-color:#E6A23C;color:#fff;"
                   @click="searchShow=!searchShow"
                   v-if="vaildData(option.showSearchBtn,true) && searchFlag"></a-button>
      </div>
    </div>
    <a-tag color="#ecf5ff" class="avue-tip"
            v-if="vaildData(option.tip,true) && option.selection">
      <!-- <i class="el-icon-info">&nbsp;</i> -->
      <a-icon type="info" />
      <span class="name">当前表格已选择
        <span class="count">{{selectedRowKeys.length}}</span> 项</span>
      <span class="menu">
        <span @click="selectClear"
              v-if="vaildData(option.selectClearBtn,true) && option.selection">清空</span>
      </span>
    </a-tag>
    
              <!-- :columns="option.column" -->
              <!-- :row-selection="rowSelection" -->
    <a-table :data-source="data"
              :size="option.size"
              :rowKey="(record,index)=>{return record.id}"
              :row-selection="option.selection?{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }:null"
              :pagination="option.pagination"
              :show-header="option.showHeader"
              :row-class-name="rowClassName"
              :height="option.height=='auto'?($AVUE.clientHeight - vaildData(option.calcHeight,320)):option.height"
              ref="table"
              :width="setPx(option.width,'100%')"
              :scroll="{ x: option.width, y: option.height }"
              :bordered="option.border"
              :loading="tableLoading"
              :components="components2"
              @change="change">
              	<!-- 自定义表格渲染项 -->
			<!-- <template v-for="colCustom in columnsCustom" :slot="colCustom.customRender" slot-scope="text, record, index">
				<slot :name="colCustom.customRender" :tableRow="record" :index="index"></slot>
			</template> -->
      <!-- <template  v-for="column in option.column"  :slot="column.scopedSlots?column.scopedSlots.customRender:''" slot-scope="text, record" >
					<slot :name="column.scopedSlots?column.scopedSlots.customRender:''" v-bind="record" :index="index" ></slot>
				</template> -->
        <!-- <template  v-for="column in option.column"  :slot="column.scopedSlots?column.scopedSlots.customRender:''" slot-scope="text,record,index" >
					<slot :name="column.scopedSlots?column.scopedSlots.customRender:''" 
                :row="record"
                :dic="setDic(column.dicData,DIC[column.dicData])"
                :label="findByvalue(setDic(column.dicData,DIC[column.dicData]),record[column.dataIndex],(column.props || option.props))"
                :index="index"></slot>
				</template> -->
      <!-- <template slot="action" slot-scope="text, record, index">
          <template v-if="vaildData(option.menu,true)">
            <a-tooltip  title="编辑该条信息" v-if="vaildData(option.editBtn,true)">
             <a-icon type="edit" @click="rowEdit(record,index)" class="a-icon-edit-outline" />
            </a-tooltip> 
             <a-tooltip title="删除该条信息" v-if="vaildData(option.delBtn,true)">
             <a-icon type="delete" @click="rowDel(record,index)" class="a-icon-delete" />
            </a-tooltip>
            <a-tooltip  title="查看该条信息" v-if="vaildData(option.viewBtn,false)">
               <a-icon type="database"  @click="rowView(record,index)" class="a-icon-document" />
            </a-tooltip>
          </template>
          <slot :row="record.row"
                name="menu"
                :index="index"></slot>
        </template> -->

      <!-- 下拉弹出框  -->
      <!-- <template v-if="option.expand">
        <el-table-column type="expand"
                         width="50"
                         fixed="left"
                         align="center">
          <template slot-scope="props">
            <slot :row="props.row"
                  name="expand"></slot>
          </template>
        </el-table-column>
      </template> -->
      <!-- 选择框 -->
      <!-- <template v-if="option.selection && option.selectable">
        <el-table-column type="selection"
                         :selectable="option.selectable"
                         width="50"
                         fixed="left"
                         align="center">
        </el-table-column>
      </template>
      <template v-else-if="option.selection">
        <el-table-column type="selection"
                         width="50"
                         fixed="left"
                         align="center">
        </el-table-column>
      </template>  -->

      <!-- 序号 -->
      <!-- <template v-if="option.index">
        <el-table-column :label="vaildData(option.indexLabel,'#')"
                         type="index"
                         width="50"
                         :index="indexMethod"
                         fixed="left"
                         align="center">
        </el-table-column>
      </template> -->
                <!-- <template  v-if="column.type" slot-scope="text, record" :slot="column.dataIndex">
            <span  v-html="detail(record,column)"></span>
          </template> -->
          <!-- <template v-else slot-scope="text, record">
            <slot 
                :name="column.scopedSlots?column.scopedSlots.customRender:''" 
                :row="record"
                :dic="setDic(column.dicData,DIC[column.dicData])"
                :label="findByvalue(setDic(column.dicData,DIC[column.dicData]),record[column.dataIndex],(column.props || option.props))"
                :index="index"></slot> 
          </template> -->
         <!-- <template slot-scope="text, record">
           <span>{{text}}{{record}}</span>
           <slot :row="scope.row"
                :dic="setDic(column.dicData,DIC[column.dicData])"
                :label="findByvalue(setDic(column.dicData,DIC[column.dicData]),scope.row[column.prop],(column.props || option.props))"
                :name="column.prop"
                v-if="column.solt"></slot>
          <template v-else>
            <span v-html="detail(scope.row,column)"
                  v-if="column.type"></span>
            <span v-else>{{scope.row[column.prop]}}</span>
          </template> 
         </template>  -->
      <!-- 循环列 -->
      <a-table-column v-if="showClomnuIndex.indexOf(index)!=-1 && !column.children"
                       v-for="(column,index) in option.column"
                       :data-index="column.dataIndex"
                       :key="column.dataIndex"
                       :ellipsis="column.ellipsis"
                       :sorter="column.sortable"
                       :align="vaildData(column.align,option.align)"
                       :width="column.width"
                       :title="column.title"
                       :fixed="column.fixed">

        <template slot-scope="text, record">
          	<slot 
                 v-if="column.scopedSlots"
                :name="column.scopedSlots?column.scopedSlots.customRender:''" 
                :row="record"
                :dic="setDic(column.dicData,DIC[column.dicData])"
                :label="findByvalue(setDic(column.dicData,DIC[column.dicData]),record[column.dataIndex],(column.props || option.props))"
                :index="index"></slot>
          <template v-else>
            <template v-if="column.type">
             <a-tooltip  v-if="column.ellipsis" :title="detail(record,column)" placement="bottomLeft"><span>{{detail(record,column)}}</span></a-tooltip>
            <span v-else>{{detail(record,column)}}</span>
            </template>
            <template v-else>
            <a-tooltip v-if="column.ellipsis"  :title="record[column.dataIndex]" placement="bottomLeft">
            <span >{{record[column.dataIndex]}}</span>
                  </a-tooltip>
                  <span v-else>{{record[column.dataIndex]}}</span>
            </template>
          </template>
        </template>  
      </a-table-column> 
       <a-table-column-group 
        v-for="(column1,index) in option.column"
       v-if=" column1.groupName"
       :key="index"
       >
         <span slot="title">{{column1.groupName}}</span>
         <a-table-column v-if="showClomnuIndex.indexOf(index)!=-1"
                       v-for="(column,index) in column1.children"
                       :data-index="column.dataIndex"
                       :key="column.dataIndex"
                       :ellipsis="column.ellipsis"
                       :sorter="column.sortable"
                       :align="vaildData(column.align,option.align)"
                       :width="column.width"
                       :title="column.title"
                       :fixed="column.fixed">

        <template slot-scope="text, record">
          	<slot 
                 v-if="column.scopedSlots"
                :name="column.scopedSlots?column.scopedSlots.customRender:''" 
                :row="record"
                :dic="setDic(column.dicData,DIC[column.dicData])"
                :label="findByvalue(setDic(column.dicData,DIC[column.dicData]),record[column.dataIndex],(column.props || option.props))"
                :index="index"></slot>
          <template v-else>
            <template v-if="column.type">
             <a-tooltip  v-if="column.ellipsis" :title="detail(record,column)" placement="bottomLeft"><span>{{detail(record,column)}}</span></a-tooltip>
            <span v-else>{{detail(record,column)}}</span>
            </template>
            <template v-else>
            <a-tooltip v-if="column.ellipsis"  :title="record[column.dataIndex]" placement="bottomLeft">
            <span >{{record[column.dataIndex]}}</span>
                  </a-tooltip>
                  <span v-else>{{record[column.dataIndex]}}</span>
            </template>
          </template>
        </template>  
      </a-table-column> 
       </a-table-column-group>

      <a-table-column fixed="right"
                       v-if="vaildData(option.menu,true)"
                       key="action"
                       title="操作"
                       :align="option.menuAlign"
                       :width="vaildData(option.menuWidth,150)">
        <template slot-scope="text, record,index">
          <slot :row="record"
                name="menu"
                :index="index"></slot>
          <template v-if="vaildData(option.menu,true)">
            <a-tooltip  title="编辑该条信息" v-if="vaildData(option.editBtn,true)">
               <!-- <i @click="rowEdit(record,scope.$index)" class="el-icon-edit-outline"></i> -->
              <!-- <a-icon type="edit" @click="rowEdit(record,index,option.column)" class="a-icon-edit-outline" /> -->
              <a-button
                      style="color: #88c35b;"
                      type="dashed"
                      @click="rowEdit(record,index,option.column)"
                      shape="circle"
                      size="small"
                      icon="edit"
              ></a-button>
            </a-tooltip>
            <a-tooltip  title="查看该条信息" v-if="vaildData(option.viewBtn,false)">
              <!-- <i @click="rowView(scope.row,scope.$index)" class="el-icon-document"></i> -->
              <!-- <a-icon type="database"  @click="rowView(record,index)" class="a-icon-document" /> -->
              <a-button
                        type="dashed"
                        shape="circle"
                        size="small"
                        icon="database"
                        style="margin-left:5px;color: #88c35b;"
                        @click="rowView(record,index,option.column)"
                ></a-button>
            </a-tooltip>
            <a-tooltip title="删除该条信息" v-if="vaildData(option.delBtn,true)">
              <!-- <i @click="rowDel(scope.row,scope.$index)" class="el-icon-delete"></i> -->
              <!-- <a-icon type="delete" @click="rowDel(record,index)" class="a-icon-delete" /> -->
              <a-button
                        type="danger"
                        shape="circle"
                        size="small"
                        icon="delete"
                        style="margin-left:5px"
                        @click="rowDel(record,index)"
                ></a-button>
            </a-tooltip>
          </template>
          
        </template>
      </a-table-column> 
    </a-table> 
    <!-- 分页 -->
    <a-pagination v-if="vaildData(option.page,true)"
                   class="crud-pagination pull-right"
                   :current.sync="page.page"
                   :page-size-options="option.pageSizeOptions"
                    :total="page.total"
                    show-size-changer
                    show-quick-jumper
                   :page-size="page.size"
                   :show-total="total => `共 ${page.total} 条`"
                   @showSizeChange="currentChange"
                   @change="sizeChange"
                  ></a-pagination>
                   <!-- <a-pagination show-quick-jumper :default-current="2" :total="500" @change="onChange" /> -->
                   <!-- layout="total, sizes, prev, pager, next, jumper" -->
    <!-- 表单 -->
               <!-- lock-scroll dialogClass-->
    <a-modal
               :dialog-class="vaildData(option.dialogClass,'')"
               :maskClosable="false" 
               :modal-append-to-body="false"
               :append-to-body="true"
               :title="boxType=='add'?'新增':boxType=='edit'?'编辑':'查看'"
               :visible.sync="boxVisible"
               :width="vaildData(option.formWidth,'50%')"
               @cancel="hide"
               v-if="boxVisible">
      <div class="avue-dialog">
        <avue-form v-model="tableForm"
                   ref="tableForm"
                   :option="formOption"
                   @form-change="formChange" >
          <template slot-scope="scope"
                    v-for="(item,index) in option.column"
                    :slot="item.dataIndex">
            <slot :value="scope.value"
                  :column="scope.column"
                  :dic="scope.dic"
                  :name="item.dataIndex+'Form'"
                  v-if="item.formsolt"></slot>
          </template>
          <template>
                <slot name="contentForm"></slot>
          </template>
        </avue-form>
      </div>
      <template  slot="footer"
            class="dialog-footer">
        <slot name="menuForm"
              :row="tableForm"
              :type="boxType"></slot>
        <a-button type="primary"
                   @click="rowUpdate"
                   v-if="boxType=='edit'">修 改</a-button>
        <a-button type="primary"
                   @click="rowSave"
                   v-else-if="boxType=='add'">新 增</a-button>
        <a-button type="warning" @click="hide">取 消</a-button>
      </template>
    </a-modal>
    <!-- 动态列 -->
    <!-- lock-scroll -->
    <a-modal 
               :modal-append-to-body="false"
               :append-to-body="true"
               title="多选"
               :visible.sync="showClomnuBox"
               @cancel="cancel"
               @ok="ok"
               >
      <a-checkbox-group v-model="showClomnuIndex">
        <a-row :span="24">
          <a-col :span="6"
                  v-for="(item,index) in showClomnuList"
                  :key="index">
            <a-checkbox :value="item.index">{{item.label}}</a-checkbox>
          </a-col>
        </a-row>
      </a-checkbox-group>
    </a-modal>

  </div>
</template>
<script>
 import Vue from "vue";
import VueDraggableResizable from "vue-draggable-resizable";
// import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
Vue.component("vue-draggable-resizable", VueDraggableResizable);
import crud from "../../mixins/crud.js";
import { validatenull } from "../../utils/validate.js";
import moment from "moment";
import Driver from "driver.js";
// const steps = require("../../../src/assets/guide-step.json");
moment.suppressDeprecationWarnings = true;
export default {
  name: "AvueCrud",
  mixins: [crud()],
  components: {},
  data () {
    return {
      components2 : {
                header: {
                    cell: (h, props, children) => {
                        const {key, ...restProps} = props;
                        const col = this.option.column.find(col => {
                            const k = col.dataIndex || col.key;
                            return k === key;
                        });
                        if (!col || !col.width) {
                            return h("th", {...restProps}, [...children]);
                        }
                        const dragProps = {
                            key: col.dataIndex || col.key,
                            class: "table-draggable-handle",
                            attrs: {
                                w: 10,
                                x: col.width,
                                z: 1,
                                axis: "x",
                                draggable: true,
                                resizable: false
                            },
                            on: {
                                dragging: x => {
                                    col.width = Math.max(x, 1);
                                }
                            }
                        };
                        const drag = h("vue-draggable-resizable", {...dragProps});
                        return h("th", {...restProps, class: "resize-table-th"}, [
                            ...children,
                            drag
                        ]);
                    }
                }
            },
      selectedRowKeys: [],
      defaultForm: {
        tableForm: {},
        searchForm: {}
      },
      activeNames: ['searchForm'],
      searchShow: false,
      searchForm: {},
      boxVisible: false,
      boxType: 'add',
      showClomnuIndex: [],
      showClomnuBox: false,
      showClomnuList: [],
      tableForm: {},
      tableFormRules: {},
      tableIndex: -1,
      tableSelect: [],
      animatedTourDriver: null,
      tourSteps: [
        {
          element: "#global_back",
          popover: {
            title: "后退",
            description: "点击可以后退到前一页"
          }
        },
        {
          element: "#global_forward",
          popover: {
            title: "前进",
            description: "点击可以前进到下一页(在点击过后退的情况下才有效)"
          }
        },
        {
          element: "#global_refresh",
          popover: {
            title: "刷新",
            description: "点击可以刷新列表数据",
            position: "left"
          }
        },
        {
          element: "#global_showClomnu",
          popover: {
            title: "表头显隐",
            description: "点击可以编辑表头数据显隐",
            position: "left"
          }
        },
        {
          element: "#global_showSearch",
          popover: {
            title: "操作列",
            description: "点击可以使操作列显隐",
            position: "left"
          }
        },
      ]
    };
  },
  created () {
    console.log(this.steps,'this.steps')
    //初始化动态列
    this.showClomnuInit();
    if (this.steps.tourSteps) {
      this.tourSteps = this.tourSteps.concat(this.steps.tourSteps);
    }
  },
  computed: {
		columnsCustom () {
			return this.option.column.filter(item => {
				return item.scopedSlots
			}).map(item => item.scopedSlots)
		},
    selectLen () {
      // return this.tableSelect ? this.tableSelect.length : 0;
       return this.selectedRowKeys.length > 0;
    },
    searchFlag: function () {
      if (validatenull(this.searchForm)) {
        this.searchShow = false;
        return false;
      } else {
        this.searchShow = true;
        return true
      }
    },
    formOption: function () {
      let option = Object.assign({}, this.option);
      option.submitBtn = false;
      option.submitPostion = 'right';
      option.boxType = this.boxType;
      return option;
    }
  },
  mounted () { 
     this.animatedTourDriver = new Driver({
      animate: true,
      opacity: 0.7,
      padding: 5,
      doneBtnText: "完成",
      closeBtnText: "关闭",
      stageBackground: "#ffffff",
      nextBtnText: "下一步",
      prevBtnText: "上一步",
      showButtons: true
    });
  },
  props: {
    value: {
      type: Object,
      default: () => {
        return {}
      }
    },
    componentId: {
      type: String,
      required: true
    },
    steps:{ 
      type: Object,
      default: () => {
        return {}
      }
      },
    beforeClose: Function,
    beforeOpen: Function,
    rowClassName: Function,
    page: {
      type: Object,
      default () {
        return {
          total: 0, //总页数
          page: 1, //当前页数
          size: 10, //每页显示多少条
          pageSizes: ['10', '20', '30', '40', '50', '100'],
          background: true //背景颜色
        };
      }
    },
    tableLoading: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      required: true,
      default: () => {
        return [];
      }
    },
    option: {
      type: Object,
      required: true,
      default: () => {
        return [];
      }
    }
  },
  methods: {
    guide() {
      this.animatedTourDriver.defineSteps(this.tourSteps);
      this.animatedTourDriver.start();
    },
    goForward() {
      this.$router.forward();
    },
     goBack() {
      this.$router.back();
    },
    onSelectChange(selectedRowKeys) {
      // console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
       this.$emit("selection-change", selectedRowKeys);
    },
    selectClear () {
      // this.$refs.table.clearSelection();
      this.selectedRowKeys = [];
    },
    indexMethod (index) {
      return (index + 1) + (((this.page.page || 1) - 1) * (this.page.size || 10))
    },
    showClomnu () { },
    refreshChange () {
      this.$emit("refresh-change", this.page);
    },
    rulesInit () {
      this.tableFormRules = {};
      this.option.column.forEach(ele => {
        if (ele.rules) this.tableFormRules[ele.dataIndex] = ele.rules;
      });
    },
    showClomnuInit: function () {
      this.option.column.forEach((ele, index) => {
        if (ele.groupName){
          ele.children.forEach((item,i)=>{
            let children = {
            label: item.title,
            index: i
          };
          this.showClomnuList.push(Object.assign({}, children));
          })
        }
        if (validatenull(ele.hide)) {
          this.showClomnuIndex.push(index);
        }
        if (ele.showClomnu != false) {

          let obj = {
            label: ele.title,
            index: index
          };
          this.showClomnuList.push(Object.assign({}, obj));
        }
      });
    },
    formVal () {
      for (let o in this.value) {
        this.tableForm[o] = this.value[o];
      }
      this.$emit("input", this.tableForm);
    },
    formInit () {
      this.defaultForm = this.formInitVal(this.option.column);
      this.tableForm = Object.assign({}, this.defaultForm.tableForm);
      this.searchForm = Object.assign({}, this.defaultForm.searchForm);
      this.formVal();
    },
    //搜索清空
    searchReset () {
      this.$refs["searchForm"].resetFields();
    },
    // 页大小回调  第几页
    sizeChange (current, pageSize) {
      this.$emit("size-change", current);
    },
    // 页码回调 ，每页多少条
    currentChange (current, pageSize) {
      this.$emit("current-change", pageSize);
    },
    //表单变化回调
    formChange(val){
      this.$emit("form-change", val);
    },
    // 选中实例
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.table.toggleRowSelection(row);
        });
      } else {
        this.$refs.table.clearSelection();
      }
    },
    //导出文件
    exportFile(){
      this.$emit("export-file", this.searchForm);
    },
    change(pagination, filters, sorter, { currentDataSource }){
        this.$emit("change", pagination, filters, sorter, { currentDataSource });
    },
    //去除传参undefined
    delUndefined(val){
      let form = JSON.parse(JSON.stringify(val))
      for(var a in form){
        if(form[a] === undefined || form[a] === null){
          form[a] = ''
        }
      }
      return form 
    },
    //搜索回调
    searchChnage (column) {
      console.log(this.searchForm,'this.searchForm')
      this.$emit("search-change", this.delUndefined(this.searchForm));
      //  column.forEach(ele => {
      //    if (ele.type == 'date'){
      //      console.log(this.searchForm[ele.dataIndex],'this.searchForm[ele.dataIndex]')
      //     //  this.searchForm[ele.dataIndex] = this.searchForm[ele.dataIndex].format('YYYY-MM-DD')
      //    }
      //   //  else if (ele.type == 'month'){
      //   //    this.searchForm[ele.dataIndex] = moment(this.searchForm[ele.dataIndex], 'YYYY-MM')
      //   //  }
      //  })
      // for(var a in this.searchForm){
      //   if(this.searchForm[a] instanceof Object){
      //     this.searchForm[a] = moment
      //   }
      // }
    },
    //处理数据
    detail (row, column) {
      // console.log(row, column,'row, column')
      let result = row[column.dataIndex];
      // console.log(result,'result111')
      if (column.type) {
        if (
          (column.type == "date" ||
          column.type == "month" ||
          column.type == "year" ||
            column.type == "time" ||
            column.type == "datetime") &&
          column.format
        ) {
          const format = column.format
            .replace("dd", "DD")
            .replace("yyyy", "YYYY");
            if(result){
              result = moment(result).format(format);
            }else{
              result = null
            }
          //  console.log(result,'result222')
        }
        if(
        column.type == "user" ||
        column.type == "role" ||
        column.type == "external" ||
        column.type == "org" ||
        column.type == "deptUser" ||
        column.type == "roleUser" ||
        column.type == "select2"  ||
        column.type == "fundinfo"){
          var data = row[column.dataIndex];
          result = "";
          if(data != undefined && data.length > 0){
              for(var i=0; i<data.length; i++){
                result += data[i].title + ",";
              }
              result = result.substring(0,result.length-1)
          }
        }
        if (column.dicData) {
          result = this.findByvalue(
            typeof column.dicData == "string"
              ? this.DIC[column.dicData]
              : column.dicData,
            result
          );
        }
      }
      if (column.formatter && typeof column.formatter === "function") {
        result = column.formatter(row, result);
      }
      return result;
    },
    // 新增
    rowAdd () {
      this.boxType = 'add';
      this.tableForm = Object.assign({}, this.defaultForm.tableForm);
      this.$emit("input", this.tableForm);
      this.show();
    },
    // 编辑
    rowEdit (row, index,column) {
      console.log(row, index,column,'row, index')
       column.forEach(ele => {
         if (ele.type == 'date'){
           console.log(row[ele.dataIndex],'row[ele.dataIndex]')
           row[ele.dataIndex] = row[ele.dataIndex]?moment(row[ele.dataIndex], 'YYYY-MM-DD'):null
         }else if (ele.type == 'month'){
           row[ele.dataIndex] = row[ele.dataIndex]?moment(row[ele.dataIndex], 'YYYY-MM'):null
         }else if (ele.type == 'year'){
           row[ele.dataIndex] = row[ele.dataIndex]?moment(row[ele.dataIndex], 'YYYY'):null
         }
        //  else if (ele.type == 'month'){dateRange
        //    row[ele.dataIndex] = moment(row[ele.dataIndex], 'YYYY-MM')
        //  }else if (ele.type == 'month'){
        //    row[ele.dataIndex] = moment(row[ele.dataIndex], 'YYYY-MM')
        //  }
       })
       console.log(row, index,column,'row, index')
      this.boxType = 'edit';
      this.tableForm = Object.assign({}, row);
      this.$emit("input", this.tableForm);
      this.tableIndex = index;
      this.show();
    },
    // 删除
    rowDel (row, index) {
      this.$emit("row-del", row, index);
    },
    // 查看
    rowView (row, index,column) {
      column.forEach(ele => {
         if (ele.type == 'date'){
           row[ele.dataIndex] = moment(row[ele.dataIndex], 'YYYY-MM-DD')
         }else if (ele.type == 'month'){
           row[ele.dataIndex] = moment(row[ele.dataIndex], 'YYYY-MM')
         }else if (ele.type == 'year'){
           row[ele.dataIndex] = moment(row[ele.dataIndex], 'YYYY')
         }
       })
      this.boxType = 'view';
      this.tableForm = Object.assign({}, row);
      this.$emit("input", this.tableForm);
      this.tableIndex = index;
      this.show();
    },
    //保存
    rowSave () {
       console.log(this.$refs["tableForm"],'this.$refs["tableForm"]')
            console.log(this.$refs,'this.$refs')
            console.log(this.$refs.tableForm,'this.$refs["tableForm"]')
      this.$refs["tableForm"].validate().then(res => {
        this.$emit("row-save", Object.assign({}, this.tableForm), this.hide);
      });
    },
    //更新
    rowUpdate () {
      this.$refs["tableForm"].validate().then(res => {
        const index = this.tableIndex;
        this.$emit(
          "row-update",
          Object.assign({}, this.tableForm),
          index,
          this.hide
        );
      })
    },
    //显示表单
    show (cancel) {
      const callack = () => {
        if (cancel !== true) {
          this.$nextTick(() => {
            this.$refs["tableForm"].clearValidate();
          });
          this.boxVisible = true;
        }
      };
      if (typeof this.beforeOpen === "function") this.beforeOpen(callack);
      else callack();
    },
    //隐藏表单
    hide (cancel) {
      console.log(cancel,'cancel')
      // const callack = () => {
        // if (cancel !== false) {
          this.$nextTick(() => {
            // setTimeout(()=>{
              console.log(this.$refs["tableForm"],'this.$refs["tableForm"]')
              console.log(this.$refs,'this.$refs')
              console.log(this.$refs.tableForm,'this.$refs["tableForm"]')
              this.$refs["tableForm"].resetForm();
              this.$emit("input", this.tableForm);
            // },0)
              this.boxVisible = false;
          });
        // }
      // };
      // if (typeof this.beforeClose === "function") this.beforeClose(callack);
      // else callack();
    },
    cancel(){
      this.showClomnuBox = false
    },
    ok(){
      this.showClomnuBox = false
    }
  }
};
</script>

<style lang="scss">
 .resize-table-th {
    position: relative;

    .table-draggable-handle {
        position: absolute !important;
        transform: none !important;
        top: 0 !important;
        height: 100% !important;
        bottom: 0;
        left: auto !important;
        right: -5px;
        cursor: col-resize;
        touch-action: none;
    }
}
.ant-collapse-borderless > .ant-collapse-item > .ant-collapse-content{
  background-color:#fff;
}
.ant-collapse{
  background-color:#fff;
}
.a-icon-delete{
  margin-left: 10px;
}
.a-icon-document{
  margin-left: 10px;
}
.crud-container {
  margin: 0 auto;
  width: 99%;
  .ant-table-thead {
    word-break: break-word;
    color: rgba(0, 0, 0, 0.85);
    background: #f0f3fa;
  }
}
.crud-pagination {
  float:right;
  margin-top: 15px;
  padding: 10px 20px;
}
.crud-form {
  padding: 0 8px;
}
.crud-header {
  margin-bottom: 10px;
  & > .a-button {
    padding: 12px 25px;
  }
  .ant-btn-sm{
 margin: 0 25px;
  }
  .ant-collapse > .ant-collapse-item > .ant-collapse-header{
    text-align: -webkit-left;
  }
}

.crud-menu {
  position: relative;
  width: 100%;
  min-height: 40px;
  height: auto;
  overflow: hidden;
  margin-bottom: 12px;
  .crud-menu_left,
  .crud-menu_right {
    position: absolute;
    height: auto;
    overflow: hidden;
  }
  .crud-menu_left {
    left: 0;
    .el-button {
    }
  }
  .crud-menu_right {
    right: 0;
    .ant-btn-icon-only {
      margin-left: 5px;
    }
  }
}
.crud-dialog {
  border-radius: 5px;
  box-shadow: 10px 10px 15px #666;
  .a-dialog__header {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    padding: 12px 20px;
    background-color: #409eff;
  }
  .a-dialog__close {
    color: #fff;
    font-size: 18px;
    &:hover {
      color: #ffddff;
    }
  }
  .a-dialog__title {
    color: #fff;
    font-size: 18px;
  }
  .a-dialog__headerbtn {
    top: 18px;
  }
}
.crud--overflow {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
}
</style>
