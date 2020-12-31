<template>
  <a-time-picker v-model="text"
                  type="date"
                  :size="size"
                  :format="format"
                  use12-hours
                  :value-format="valueFormat"
                  :placeholder="placeholder?placeholder:`请输入${label}`"
                  @change="handleChange"
                  :disabled="disabled"> </a-time-picker>
</template>

<script>
import crudCompoents from "../../mixins/crud-compoents.js";
export default {
  name: "AvueCrudTime",
  mixins: [crudCompoents()],
  data () {
    return {};
  },
  props: {
    value: {
      required: true
    },
    valueFormat: {
      default: ""
    },
    format: {
      default: ""
    }
  },
  watch: {},
  created () { },
  mounted () { },
  methods: {
    handleChange (value) {
      this.$emit("input", value);
      this.$emit("change", value);
    }
  }
};
</script>

<style scoped>
</style>

