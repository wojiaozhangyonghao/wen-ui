<template>
  <div>
    <a-input :size="size"
              :allowClear="allowClear"
              v-model="text"
              :type="typeParam"
              :max-length="maxlength"
              :autoSize="{ minRows: minRows, maxRows: maxRows}"
              :prefix="prefix"
              :suffix="suffix"
              :placeholder="placeholder?placeholder:`请输入${label}`"
              @change="handleChange"
              :disabled="disabled"/>
    <!-- <el-input v-else
              :size="size"
              v-model="labelShow"
              :type="typeParam"
              :autosize="{ minRows: minRows, maxRows: maxRows}"
              :prefix-icon="prefixIcon"
              :suffix-icon="suffixIcon"
              :placeholder="placeholder?placeholder:`请选择${label}`"
              @change="handleChange"
              :disabled="disabled"
              :readonly="true"
              @click.native="disabled?'':open()" />
    <el-dialog :visible.sync="box"
               append-to-body
               :title="`请选择${label}`"
               width="50%">
      <div class="avue-dialog">
        <el-tree :data="dic"
                 :node-key="idKey"
                 :show-checkbox="multiple"
                 :props="props"
                 @check="checkChange"
                 :default-expanded-keys="multiple?text:[]"
                 :default-checked-keys="multiple?text:[]"
                 @node-click="handleNodeClick"></el-tree>
      </div>

    </el-dialog> -->
  </div>
</template>

<script>
import { findByvalue } from '../../utils/util'
import crudCompoents from "../../mixins/crud-compoents.js";
import { validatenull } from '../../utils/validate';
export default {
  name: "AvueCrudInput",
  mixins: [crudCompoents()],
  data () {
    return {
      text:'',
      box: false,
      labelText: this.multiple ? [] : '',
    };
  },
  props: {
    value: {
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    prefix: {
      type: String,
    },
    suffix: {
      type: String,
    },
    maxlength: {
      type: Number,
    },
    minRows: {
      type: Number,
      default: 3
    },
    maxRows: {
      type: Number,
      default: 4
    },
    isSearch: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value () {
      this.init();
    }
  },
  computed: {
    labelShow () {
      return this.multiple ? this.labelText.join('/').toString() : this.labelText
    },
    typeParam: function () {
      if (this.type == "textarea" && !this.isSearch) {
        return "textarea";
      } else if (this.type == "password") {
        return "password";
      } else {
        return "text";
      }
    }
  },
  created () {},
  mounted () {
    this.init();
  },
  methods: {
    checkChange (checkedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys) {
      this.text = [];
      this.labelText = [];
      checkedKeys.checkedNodes.forEach(node => {
        if (validatenull(node[this.childrenKey])) {
          this.text.push(node[this.idKey]);
          this.labelText.push(node[this.labelKey])
        }
      })
      this.$emit("input", this.text);
      this.$emit("change", this.text);
    },
    open () {
      this.box = true;
    },
    init () {
      if (this.type === 'tree') {
        if (this.multiple) {
          this.labelText = ['获取字典中...']
        } else {
          this.labelText = '获取字典中...'
        }
        const check = setInterval(() => {
          if (!validatenull(this.dic)) {
            if (this.multiple) {
              this.labelText = [];
              this.text.forEach(ele => {
                this.findLabelNode(this.dic, ele, this.props);
              })
            } else {
              this.labelText = this.text;
              this.findLabelNode(this.dic, this.text, this.props)
            }
            // this.disabledParentNode(this.dic);
            clearInterval(check);
          }
        }, 500)
      }
    },
    findLabelNode (dic, value, props) {
      const labelKey = props.label || 'label';
      const idKey = props.value || 'id';
      const childrenKey = props.children || 'children';
      dic.forEach(ele => {
        const children = ele[childrenKey];
        if (ele[idKey] === value) {
          const label = ele[labelKey]
          this.multiple ? this.labelText.push(label) : this.labelText = label;
        } else if (!validatenull(children)) {
          this.findLabelNode(children, value, props);
        }
      })
    },
    disabledParentNode (dic) {
      dic.forEach(ele => {
        const children = ele[this.childrenKey];
        if (!validatenull(children)) {
          ele.disabled = true;
          this.disabledParentNode(children);
        }
      });
    },
    handleNodeClick (data) {
      if (validatenull(data[this.childrenKey]) && !this.multiple) {
        this.box = false;
        const value = data[this.idKey];
        const label = data[this.labelKey];
        this.text = value;
        this.labelText = label;
        this.$emit("input", value);
        this.$emit("change", value);
      }

    },
    handleChange (value) {
      this.$emit("input", this.text);
      this.$emit("change", this.text);
    }
  }
};
</script>

<style>
</style>
