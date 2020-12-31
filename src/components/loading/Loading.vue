<template>
  <div>
    <a-modal :width=500 :title="value.title" :visible="value.showloading" footer :closable="false" :maskClosable='false'>
      <a-progress style='padding:24px' :percent="100" status="active" :showInfo="false" />
      <div class='title'>{{value.content}}</div>
    </a-modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showloading: false,
      content: "",
      title: ""
    };
  },
  props: ["value"]
};
</script>
<style scoped>

.title {
  text-align: center;
  font-size:18px;
}
</style>