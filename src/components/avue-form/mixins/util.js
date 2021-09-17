import _ from 'lodash'
// import { getPermission } from "@/api/admin.js"
export default function() {
  return {
    created(){
      // if (this.componentId){
      //   getPermission(this.componentId).then(res=>{
      //     this.permission = res.data.data
      //   });
      // }
    },
    data(){
      return {
        cloneObj:null,
        permission:null
      }
    },
    methods: {
      vaildData(val, dafult) {
        if (typeof val == "boolean") {
            return val;
        }
        return !validatenull(val) ? val : dafult;
    },
      clone(obj){
        this.cloneObj = _.cloneDeep(obj);
      },
      equal(newObj){
        return _.isEqual(this.cloneObj, newObj)
      }
    },
  }
}
