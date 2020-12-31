import axios from 'axios';
// 响应拦截器
axios.interceptors.response.use(res => res.data, err => Promise.reject(err));

const searchList = () => axios.get("http://192.168.12.42:7000/display/getSearchKeyword ");
const fetchList = () => axios.post("http://192.168.12.42:7000/display/getInfoByMultiParams");
const detail = () => axios.get("http://192.168.12.42:7000/display/getInfoByIdOrParentId");
const exportExcel = () => axios.post("http://192.168.12.42:7000/import/importFromExcel ");
export {
searchList,
fetchList,
exportExcel,
detail
};