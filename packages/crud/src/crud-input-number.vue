<template>
  <a-input-number v-model="text"
                   class="avue-input-number"
                   @change="handleChange"
                   :precision="precision"
                   :size="size"
                   :min="minRows"
                   :max="maxRows"
                   :label="placeholder?placeholder:`请输入${label}`"
                   :disabled="disabled"></a-input-number>
</template>

<script>
import crudCompoents from "../../mixins/crud-compoents.js";
export default {
  name: "AvueCrudInputNumber",
  mixins: [crudCompoents()],
  data () {
    return {};
  },
  props: {
    value: {
      type: Number,
    },
    step: {
      type: Number,
      default: 1
    },
    precision: {
      type: Number,
      default: 0
    },
    minRows: {
      type: Number,
      default: -Infinity
    },
    maxRows: {
      type: Number,
      default: Infinity
    },
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

<style>
</style>
