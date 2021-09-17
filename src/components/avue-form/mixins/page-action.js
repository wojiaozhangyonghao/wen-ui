import { mapActions } from 'vuex'

export default function() {
  return {
    data() {
      return {
        slots:[]
      };
    },
    activated(){
      this.page = Object.assign(this.page, this.$refs.pageTable.searchForm)
      this.handleList()
    },
    mounted(){
      console.log(this.$options.name)
      this.setKeepAlive(this.$options.name)
    },
    methods:{
      ...mapActions([
        'setKeepAlive','delKeepAlive'
      ]),
      getSelectedData(){
        this.tableSelected = this.$refs.pageTable.tableSelect
      },
      processObj(dataList){
        dataList.forEach(item=>{
          for(var index in item){
            if(Object.prototype.toString.call(item[index]) === '[object Object]'){
              var prefix = index+'-'
              var obj = item[index]
              for(var key in obj){
                item[prefix+key] = obj[key]
              }
              delete item[index]
            }
          }
        })
      }
    }
  }
}
