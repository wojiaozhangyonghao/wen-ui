<template>
  <div class="headerOuter">
    <div class="logo">
      <div style=" height:36px;width:110px;">
        <img style="display:block;" src="@/assets/logo.png" />
      </div>
      <div class="title-box">
        <div>zb价格管理</div>
      </div>
    </div>
    <div class="user">
      <div class="pic">
        <!-- <img src="@/assets/Koala.jpg" alt /> -->
          <a-icon
          type="user"
          style="font-size:20px;color:#99b6c9;"
        />
      </div>
      <div style="margin-right:100px;">admin用户</div>
      <div>
        <a-icon
          type="poweroff"
          @click="exit"
          style="font-size:18px;color:#99b6c9;margin-right:15px;cursor:pointer"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "headers",
  data() {
    return {};
  },
  mounted() {},
  methods: {
    aLink: function() {},
    exit() {
      // this.$router.push({
      //   path: "/"
      // });
      console.log("pp");
    },
    handleChangeUser(value) {
      // 切换用户 用户存到localstorage中
      if (localStorage.getItem("user") != value) {
        localStorage.setItem("user", value);
        location.reload();
      }
    }
  }
};
</script>
<style lang='scss'>
.ant-layout-header {
  background: #25628e;
  height: 50px;
  padding: 0;
  line-height: 50px;
  display: flex;
  align-items: center;
}
.headerOuter {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo {
    width: 280px;
    height: 36px;
    margin-left: 14px;
    font-size: 20px;
    font-weight: 600;
    display: flex;
    align-items: center;
    .title-box {
      color: #fff !important;
      line-height: normal;
      display: flex;
      align-items: center;
      margin-left: 14px;
    }
  }
  .user {
    color: #99b6c9;
    display: flex;
    align-items: center;
    .pic {
      width: 25px;
      height: 25px;
      overflow: hidden;
      border: 2px solid #99b6c9;
      line-height: 25px;
         text-align: center;
         cursor:pointer;
      border-radius: 50%;
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
      margin-right: 17px;
      // img {
      //   cursor: pointer;
      //   width: 100%;
      //   display: block;
      //   // border: 1px solid #ffd300;
      //   border-radius: 50%;
      //   -webkit-border-radius: 50%;
      //   -moz-border-radius: 50%;
      //   height: 100%;
      // }
    }
  }
  .ant-select-selection {
    background: #25628e;
    // border: 1px solid rgb(197, 192, 192);
    border: none;
    color: #fff;
  }
}
</style>