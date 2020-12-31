import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    name: '',
    data:'',
    user:'jzjg'
  },
  mutations: {
   changeUser(state,userkey){
    state.user = userkey
   }
  },
  actions: {
  
  },
  modules: {
  }
})
