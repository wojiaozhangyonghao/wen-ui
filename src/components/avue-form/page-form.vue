<template>
  <div class="crud-container pull-auto">
    <!-- <basic-container> -->
      <a-row style="margin-left: 1em">
        <h2>{{formTitle}}</h2>
      </a-row>
      <a-row style="margin-bottom: 20px" v-if="showBar&&(!vaildData(option.workflow,false))">
        <!-- <a-col :span="24" style="text-align: right; padding-right: 20px;">
          <a-button id="global_back" size="small" icon="el-icon-arrow-left" @click="goBack" circle></a-button>
          <a-button id="global_forward" size="small" icon="el-icon-arrow-right" @click="goForward" circle></a-button>
          <a-button type="success" size="small" icon="el-icon-question" @click.prevent.stop="guide">使用帮助</a-button>
        </a-col> -->
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
      <a-row style="margin: 5px 3em">
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
      </a-row>
      <a-row v-if="!vaildData(option.workflow,false)">
        <a-col :span="24" style="text-align: right;padding-right: 20px">
          <!--<el-button type="primary" id="global_temp" icon="jxIcon-floppy-disk" @click="rowTemSave" v-if="boxType === 'add'">暂存</el-button>-->
          <a-button type="primary" id="global_add" icon="save" @click="rowSave" v-if="boxType === 'add'">保存</a-button>
          <a-button type="primary" id="global_save" icon="save" @click="rowUpdate" v-if="boxType === 'edit'">保存</a-button>
          <a-button type="warning" id="global_forward" icon="close" @click="cancel" style="margin-left:20px;">取消</a-button>
          <slot name="buttons"></slot>
        </a-col>
      </a-row>
      <slot name="footer"></slot>
    <!-- </basic-container> -->
  </div>
</template>
<script>
  import crud from "../../../packages/mixins/crud.js";
  // import util from "@/template/mixins/util.js";
  import avueForm from "../../../packages/form/src/main.vue"
  // import { addTempData } from "@/api/admin.js"
  import Driver from 'driver.js'
  // const steps = require("../../guide-step")
  // import { mapGetters } from "vuex";
  export default {
    name: "PageForm",
    mixins: [crud()],
    components: {
	    avueForm
    },
    data () {
      return {
        defaultForm: {
          tableForm: {},
        },
        tableForm: {},
        tableFormRules: {},
        clientHeight: document.documentElement.clientHeight,
        animatedTourDriver: null,
        needWatch:true,
        tourSteps:[
          {
            "element": "#global_back",
            "popover": {
              "title": "后退",
              "description": "点击可以后退到前一页"
            }
          },
          {
            "element": "#global_forward",
            "popover": {
              "title": "前进",
              "description": "点击可以前进到下一页(在点击过后退的情况下才有效)"
            }
          }
        ],
        addSteps:[
          {
            "element": "#global_temp",
            "popover": {
              "title": "缓存功能",
              "description": "缓存当前页面的内容缓存，不进行校验"
            }
          }, {
            "element": "#global_add",
            "popover": {
              "title": "保存功能",
              "description": "保存当前页面的内容，进行校验"
            }
          }
        ],
        editSteps:[
          {
            "element": "#global_save",
            "popover": {
              "title": "保存功能",
              "description": "保存当前页面的内容，进行校验"
            }
          }
        ],
        loadingSaveData: {}
      };
    },
    created () {
      switch (this.boxType) {
        case 'add':
          this.rowAdd();
          // this.clone(this.tableForm);
          this.tourSteps = [].concat(this.tourSteps,this.addSteps)
          break;
        case 'edit':
          this.rowEdit(this.rowModel);
          // this.clone(this.tableForm);
          this.tourSteps = [].concat(this.tourSteps,this.editSteps)
          break;
        case 'view':
          this.tableForm = Object.assign({}, this.rowModel);
          break;
      }
      // if(steps[this.componentId] != null){
      //   this.tourSteps = [].concat(this.tourSteps, steps[this.componentId].tourSteps)
      // }
    },
    computed: {
      formOption: function () {
        if(this.option !=null || this.option !== {}){
          let option = Object.assign({}, this.option);
          option.submitBtn = false;
          option.submitPostion = 'right';
          option.boxType = this.boxType;
          option.column.forEach(item =>{
            if(!item.hasOwnProperty('span')){
              item.span = 20
            }
            item.clearable = true
          })
          option.labelPosition = 'left'
          option.labelWidth = 200
          return option;
        }
      },
      // ...mapGetters(["userInfo"])
    },
    mounted () {
      this.animatedTourDriver = new Driver({
        animate: true,
        opacity: 0.7,
        padding: 5,
        doneBtnText: '完成',
        closeBtnText: '关闭',
        stageBackground: '#ffffff',
        nextBtnText: '下一步',
        prevBtnText: '上一步',
        showButtons: true,
      })
    },
    props: {
      value: {
        type: Object,
        default: () => {
          return {}
        }
      },
      componentId:{
        type:String,
        required: true
      },
      option: {
        type: Object,
        required: true,
        default: () => {
          return [];
        }
      },
      formTitle:{
        type:String,
        required: true
      },
      rowModel:{
        type: Object,
        default: () => {
          return {}
        }
      },
      boxType:{
        type:String,
        required: true,
        default: ()=>{
          return 'add'
        }
      },
      showBar:{
        type:Boolean,
        default: ()=>{
          return true
        }
      }
    },
    methods: {
      processObj2(obj){
        for(var index in obj){
          if(index.includes('-')){
            let key = index.split('-')[0]
            let attr = index.split('-')[1]
            if(obj.hasOwnProperty(key)){
              obj[key][attr] = obj[index]
            }else {
              obj[key] = new Object()
              obj[key][attr] = obj[index]
            }
            delete obj[index]
          }
        }
      },
      cancel(){
        this.hide('cancel')
      },
      hide(flag = null){
        switch (flag) {
          case 'cancel':
            this.$store.commit('SET_ROUTER_PARAMS', {title:'', params: '', boxType: ''})
            this.$router.go(-1)
            break;
          case true:
            this.$store.commit('SET_ROUTER_PARAMS', {title:'', params: '', boxType: ''})
            this.$router.go(-1)
            this.loadingSaveData.close()
            break;
          case false:
            this.loadingSaveData.close()
            break;
          default:
            this.$store.commit('SET_ROUTER_PARAMS', {title:'', params: '', boxType: ''})
            this.$router.go(-1)
            this.loadingSaveData.close()
            break;
        }
      },
      indexMethod(index) {
        return (index + 1) + (((this.page.page || 1) - 1) * (this.page.size || 10))
      },
      showClomnu() {
      },
      refreshChange() {
        this.$emit("refresh-change", this.page);
      },
      formChange(val){
        this.$emit("form-change", val);
      },
      rulesInit() {
        this.tableFormRules = {};
        this.option.column.forEach(ele => {
          if (ele.rules) this.tableFormRules[ele.prop] = ele.rules;
        });
      },
      formVal() {
        for (let o in this.value) {
          this.tableForm[o] = this.value[o];
        }
        this.$emit("input", this.tableForm);
      },
      formInit() {
        this.defaultForm = this.formInitVal(this.option.column);
        this.tableForm = Object.assign({}, this.defaultForm.tableForm);
        this.formVal();
      },
      //导出文件
      exportFile() {
        this.$emit("export-file", this.searchForm);
      },
      // 新增
      rowAdd() {
        this.tableForm = Object.assign({}, this.defaultForm.tableForm);
        this.$emit("input", this.tableForm);
      },
      // 编辑
      rowEdit(row, index) {
        this.tableForm = Object.assign({}, row);
        this.$emit("input", this.tableForm);
        this.tableIndex = index;
      },
      // 删除
      rowDel(row, index) {
        this.$emit("row-del", row, index);
      },
      // 查看
      rowView(row, index) {
        this.boxType = 'view';
        this.tableForm = Object.assign({}, row);
        this.$emit("input", this.tableForm);
        this.tableIndex = index;
      },
      //保存
      rowSave() {
        this.$refs["tableForm"].validate()
          .then(() => {
            this.needWatch = false
            this.loadingSaveData = this.$loading({
              lock: true,
              text: '服务器正在拼命添加数据，请您耐心等候',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.3)',
              customClass:'customLoading'
            })
            this.processObj2(this.tableForm)
            this.$emit("row-save", Object.assign({}, this.tableForm), this.hide);
          },()=>{
            console.log('form 校验不通过')
          });
      },
      //暂存
      rowTemSave(done){
        const loadingTemData = this.$loading({
          lock: true,
          text: '服务器正在拼命添加缓存数据，请您耐心等候',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.6)',
          customClass:'customLoading'
        });
        // addTempData({'formId':this.componentId,
        //   'userId':this.userInfo.userId,
        //   'tempData':JSON.stringify(this.tableForm)}).then(res =>{
        //     loadingTemData.close()
        //     this.$message({
        //         showClose: true,
        //         message: "信息暂存成功",
        //         type: "success"
        //       })
        // })
        if(typeof done !== 'undefined'){
          done()
        }
      },
      //更新
      rowUpdate() {
        if(!this.equal(this.tableForm)){
          this.$refs["tableForm"].validate()
          .then(() => {
            this.needWatch = false
             this.loadingSaveData = this.$loading({
              lock: true,
              text: '服务器正在拼命更新数据，请您耐心等候',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.6)',
              customClass:'customLoading'
            });
            const index = this.tableIndex;
            this.processObj2(this.tableForm)
            this.$emit(
              "row-update",
              this.tableForm,
              index,
              this.hide
            );
          }, ()=>{
            console.log('form 校验不通过')
          })}
        else {
          this.$message({
            showClose: true,
            message: "信息更新成功",
            type: "success"
          });
          this.hide()
        }

      }
    }
  };
</script>

<style lang="scss" scoped>
  .crud-container {
    margin: 0 auto;
    padding: 5px 5px;
    width: 99%;
    /deep/.el-table__header th {
      word-break: break-word;
      color: rgba(0, 0, 0, 0.85);
      background: #fafafa;
    }
    /deep/.el-collapse-item__header{
      font-size: 16px;
    }
  }
  .avue-tip {
    position: relative;
    margin-bottom: 10px;
    width: 100%;
    display: flex;
    align-items: center;
    i {
      font-size: 16px;
    }
    .name {
      margin-right: 10px;
      color: #333;
    }
    .count {
      padding: 0 6px;
      color: #409eff;
      font-weight: bold;
      font-size: 16px;
    }
    .menu {
      cursor: pointer;
    }
  }
  .crud-pagination {
    margin-top: 15px;
    padding: 10px 20px;
  }
  .crud-form {
    padding: 0 8px;
  }
  .crud-header {
    margin-bottom: 10px;
    & > .el-button {
      padding: 12px 25px;
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
      .el-button {
        margin-left: 5px;
      }
    }
  }
  .crud--overflow {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: block;
  }
</style>
