import { mapGetters } from "vuex";
// import { fetchTempData } from "@/api/admin.js"
export default function() {
  return {
    data() {
      return {
        title: '',
        formOption:{ },
        boxType: '',
        slots:[]
      };
    },
    created() {
      this.initFormData()
    },
    mounted(){
      // this.getTemData()
    },
    computed: {
      ...mapGetters(["userInfo","routerParams"]),
      row(){
        return this.formOption
      }
    },
    // beforeRouteLeave(to, from , next){
    //   if((this.boxType === 'add' || this.boxType === 'edit') && !this.$refs.pageForm.equal(this.$refs.pageForm.tableForm) && this.$refs.pageForm.needWatch){
    //     this.$confirm('检测到页面信息有变动，是否在离开页面前保存修改？', '确认信息', {
    //       distinguishCancelAndClose: true,
    //       confirmButtonText: '保存',
    //       cancelButtonText: '放弃修改'
    //     })
    //       .then(() => {
    //         if(this.boxType === 'add'){
    //           this.$refs.pageForm.rowTemSave(next())
    //         }else if(this.boxType === 'edit'){
    //           this.handleUpdate()
    //         }
    //       })
    //       .catch(action => {
    //         if(action === 'cancel'){
    //           next()
    //         }else {
    //           next(false)
    //         }
    //       })
    //   }else {
    //     next()
    //   }
    // },
    methods: {
      initFormData(){
        this.title = this.routerParams.title || ''
        this.formOption = this.routerParams.params
        this.boxType = this.routerParams.boxType || ''
      },
      // getTemData(){
      //   if(this.boxType === 'add'){
      //     fetchTempData({'formId':this.$refs.pageForm.componentId,'userId':this.userInfo.userId}).then(res=>{
      //       if(res.data.data != null) {
      //         this.$confirm('检测到该页面有缓存信息，是否使用缓存信息？', '确认信息', {
      //           confirmButtonText: '使用',
      //           cancelButtonText: '不使用'
      //         })
      //         .then(() => {
      //           this.$refs.pageForm.tableForm =Object.assign({}, JSON.parse(res.data.data['tempData']))
      //           this.$message({
      //             type: 'success',
      //             message: '缓存信息已使用!'
      //           });
      //         })
      //         .catch(action => {
      //
      //         })
      //       }
      //     })
      //   }
      // }
    }
  }
}
