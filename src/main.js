import Vue from 'vue'
import App from './App.vue'

// VUEX - https://vuex.vuejs.org/
import store from './store'

// VUE-ROUTER - https://router.vuejs.org/
import router from './router'

// Helpers APP
import manageErrors from './helpers/manageErrors'
import manageLoading from './helpers/manageLoading'
import manageTokenAuth from '@/helpers/auth.js'
import { loadUserAuth } from '@/helpers/loadUserAuth'
import { hasPermissions } from '@/helpers/MenuPermissions'

// PLUGINS
import vuetify from './plugins/vuetify'
import i18n from './plugins/vue-i18n'
import './plugins/vue-google-maps'
import './plugins/vue-shortkey'
import './plugins/vue-head'
import './plugins/vue-gtag'
import './plugins/apexcharts'
import './plugins/echarts'
import './plugins/animate'
import './plugins/clipboard'
import './plugins/moment'

import '@/plugins/vue-sweetalert2'
import '@/plugins/vue-toastification'
import '@/plugins/vue-cryptojs'
import '@/plugins/vee-validate'
import '@/plugins/register-helpers'
import '@/plugins/register-modules'
import '@/plugins/register-mixins'
import '@/plugins/register-filters'
import '@/plugins/register-directives'

// FILTERS
import './filters/capitalize'
import './filters/lowercase'
import './filters/uppercase'
import './filters/formatCurrency'
import './filters/formatDate'

// STYLES
// Main Theme SCSS
import './assets/scss/theme.scss'

// Animation library - https://animate.style/
import 'animate.css/animate.min.css'

// Set this to false to prevent the production tip on Vue startup.
Vue.config.productionTip = false

Vue.$errorApp = manageErrors
Vue.prototype.$errorApp = manageErrors

Vue.$loadingApp = manageLoading
Vue.prototype.$loadingApp = manageLoading

Vue.$manageTokenAuth = manageTokenAuth
Vue.prototype.$manageTokenAuth = manageTokenAuth

Vue.$loadUserAuth = loadUserAuth
Vue.prototype.$loadUserAuth = loadUserAuth

loadUserAuth()

Vue.$can = hasPermissions
Vue.prototype.$can = hasPermissions

/*
|---------------------------------------------------------------------
| Main Vue Instance
|---------------------------------------------------------------------
|
| Render the vue application on the <div id="app"></div> in index.html
|
| https://vuejs.org/v2/guide/instance.html
|
*/
export default new Vue({
  i18n,
  vuetify,
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
