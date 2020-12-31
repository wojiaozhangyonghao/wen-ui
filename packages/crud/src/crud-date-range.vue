<template>
  <a-range-picker :type="type"
                  v-model="text"
                  :size="size"
                  :format="format"
                  :placeholder="['开始日期', '结束日期']"
                  @change="handleChange"
                  :disabled="disabled"> </a-range-picker>
</template>

<script>
import crudCompoents from "../../mixins/crud-compoents.js";
export default {
  name: "AvueCrudDateRange",
  mixins: [crudCompoents()],
  data () {
    return {
      temp:false,
      text: undefined
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
      this.text = this.value || undefined;
        }
  },
  created () { 
    this.text = this.value || undefined;
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
