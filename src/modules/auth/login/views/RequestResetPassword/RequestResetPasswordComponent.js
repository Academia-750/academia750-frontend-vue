import loginActionsMixins from '../../resources/loginActionsMixin'
import components from './component/components'
import data from './component/data'
import methods from './component/methods'
import computed from './component/computed'

export default {
  mixins: [
    loginActionsMixins,
    data,
    methods,
    computed,
    components
  ],
  head: {
    title: {
      inner: 'Olvidé mi contraseña'
    }
  }
}
