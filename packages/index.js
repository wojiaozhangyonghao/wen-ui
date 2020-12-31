/* eslint-disable */
import Crud from './crud/index.js'
// import CrudCheckbox from './crud-checkbox/index.js'
import CrudDate from './crud-date/index.js'
import CrudMonth from './crud-month/index.js'
import CrudYear from './crud-year/index.js'
import CrudDateRange from './crud-date-range/index.js'
import CrudYearRange from './crud-year-range/index.js'
import CrudTime from './crud-time/index.js'
import CrudInput from './crud-input/index.js'
// import CrudRadio from './crud-radio/index.js'
import CrudSelect from './crud-select/index.js'
// import CrudCascader from './crud-cascader/index.js'
import CrudNumberInput from './crud-input-number/index.js'
// import CrudUeditor from './crud-ueditor/index.js'
// import CrudSwitch from './crud-switch/index.js'
// import CrudRate from './crud-rate/index.js'
// import CrudUpload from './crud-upload/index.js'
// import CrudSilder from './crud-silder/index.js'
// import DataDisplay from './data-display/index.js'
// import DataCard from './data-card/index.js'
// import DataTabs from './data-tabs/index.js'
// import DataIcons from './data-icons/index.js'
// import DataBox from './data-box/index.js'
import Form from './form/index.js'
// import FormTabs from './form-tabs/index.js'
// import FormSteps from './form-steps/index.js'
// import FormDetail from './form-detail/index.js'
// import TableTree from './table-tree';
// import JxCommonInput from './jx-common-input/index.js';
// import JxFileUpload from './jx-file-upload/index.js';
// import JxOrgInput from './jx-org-input/index.js';
// import JxRoleInput from './jx-role-input/index.js';
// import JxExternalInput from './jx-external-input/index.js';
// import JxUserInput from './jx-user-input/index.js';
// import JxRoleUserInput from './jx-role-user-input/index.js';
// import JxDeptUserInput from './jx-dept-user-input/index.js';
// import JxComment from './jx-comment/index.js';
// import JxSelect2 from './jx-select2/index.js';
// import JxCronInput from './jx-cron-input/index.js';
// import JxFundInfoInput from './jx-fundinfo-input/index.js';
// import JxCrudDate from './jx-crud-date/crudDate';
// import JxCrudDateSearch from './jx-crud-date/crudDateSearch';
// import { vaildData } from './utils/util'
import './theme-chalk/src/common.scss'
const components = [
    Crud,
    Form,
//     FormTabs,
//     FormSteps,
//     FormDetail,
//     CrudCheckbox,
    CrudMonth,
    CrudYear,
    CrudYearRange,
    CrudDateRange,
    CrudDate,
    CrudTime,
    CrudInput,
//     CrudRadio,
    CrudSelect,
//     CrudCascader,
    CrudNumberInput,
//     CrudUeditor,
//     CrudSwitch,
//     CrudRate,
//     CrudUpload,
//     CrudSilder,
//     DataDisplay,
//     DataCard,
//     DataIcons,
//     DataTabs,
//     DataBox,
//     TableTree,
//     JxCommonInput,
//     JxFileUpload,
//     JxOrgInput,
//     JxRoleInput,
//     JxExternalInput,
//     JxUserInput,
//     JxRoleUserInput,
//     JxDeptUserInput,
//     JxComment,
//     JxSelect2,
//     JxCronInput,
//     JxFundInfoInput,
//     JxCrudDate,
//     JxCrudDateSearch
]
// const install = function(Vue, opts = {}) {
//     Vue.prototype.$http = window.axios;
//     Vue.prototype.vaildData = vaildData;
//     const AVUE = {
//         clientHeight: document.documentElement.clientHeight
//     };
//     components.map(component => {
//         Vue.component(component.name, component);
//     });

//     AVUE.size = opts.size || '';
//     Vue.prototype.$AVUE = AVUE;
// }

// if (typeof window !== 'undefined') {
//     if (!window.axios) {
//         console.error('You have to install axios')
//     } else if (!window.ELEMENT) {
//         console.error('You have to install element')
//     } else {
//         install(window.Vue);
//     }

// }
// export default function(Vue) {
//     Vue.prototype.$http = window.axios;
//     components.map(component => {
//         Vue.component(component.name, component);
//     });
//   };
const install = function(Vue, opts = {}) {
    Vue.prototype.$http = window.axios;
    components.forEach(component => {
     Vue.component(component.name, component);
    });
   }
   if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
   }
export default{
    // version: '2.0.0',
    install,
    Crud,
    // Form,
    // FormTabs,
    // FormSteps,
    // FormDetail,
    // CrudCheckbox,
    CrudMonth,
    CrudYear,
    CrudYearRange,
    CrudDateRange,
    CrudDate,
    CrudTime,
    // CrudInput,
    // CrudRadio,
    CrudSelect,
    // CrudCascader,
    CrudNumberInput,
    // CrudUeditor,
    // CrudSwitch,
    // CrudRate,
    // CrudUpload,
    // CrudSilder,
    // DataDisplay,
    // DataCard,
    // DataIcons,
    // DataTabs,
    // DataBox,
    // TableTree,
    // JxCommonInput,
    // JxFileUpload,
    // JxOrgInput,
    // JxRoleInput,
    // JxExternalInput,
    // JxUserInput,
    // JxRoleUserInput,
    // JxDeptUserInput,
    // JxComment,
    // JxSelect2,
    // JxCronInput,
    // JxFundInfoInput,
    // JxCrudDate,
    // JxCrudDateSearch
}
