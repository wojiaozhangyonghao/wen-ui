/* eslint-disable */
import {
    validatenull
} from './validate'

/**
 * 根据字典的value显示label
 */

export const findByvalue = (dic, value, props) => {
  // console.log(dic, value, props,'dic, value, props')
  props = props || {};
  const labelKey = props.label || 'label';
  const idKey = props.id || 'id';
  const childrenKey = props.children || 'children';
  let result = '';
  if (validatenull(dic)) return value;
  if (typeof(value) === 'string' || typeof(value) === 'number' || typeof(value) === 'boolean') {
    let index = 0;
    index = findArray(dic, value, idKey);
    if (index !== -1) {
      result = (dic[index][labelKey]);
    } else {
      result = value;
    }
  } else if (value instanceof Array && dic[0][childrenKey]) {
    let index = 0;
    let count = 0
    while (count < value.length) {
      index = findArray(dic, value[count]);
      if (!validatenull(dic[index])) {
        result = result + dic[index][labelKey] + '/';
        dic = dic[index][childrenKey];
      }
      count++;
    }
    if (result.length > 0) {
      result = result.substr(0, result.length - 1);
    }
  } else if (value instanceof Array) {
    result = [];
    let index = 0;
    value.forEach(ele => {
      index = findArray(dic, ele);
      if (index !== -1) {
        result.push(dic[index][labelKey]);
      } else {
        result.push(ele);
      }
    });
    result = result.toString();
  }
  // console.log(result,'result1')
  return result;
}
/**
 * 根据字典的value查找对应的index
 */
export const findArray = (dic, value, idKey) => {
  idKey = idKey || 'id'
  for (let i = 0; i < dic.length; i++) {
    if (String(dic[i][idKey]) === String(value)) {
      return i;
      break;
    }
  }
  return -1;
}
/**
 * 获取字典
 */
export const setDic = (dicData, DIC) => {
  return (typeof(dicData) === 'string') ? DIC : dicData
}
/**
 * 设置px
 */
export const setPx = (val, defval) => {
  if (validatenull(val)) {
    val = defval;
  }
  val = val + '';
  if (val.indexOf('%') === -1) {
    val = val + 'px';
  }
  return val;
}

/**
 * 表格初始化值
 */

export const formInitVal = (list) => {
  let tableForm = {}
  let searchForm = {}
  list.forEach(ele => {
    if (
      ele.type === 'checkbox' ||
      ele.type === 'cascader' ||
      ele.type === 'dates' ||
      (ele.type === 'select' && ele.multiple) ||
      ele.type === 'upload' ||
      ele.multiple ||
      ele.range  ||
      ele.type === 'file' ||
      ele.type === 'org' ||
      ele.type === 'role' ||
      ele.type === 'external' ||
      ele.type === 'user' ||
      ele.type === 'roleUser' ||
      ele.type === 'deptUser' ||
      ele.type === 'select2'  ||
      ele.type === 'fundinfo'
    ) {
        tableForm[ele.dataIndex] = []
        if (ele.search) searchForm[ele.dataIndex] = []
    } else if (ele.type === 'number' || ele.type === 'rate' || ele.type === 'silder') {
        tableForm[ele.dataIndex] = 0
        if (ele.search) {
            searchForm[ele.dataIndex] = 0
        }
    } else {
      if(ele.dataIndex){
        tableForm[ele.dataIndex] = ''
      }
        if (ele.search) {
            searchForm[ele.dataIndex] = ''
        }
    }
    if (!validatenull(ele.valueDefault)) tableForm[ele.dataIndex] = ele.valueDefault
    if (!validatenull(ele.searchDefault)) searchForm[ele.dataIndex] = ele.searchDefault
  })
  return {
      tableForm,
      searchForm
  }
}

/**
 * 搜索框获取动态组件
 */
export const getSearchType = (column) => {
  let type = column.type
  if (type === "select" || type === 'radio' || type === 'checkbox') {
      return "crudSelect";
  } else if (type === "time") {
      return "crudTime";
  } else if (type === 'dates'
  || type === "date"
  || type === "datetime"
  || type === 'datetimerange') {
    return "crudDate";
  }else if (type === 'dateRange'){
    return "crudDateRange";
  } else if (type === 'month'){
    return "crudMonth";
  }else if (type === 'week'){
    return "crudWeek";
  }else if (type === 'year'){
    return "crudYear";
  }else if (type === 'yearRange'){
    return "crudYearRange";
  }else if (type === 'jxDate'){
    return "jxCrudDateSearch"
  }else if (type === 'cascader') {
    return "crudCascader";
  } else if (type === 'number') {
    return "crudInputNumber";
  } else if (
    type === 'file' ||
    type === 'org' ||
    type === 'role' ||
    type === 'external' ||
    type === 'user' ||
    type === 'roleUser' ||
    type === 'deptUser' ||
    type === 'fundinfo') {
    return "jxCommonInput";
  } else if(type === 'select2'){
      return "jxSelect2";
  }else if(type === 'jxCalendar'){
    return "jxCalendar";
  } else {
    return "crudInput";
  }
};

/**
 * 动态获取组件
 */
export const getComponent = (column) => {
  let type = column.type
  if (type === "select") {
        return "crudSelect";
    } else if (type === "radio") {
        return "crudRadio";
    } else if (type === "checkbox") {
        return "crudCheckbox";
    } else if (type === "time") {
        return "crudTime";
    } else if (type === 'dates'
      || type === 'date'
      || type === 'datetime'
      || type === 'datetimerange') {
        return "crudDate";
    } else if (type === 'dateRange'){
      return "crudDateRange";
    } else if ( type === 'jxDate') {
      return "jxCrudDate";
    }else if (type === 'month'){
      return "crudMonth";
    }else if (type === 'week'){
      return "crudWeek";
    }else if (type === 'year'){
      return "crudYear";
    }else if (type === 'yearRange'){
      return "crudYearRange";
    }else if (type === 'cascader') {
        return "crudCascader";
    } else if (type === 'number') {
        return "crudInputNumber";
    } else if (type === 'ueditor') {
        return "crudUeditor";
    } else if (type === 'password') {
        return "crudInput";
    } else if (type === 'switch') {
        return "crudSwitch";
    } else if (type === 'rate') {
        return "crudRate";
    } else if (type === 'upload') {
        return "jxFileUpload";
    } else if (type === 'silder') {
        return "crudSilder";
    } else if (type === 'file') {
        return "jxFileUpload";
    } else if (type === 'org') {
        return "jxOrgInput";
    } else if (type === 'role') {
        return "jxRoleInput";
    } else if (type === 'external') {
        return "jxExternalInput";
    } else if (type === 'user') {
      return "jxUserInput";
    } else if (type === 'roleUser') {
      return "jxRoleUserInput";
    } else if (type === 'deptUser') {
      return "jxDeptUserInput";
    } else if (type === 'comment') {
      return "jxComment";
    } else if (type === 'select2') {
      return "jxSelect2";
    } else if (type === 'cron'){
      return 'jxCronInput';
    } else if (type === 'fundinfo'){
      return 'jxFundInfoInput';
    } else {
       return "crudInput";
    }
};

export const vaildData = (val, _default) => {
  if (typeof val === "boolean") {
    return val;
  }
  return !validatenull(val) ? val : _default;
}
/* eslint-enable */
