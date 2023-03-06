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
  mounted () {
    //console.log(this.$refs['access-key-field'])
    if (this.$refs['access-key-field']) {
      this.$refs['access-key-field']?.focus()
    }
  },
  head: {
    title: {
      inner: 'Iniciar sesion'
    }
  }
}
