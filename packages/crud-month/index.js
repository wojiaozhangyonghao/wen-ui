
import CrudMonth from '../crud/src/crud-month';

/* istanbul ignore next */
CrudMonth.install = function (Vue) {
    Vue.component(CrudMonth.name, CrudMonth);
};

export default CrudMonth;