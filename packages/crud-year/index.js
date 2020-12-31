
import CrudYear from '../crud/src/crud-year';

/* istanbul ignore next */
CrudYear.install = function (Vue) {
    Vue.component(CrudYear.name, CrudYear);
};

export default CrudYear;