<template>
  <section>
    <a-layout>
      <a-layout-header
        :style="{  height: '50px', position: 'fixed',top:0,zIndex: 1, width: '100%'}"
      >
        <headers></headers>
      </a-layout-header>
      <a-layout class="viewOuter">
        <a-layout-sider style="min-width: 246px!important;">
          <sider />
        </a-layout-sider>
        <a-layout-content style="margin: 0 20px">
          <section class="viewContent" :style="{ marginLeft: '246px' , marginTop: '50px' }">
            <router-view></router-view>
          </section>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </section>
</template>
<script>
import sider from "./sider";
export default {
  components: {
    sider
  }
};
</script>
<style lang="scss" scoped>
.viewOuter {
  margin: 0;
  // padding:16px;
  min-height: calc(100% - 50px);
}
</style>