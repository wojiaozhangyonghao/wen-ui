import header from './header.vue'
header.install = function (Vue) {
    Vue.component(header.name, header);
  };
  
  export default header;