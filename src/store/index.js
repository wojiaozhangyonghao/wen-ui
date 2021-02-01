import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: '',
    data:'',
    user:'jzjg',
    routerParams:{}
  },
  mutations: {
   changeUser(state,userkey){
    state.user = userkey
   },
   SET_ROUTER_PARAMS: (state, params) =>{
    state.routerParams = params
    // setStore({
    //   name: 'routerParams',
    //   content: state.routerParams,
    // })
  },
  },
  actions: {
  
  },
  modules: {
  }
})
