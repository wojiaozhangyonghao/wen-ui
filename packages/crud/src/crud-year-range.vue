<template>
  <a-range-picker :type="type"
                  v-model="text"
                  :size="size"
                   show-time
                  :mode="mode"
                  :format="format"
                  :valueFormat="valueFormat"
                  :placeholder="['开始年度', '结束年度']"
                  @openChange="openChangeOne"
                  @panelChange="handlePanelChange"
                  :disabled="disabled"> </a-range-picker>
                  <!-- @change="handleChange" -->
</template>

<script>
import crudCompoents from "../../mixins/crud-compoents.js";
export default {
  name: "AvueCrudYearRange",
  mixins: [crudCompoents()],
  data () {
    return {
      temp:false,
      text: undefined,
      mode:['year', 'year'],
      yearShowOne:false
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
     handlePanelChange(value) {
       console.log(value,'value,mode')
              this.$emit("input", value);
              this.$emit("change", value);
                this.yearShowOne = false
            },
            openChangeOne(status) {
              console.log(status)
                if (status) {
                    this.yearShowOne = true
                }
            },
    // handleChange (value,valueString) {
    //   console.log(value,valueString,'lll')
    //    this.$emit("input", value);
    //   this.$emit("change", value);
    // }
  }
};
</script>

<style>
</style>
