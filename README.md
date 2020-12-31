
# vue-web-ui-ant
---
>一个基于vue-ant-design的二次封装

### 特点
- 快速构建增删改以及查询条件页面

### 安装与基本用法
```
$ npm install --save vue-web-ui-ant
```
全局注册
```
import Vue from 'vue'
import vueWebUiAnt from 'vue-web-ui-ant'

Vue.component('vue-web-ui-ant', vueWebUiAnt)
```
你现在就可以使用该组件了
```
<template>
  <div id="app">
    <avue-crud
      v-model="formObj"
      :option="tableOption"
      :data="data"
      ref="crud"
    >
    </avue-crud>
  </div>
</template>

<script>
</script>
```
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```
