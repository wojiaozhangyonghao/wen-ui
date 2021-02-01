import AvueForm from './page-form';

/* istanbul ignore next */
AvueForm.install = function (Vue) {
    Vue.component(AvueForm.name, AvueForm);
};

export default AvueForm;