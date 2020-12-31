import AvueCurdInput from './src/crud-input';
import AvueCrud from './src/main';
import AvueCurdSelect from './src/crud-secect';
import AvueCurdDate from './src/crud-date';
const components = [
  AvueCurdInput,
  AvueCrud,
  AvueCurdSelect,
  AvueCurdDate
]
/* istanbul ignore next */
export default function(Vue) {
  components.map(component => {
      Vue.component(component.name, component);
  });
};

  
export {
  AvueCurdInput,
  AvueCrud,
  AvueCurdSelect,
  AvueCurdDate
};