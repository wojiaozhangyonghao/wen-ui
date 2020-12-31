
import CrudDataRange from '../crud/src/crud-date-range';

/* istanbul ignore next */
CrudDataRange.install = function (Vue) {
    Vue.component(CrudDataRange.name, CrudDataRange);
};

export default CrudDataRange;