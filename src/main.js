import Vue from 'vue';
import App from './App.vue';
import antDesign from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import './global.scss';
import store from './store'
import VueRouter from 'vue-router';
import routes from './routes/routes';
import axios from 'axios';
import headers from '@/components/header'
import AVUE from '../packages/index.js';

Vue.use(AVUE)
Vue.use(headers)
Vue.use(VueRouter)
Vue.use(antDesign)
Vue.config.productionTip = false
Vue.prototype.$http = axios

const router = new VueRouter({
  mode: "hash",
  routes: routes
})

new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')
