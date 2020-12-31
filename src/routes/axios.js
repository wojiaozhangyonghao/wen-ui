/**
 *
 * http配置
 *
 */

import axios from 'axios'
// import store from '../store'
// import router from './routes';
// import { getToken } from '@/util/auth';
// import { Notification, MessageBox, Message } from 'ant-design-vue'
// import {  Modal } from 'ant-design-vue'
import { isNullOrUndefined } from 'util';
//超时时间
axios.defaults.timeout = 610000;
//跨域请求，允许保存cookie
axios.defaults.withCredentials = true;

//HTTPrequest拦截
axios.interceptors.request.use(config => {
	// console.log(config,'config')
	// if (store.getters.access_token) {
	// 	config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
	// }
	config.headers['token'] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzZXNzaW9uSWQiOiIyZDUwYmUwYi1hZDhmLTQxNzMtYjE3Ny1lYWYzMDAwY2NlNzgiLCJleHAiOjE2MDkzMTAxNTF9.o871JKKpZQO9x9YX-SNOqcze1JW_lMejVUJg_6wQeOw'
  if(!/^\/file\//.exec(config.url)){
	if(process.env.NODE_ENV !== 'production'){
		config.url = "/api" + config.url
	}  
  }
	return config
}, error => {
	return Promise.reject(error)
})
//HTTPresponse拦截
axios.interceptors.response.use(data => {
	return data
}, error => {   
	// console.log(error,'error')
	if(error.response){
		let err = error.response.data.message;
		if(err == 'invalid_token'){
			// store.dispatch("LogOut").then(() => {
			// 	router.replace({ path: "/login" });
			// });
			return;
		}else if(err === 'invalid_grant'){
			// Notification({
			// 	message: error.response.data.error_description,
			// 	type: 'error'
			// });
			return;
		}
	}
	// let errMsg = error.toString();
	let message = null;
	if(error.response.data.error === 'unauthorized'){
		message = error.response.data.error_description;
    // Message({
    //   showClose: true,
    //   message: '用户名或密码输入有误',
    //   type: 'error',
    //   duration: 5000
	// });
    return;
	}else if(isNullOrUndefined(error.response.data.message)){
		var data = error.response.data;
		var code = data.code;
		if(code === -1){
			message = data.msg;
		}else{
			message = '不好意思，系统开了个小差，请联系管理员叫醒！';
		}
	}else{
		var msg = error.response.data.message.split(":");
		message = msg.length === 2 ? msg[1] : msg[0];
		if(message === 'GENERAL'){
			message = '最近业务繁忙，服务器休息一会，请联系管理员处理！';
		}
	}
	// Modal.error({
	// 	centered:true,
    //     title: '',
    //     content: '不好意思，系统开了个小差，请联系管理员叫醒！',
    //   });
	// MessageBox.alert(message, '提示', {
	// 	confirmButtonText: '确定',
	// 	cancelButtonText: '取消',
	// 	type: 'warning'
	// });

	return Promise.reject(error);
})

export default axios
