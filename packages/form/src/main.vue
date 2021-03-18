<template>
  <div class="from">
    <a-form-model  
    class="ant-advanced-search-form" 
              ref="form"
             :model="form"
             :label-align="option.labelPosition"
             :label-col="option.labelCol || { span: 4 }"
             :rules="formRules">
      <a-row :gutter="20" :span="24">
        <template v-for="(column,index) in option.column">
          <div :class="{'avue-row':column.row}"  :key="index" v-if="vaildVisdiplay(column) && !column.groupName">
            <a-col :span="column.span || 12">
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
                           :valueFormat="column.valueFormat"
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
          <div v-else :key="column.dataIndex">
            <a-col :span="24" v-if="column.groupName">
          <div class="title-bar">
              <div class="title-icon"></div>
              <div class="title-name">{{column.groupName}}</div>
              <div class="line"></div>
          </div>
            </a-col>
          <div :class="{'avue-row':column.row}"     v-for="(column1,index) in column.children" :key="column.dataIndex">
            <a-col :span="column1.span || 12">
              <a-form-model-item :label="column1.title"
                            :prop="column1.dataIndex"
                            :label-col="column1.labelCol || { span: 4 }">
                <slot :value="form[column1.dataIndex]"
                      :column="column1"
                      :dic="setDic(column1.dicData,DIC[column1.dicData])"
                      :name="column1.dataIndex"
                      v-if="column1.formsolt"></slot>
                <component :is="getComponent(column1)"
                           v-else
                           :props="column1.props || option.props"
                           :id="column1.dataIndex"
                           v-model="form[column1.dataIndex]"
                           :precision="column1.precision"
                           :multiple="column1.multiple"
                           :placeholder="column1.placeholder"
                           :step="column1.step"
                           :range="column1.range"
                           :showStops="column1.showStops"
                           :showInput="column1.showInput"
                           :controls-position="column1.controlsPosition"
                           :expand-trigger="column1.expandTrigger"
                           :size="column1.size"
                           :colors="column1.colors"
                           :action="column1.action"
                           :limit="column1.limit"
                           :tip="column1.tip"
                           :listType="column1.listType"
                           :drag="column1.drag"
                           :showFileList="column1.showFileList"
                           :iconClasses="column1.iconClasses"
                           :voidIconClass="column1.voidIconClass"
                           :showText="column1.showText"
                           :texts="column1.texts"
                           :showSearch="column1.showSearch"
                           :separator="column1.separator"
                           :border="column1.border"
                           :editable="column1.editable"
                           :minlength="column1.minlength"
                           :maxlength="column1.maxlength"
                           :prefix="column1.prefix"
                           :suffix="column1.suffix"
                           :pickerOptions="column1.pickerOptions"
                           :defaultTime="column1.defaultTime"
                           :min="column1.min"
                           :max="column1.max"
                           :changeoOnSelect="column1.changeOnSelect"
                           :label="column1.title"
                           :allowClear="column1.allowClear"
                           :startPlaceholder="column1.startPlaceholder"
                           :endPlaceholder="column1.endPlaceholder"
                           :type="column1.type"
                           :minRows="column1.minRows"
                           :maxRows="column1.maxRows"
                           :format="column1.format"
                           :formatTooltip="column1.formatTooltip"
                           :valueFormat="column1.valueFormat"
                           :url="column1.url"
                           :subPackage="column1.subPackage"
                           :query="column1.query"
                           :dic="setDic(column1.dicData,DIC[column1.dicData])"
                           :disabled="vaildDisabled(column1)"
                           :showAllLevels = "column.showAllLevels"
                           @change="formChange(index)"></component>
              </a-form-model-item>
            </a-col>
             
          </div>
          <!-- <a-divider dashed /> -->
            <!-- </a-col> -->
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
    console.log(this.value,'valuevaluevaluevalue')
    console.log(this.form,'formform')
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
.title-bar {
  display: flex;
  align-items: center;
  margin: 10px 0;
  .title-icon {
    height: 20px;
    width: 10px;
    background: #3032A4;
    margin-right: 10px;
  }
  .title-name {
    margin-right:24px;
    font-size: 16px;
  }
  .line {
    flex: 1;
    height: 1px;
    background: #ebedf0;
  }
  .control{
    margin:0 12px;
    button{
      margin:0 4px;
    }
  }
}
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
