import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2'

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css'

const options = {
  confirmButtonColor: '#0096c7',
  cancelButtonColor: '#829099'
}

Vue.use(VueSweetalert2, options)
