<template>
<div>
    <viewer :images="images">
        <img v-for="item in images" :src="item.src" :key="item.index" width="100%" style="height:198px" />
    </viewer>

</div>
</template>
 
 
<script>
  import Vue from 'vue';
  import Viewer from 'v-viewer'
  import 'viewerjs/dist/viewer.css'
  Vue.use(Viewer);
  Viewer.setDefaults({
      'inline':false,//启用 inline 模式
      'button':true, //右上角按钮
      "navbar": false, //底部缩略图
      "title": false, //当前图片标题
      "toolbar": true, //底部工具栏
      "tooltip": true, //显示缩放百分比
      "movable": true, //是否可以移动
      "zoomable": true, //是否可以缩放
      "rotatable": true, //是否可旋转
      "scalable": true, //是否可翻转
      "transition": true, //使用 CSS3 过度
      "fullscreen": true, //播放时是否全屏
      "keyboard": true, //是否支持键盘
      "url": "data-source",
      ready: function (e) {
        console.log(e.type,'组件以初始化');
      },
      show: function (e) {
        console.log(e.type,'图片显示开始');
      },
      shown: function (e) {
        console.log(e.type,'图片显示结束');
      },
      hide: function (e) {
        console.log(e.type,'图片隐藏完成');
      },
      hidden: function (e) {
        console.log(e.type,'图片隐藏结束');
      },
      view: function (e) {
        console.log(e.type,'视图开始');
      },
      viewed: function (e) {
        console.log(e.type,'视图结束');
      },
      zoom: function (e) {
        console.log(e.type,'图片缩放开始');
      },
      zoomed: function (e) {
        console.log(e.type,'图片缩放结束');
      }
    });
 
export default {
     name: "imgview",
  props: {
    imgUrl:String,//预览传进来的图片地址，这里因为项目中已经定型了，所以传一个string进来，然后手动转 array
  },
  watch: {
    //传来的图片地址
    imgUrl(val){
      this.changeArr(val);
    }
  },
  data () {
    return {
      isShow:false,//是否展示预览弹框
      images:[
          // {src:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3272199364,3404297250&fm=26&gp=0.jpg',index:1},
          // {src:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3267295166,2381808815&fm=26&gp=0.jpg',index:2},
          // {src:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3429654663,2972188411&fm=26&gp=0.jpg',index:3},
          // {src:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3597323878,2962972725&fm=26&gp=0.jpg',index:4},
        ]
    };
  },
 
  components: {},
 
  computed: {},
 
  created() {},
 
  mounted() {
    this.changeArr(this.imgUrl);
  },
 
  methods: {
    /**转格式 */
    changeArr(url){
      if(url == undefined){
        return;
      }
      let str = {
        src : url,
        index : 1,
      }
      let arr = [];
          arr.push(str);
      this.images = arr;
    }
  },
 
}
 
</script>
<style lang='scss' scoped>
 
</style>