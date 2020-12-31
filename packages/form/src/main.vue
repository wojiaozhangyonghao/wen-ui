<template>
  <div class="from">
             <!-- :label-width="setPx(option.labelWidth,80)" -->
    <a-form-model  
              class="ant-advanced-search-form" 
              ref="form"
             :model="form"
             :label-align="option.labelPosition"
             :label-col="option.labelCol || { span: 4 }"
             :rules="formRules">
      <a-row :gutter="20" :span="24">
        <template v-for="(column,index) in option.column">
          <div :class="{'avue-row':column.row}"  :key="index" v-if="vaildVisdiplay(column)">
            <a-col :span="column.span||12">
              <a-form-model-item :label="column.title"
                            :prop="column.dataIndex"
                            :label-col="column.labelCol || { span: 4 }">
                <slot :value="form[column.dataIndex]"
                      :column="column"
                      :dic="setDic(column.dicData,DIC[column.dicData])"
                      :name="column.dataIndex"
                      v-if="column.formsolt"></slot>
                <component :is="getComponent(column)"
                           v-else
                           :props="column.props || option.props"
                           :id="column.dataIndex"
                           v-model="form[column.dataIndex]"
                           :precision="column.precision"
                           :multiple="column.multiple"
                           :placeholder="column.placeholder"
                           :step="column.step"
                           :range="column.range"
                           :showStops="column.showStops"
                           :showInput="column.showInput"
                           :controls-position="column.controlsPosition"
                           :expand-trigger="column.expandTrigger"
                           :size="column.size"
                           :colors="column.colors"
                           :action="column.action"
                           :limit="column.limit"
                           :tip="column.tip"
                           :listType="column.listType"
                           :drag="column.drag"
                           :showFileList="column.showFileList"
                           :iconClasses="column.iconClasses"
                           :voidIconClass="column.voidIconClass"
                           :showText="column.showText"
                           :texts="column.texts"
                           :showSearch="column.showSearch"
                           :separator="column.separator"
                           :border="column.border"
                           :editable="column.editable"
                           :minlength="column.minlength"
                           :maxlength="column.maxlength"
                           :prefix="column.prefix"
                           :suffix="column.suffix"
                           :pickerOptions="column.pickerOptions"
                           :defaultTime="column.defaultTime"
                           :min="column.min"
                           :max="column.max"
                           :changeoOnSelect="column.changeOnSelect"
                           :label="column.title"
                           :allowClear="column.allowClear"
                           :startPlaceholder="column.startPlaceholder"
                           :endPlaceholder="column.endPlaceholder"
                           :type="column.type"
                           :minRows="column.minRows"
                           :maxRows="column.maxRows"
                           :format="column.format"
                           :formatTooltip="column.formatTooltip"
                           :value-format="column.valueFormat"
                           :url="column.url"
                           :subPackage="column.subPackage"
                           :query="column.query"
                           :dic="setDic(column.dicData,DIC[column.dicData])"
                           :disabled="vaildDisabled(column)"
                           :showAllLevels = "column.showAllLevels"
                           @change="formChange(index)"></component>
                <!-- <p class="avue-tip">{{column.tip}}</p> -->
              </a-form-model-item>
            </a-col>
          </div>
          <a-col style="margin-bottom: 10px" :span="24"  :key="index" v-if="vaildData(column.groupLine,false)">
            <div style="height:5px;border-bottom: 2px #eeeeee dashed;">
            </div>
          </a-col>
        </template>
        <slot name="contentForm"></slot>
        <a-col :span="24" v-if="vaildData(option.menuBtn,true)">
          <a-form-model-item  :label-width="menuWidth">
            <div class="form-menu"
                 :class="menuPostion">
              <a-button type="primary"
                         @click="submit"
                         v-if="vaildData(option.submitBtn,true)">{{vaildData(option.submitText,'提交')}}</a-button>
              <slot name="menuForm"></slot>
            </div>
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
  </div>
</template>

<script>
import crud from "../../mixins/crud";
import { validatenull } from "../../utils/validate.js";
export default {
  name: "AvueForm",
  mixins: [crud()],
  components: {},
  data () {
    return {
      first: true,
      form: {},
      formRules: {}
    };
  },
  created () {
  },
  mounted () {
  },
  computed: {
    menuWidth: function () {
      if (this.option.submitPostion === 'left') {
        return '';
      } else {
        return '0'
      }
    },
    menuPostion: function () {
      if (this.option.submitPostion) {
        return "is-" + this.option.submitPostion;
      } else {
        return "is-center";
      }
    },
    boxType: function () {
      return this.option.boxType;
    }
  },
  props: {
    value: {
      type: Object,
      required: true,
      default: {}
    }
  },
  methods: {
    // 表单是否禁止
    vaildDisabled (column) {
      if (!(this.boxType)) {
        return column.disabled || false;
      } else if (this.boxType === 'add') {
        return (this.vaildData(column.addDisabled, false) || this.vaildData(column.disabled, false))
      } else if (this.boxType === 'edit') {
        return (this.vaildData(column.editDisabled, false) || this.vaildData(column.disabled, false))
      } else if (this.boxType === 'view') {
        return true
      }
    },
    //表单是否显隐
    vaildVisdiplay (column) {
      if (!(this.boxType)) {
        return column.visdiplay || true;
      } else if (this.boxType === 'add') {
        return (this.vaildData(column.addVisdiplay, true) && this.vaildData(column.visible, true))
      } else if (this.boxType === 'edit') {
        return (this.vaildData(column.editVisdiplay, true) && this.vaildData(column.visible, true))
      } else if (this.boxType === 'view') {
        return (this.vaildData(column.viewVisdiplay, true) && this.vaildData(column.visible, true))
      }
    },
    rulesInit () {
      this.formRules = {};
      this.option.column.forEach(ele => {
        if (ele.rules) this.formRules[ele.dataIndex] = ele.rules;
      });
    },
    change (index) {
      const column = this.option.column;
      const list = column[index].cascader;
      const prop = column[index].dataIndex;
      const url = column[index + 1].dicUrl;
      const type = column[index + 1].dicData;
      if (!this.first) {
        list.forEach((ele) => {
          this.form[ele] = '';
          this.DIC[ele] = [];
        })
      }
      this.GetDicByType(url.replace('{{key}}', this.form[dataIndex])).then(res => {
        let data = res;
        this.DIC[type] = data;
        this.DIC = Object.assign({}, this.DIC);
      });
      this.$emit("form-change", this.form);
    },
    formChange(index){
      const column = this.option.column;
      if(column[index].cascader){
        this.change(index);
      }

      this.$emit("form-change", this.form);
    },
    formInit () {
      const column = this.option.column
      this.form = this.formInitVal(column).tableForm;
      this.formVal();
      for (let i = 0; i < this.option.column.length; i++) {
        const ele = this.option.column[i];
        if (ele.cascaderFirst && ele.type == 'select') {
          const cascader = [].concat(ele.cascader)
          const cascaderLen = ele.cascader.length - 1;
          if (!validatenull(this.form[ele.dataIndex])) this.change(i);
          for (let j = 0; j < cascaderLen; j++) {
            const cindex = i + (j + 1);
            const cele = this.option.column[cindex];
            cele.cascader = cascader.slice(cindex);
            if (!validatenull(this.form[cele.dataIndex])) this.change(cindex);
          }
        }
      }
      this.first = false;
    },
    formVal () {
      for (let o in this.value) {
        this.form[o] = this.value[o];
      }
      this.$emit("input", this.form);
    },
    clearValidate () {
      this.$refs["form"].clearValidate();
    },
    validate () {
      return new Promise((resolve, reject) => {
        this.$refs["form"].validate(valid => {
          if (valid) {
            resolve(true);
          } else {
            reject(false);
          }
        });
      })
    },
    resetForm () {
      this.$refs.form.resetFields();

    },
    submit () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$emit("submit", this.form);
        }
      });
    }
  }
};
</script>

<style lang="scss">
.ant-advanced-search-form .ant-form-item {
  display: flex;
}

.ant-advanced-search-form .ant-form-item-control-wrapper {
  flex: 1;
}

.from {
  padding: 8px 10px;
}
.from {
  .el-checkbox  {
    margin-left: 20px;
  }
}
.form-menu {
  width: 100%;
  &.is-center {
    text-align: center;
  }
  &.is-left {
    text-align: left;
  }
  &.is-right {
    text-align: right;
  }
}
</style>
