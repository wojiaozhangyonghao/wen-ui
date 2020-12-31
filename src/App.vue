<template>
  <div id="app">
     <a-config-provider :locale="locale">
      <router-view class="middle"></router-view>
  </a-config-provider>
  </div>
</template>

<script>
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn')
export default {
   data() {
    return {
      locale: zhCN,
    }
  },
  name: "App",
  components: {}
};
</script>

<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
  'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
  'Noto Color Emoji';;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  
  background-color:white;
  height: 100%;
}
.middle{
  color: #2c3e50;
  /*width:80%;*/
  margin:0 auto;
  height: 100%;
}
</style>
