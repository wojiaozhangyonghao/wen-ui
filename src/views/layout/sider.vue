<template>
  <div>
    <div class="logo">{{time}}</div>
     <a-menu theme="dark" v-model="current" @click="aLink" mode="inline">
    <!--  <a-menu-item key="/search">
        <router-link to="/search">
          <a-icon type="search" />
          <span>查询</span>
        </router-link>
      </a-menu-item>
      <a-menu-item key="/upload">
        <router-link to="/upload">
          <a-icon type="upload" />
          <span>导入</span>
        </router-link>
      </a-menu-item>-->
       <a-sub-menu key="sub1">
            <span slot="title"><a-icon type="appstore" />zb价格卡片管理</span>
           <a-menu-item key="/search">
        <router-link to="/search">
          <a-icon type="search" />
          <span>价格卡片查询</span>
        </router-link>
      </a-menu-item>
      <!-- <a-menu-item key="/upload">
        <router-link to="/upload">
          <a-icon type="upload" />
          <span>价格卡片导入</span>
        </router-link>
      </a-menu-item> -->
          </a-sub-menu>
    </a-menu> 
  </div>
</template>
<script>
export default {
  name: "sider",
  data() {
    return {
      current: ["/search"],
      //  current: [],
      time: ""
    };
  },
  mounted() {
    this.currentTime();
  },
  beforeDestroy: function() {
    if (this.getTime) {
      clearInterval(this.getTime); // 在Vue实例销毁前，清除时间定时器
    }
  },
  methods: {
    currentTime() {
      setInterval(this.getTime, 1000);
      this.clear();
    },
    getTime() {
      let date = new Date();
      let year = date.getFullYear(); //获取当前年份
      let month =
        new Date().getMonth() + 1 < 10
          ? "0" + (new Date().getMonth() + 1)
          : new Date().getMonth() + 1;
      let da =
        new Date().getDate() < 10
          ? "0" + new Date().getDate()
          : new Date().getDate();
      let h =  new Date().getHours() < 10
          ? "0" + new Date().getHours()
          : new Date().getHours();//获取小时
      let m =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      let s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      this.time =
        year +
        "年" +
        " " +
        month +
        "月" +
        " " +
        da +
        "日" +
        "\xa0\xa0\xa0\xa0\xa0" +
        h +
        ":" +
        m +
        ":" +
        s;
    },
    clear() {
      clearInterval(this.getTime);
      this.getTime = null;
    },
    aLink() {
      //   console.log(this.current, "ll");
      //   this.$router.push({ path: this.current[0] });
    }
  }
};
</script>
<style lang="scss" scoped>
.logo {
  background-color: #20242d;
  color: #ffffff;
  height: 30px;
  line-height: 30px;
  text-align: center;
}
</style>