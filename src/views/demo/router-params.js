export default function() {
  return {
    methods: {

      /**
       * 参数说明：
       * @path：要进入的form的路由路径 ；
       * @title：form的标题；
       * @action：add || edit || view 三选一；
       * @params：行对象数据
       */
      goto(path, title, action, params={}, query={}){
        this.$store.commit('SET_ROUTER_PARAMS', {title: title, params: params, boxType: action, query: query})
        this.$router.push(path)
      }
    }
  }
}
