<template>

  <a-select v-model="text"
             :size="size"
             :mode="multiple"
             :allowClear="allowClear"
             :placeholder="placeholder?placeholder:`请选择${label}`"
             @change="handleChange"
             :disabled="disabled"
             :filter-option="filterOption"
             option-filter-prop="children"
             :showSearch="showSearch"
             >
    <a-select-option v-for="(item,index) in dic"
               :key="index"
               :value="item[idKey]" >{{item[labelKey]}}
    </a-select-option>
  </a-select>
</template>

<script>
import crudCompoents from "../../mixins/crud-compoents.js";
export default {
  name: "AvueCrudSelect",
  mixins: [crudCompoents()],
  data () {
    return {};
  },
  props: {
    showSearch:{
      type: Boolean,
      default: false
    },
    value: {
    },
    multiple: {
      type: String,
      default: 'default'
    },
    url:{
      type: String,
      default: ''
    }
  },
  watch: {
    value: function(n, o) {
      if(this.value){
        if(this.multiple == 'multiple'){
          this.text = this.value
        }else {
          this.text = String(this.value);
        }
      }else{
        this.text = this.value;
      }
    }
  },
  created () {
    console.log(this.dic,'dic')
     console.log(this.idKey,this.labelKey,'labelKey')
    if(this.value){
      if(this.multiple == 'multiple'){
        this.text = this.value
      }else {
        this.text = String(this.value);
      }
    }else{
      this.text = this.value || undefined;
    }
  },
  mounted () { },
  methods: {
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    },
    handleChange (value) {
      console.log(typeof this.text,'this.text11')
      console.log(value,'value')
      this.$emit("input", value);
      this.$emit("change", value);
    }
  }
};
</script>

<style>
</style>




