
import CrudYearRange from '../crud/src/crud-year-range';

/* istanbul ignore next */
CrudYearRange.install = function (Vue) {
    Vue.component(CrudYearRange.name, CrudYearRange);
};

export default CrudYearRange;