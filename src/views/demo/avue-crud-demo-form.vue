<template>
  <div id="requiredItem">
    <!--componentId 的值需要修改-->
    <page-form
      :option="tableOption"
      :rowModel="formOption"
      componentId="requiredItem"
      ref="pageForm"
      :formTitle="title"
      :boxType="boxType"
      @row-save="handleSave"
      @row-update="handleUpdate">
       <template slot="name9Form" slot-scope="scope">
      <a-button  type="primary" @click="rowEdit3(scope)">form</a-button>
    </template>
    </page-form>
  </div>
</template>
<script>
  import { tableOption, addObj, putObj  } from "./avue-crud-demo";
  import routerParams from "./router-params.js";
  // import formAction from "./form-action.js";
  // import { getDic } from '@/api/admin';
  export default {
    name: 'required-item',
    mixins: [routerParams()],
    data() {
      return {
        tableOption: {}, //表格设置属性
        dataTable:[],
        title: '',
        formOption:{ },
        boxType: '',
      };
    },
    created() {
      //初始化数据格式
      this.routerParams = this.$store.state.routerParams
      this.tableOption = tableOption;
      this.formOption = this.routerParams.params
       this.initFormData()
      console.log( this.$store.state.routerParams,'this.$store.routerParams')
    },
       computed: {
      row(){
        return this.formOption
      }
    },
    methods:{
       initFormData(){
        this.title = this.routerParams.title || ''
        this.formOption = this.routerParams.params
        this.boxType = this.routerParams.boxType || ''
      },
      // ...mapMutations(["SET_ROUTER_PARAMS"]),
      handleSave(row,done){
        // row.fundId = row.fundIds[0].id
        addObj(row).then((res) => {
          this.$message({
            showClose: true,
            message: "添加成功",
            type: "success"
          });
          done(true)
        }).catch((err) => {
          done(false)
        });
      },
      handleUpdate(row, index, done) {
        // row.fundId = row.fundIds[0].id
        putObj(row).then(response => {
          this.$message({
            showClose: true,
            message: "修改成功",
            type: "success"
          });
          done(true)
        }).catch((err) => {
          done(false)
        });
      },
    }
  }
</script>

<style scoped>

</style>
