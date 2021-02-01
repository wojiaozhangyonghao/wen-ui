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
    </page-form>
  </div>
</template>
<script>
  import { tableOption, addObj, putObj  } from "./avue-crud-demo";
  // import routerParams from "../template/mixins/router-params.js";
  // import formAction from "@/template/mixins/form-action.js";
  // import { getDic } from '@/api/admin';
  export default {
    name: 'required-item',
    mixins: [],
    data() {
      return {
        tableOption: {}, //表格设置属性
        dataTable:[],
      };
    },
    created() {
      //初始化数据格式
      this.tableOption = tableOption;
      this.formOption = this.$store.routerParams
      console.log(this.$store.routerParams,'this.$store.routerParams')
    },
       computed: {
         },
    methods:{
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
