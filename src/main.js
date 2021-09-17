/*
 * @Author: zyh
 * @Date: 2020-12-28 10:11:17
 * @LastEditors: zyh
 * @LastEditTime: 2021-09-17 09:51:28
 * @Description: file content
 */
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
import pageForm from '@/components/avue-form/page-form'
Vue.component('pageForm', pageForm)
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
