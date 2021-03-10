<template>
  <a-date-picker :type="type"
                  :value="text"
                  :size="size"
                  :format="format"
                  :valueFormat="valueFormat"
                  :placeholder="placeholder?placeholder:`请输入${label}`"
                  @change="handleChange"
                  :disabled="disabled"> </a-date-picker>
</template>

<script>
import crudCompoents from "../../mixins/crud-compoents.js";
export default {
  name: "AvueCrudDate",
  mixins: [crudCompoents()],
  data () {
    return {
      temp:false,
      text: null
    };
  },
  props: {
    value: {
    },
    startPlaceholder: {
      type: String,
      default: '开始日期'
    },
    endPlaceholder: {
      type: String,
      default: '结束日期',
    },
    defaultTime: {
      type: String,
    },
    pickerOptions: {
      type: Object,
      default: () => { }
    },
    type: {
      default: "date"
    },
    valueFormat: {
    },
    format: {
    }
  },
  watch: {
    text: function(n, o) {
      console.log(n, o,'n, o,,,')
      this.text = this.value || null;
        }
  },
  created () { 
    console.log(this.valueFormat,'valueFormatvalueFormatvalueFormat')
    this.text = this.value || null;
  },
  mounted () { },
  methods: {
    handleChange (value,valueString) {
      console.log(value,valueString,'lll')
      this.$emit("input", value);
      this.$emit("change", value);
    }
  }
};
</script>

<style>
</style>
