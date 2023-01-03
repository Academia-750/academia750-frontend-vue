import Cookies from 'js-cookie'
import router from '@/router'
//import Vue from 'vue'

export default {
  redirectToHomePageAfterLogout: function () {
    /* const URL_HOME = process.env.VUE_APP_BASE_URL_HOME */
    // https://bomberos750.carlos-herrera.es

    /* window.location.href = `${URL_HOME}?s-id=${AUTH_SESSION_ID}&p-id${AUTH_KEEP_PERSISTENT_ID}` */

    //router.currentRoute.name !== 'home-website'

    /* this.$swal.fire({
      icon: 'success',
      toast: true,
      title: '¡Bienvenido!',
      timer: 3000
    }) */

    if (router.currentRoute.name !== 'home-website') {
      router.push({
        name: 'home-website'
      })
    }

  }
}
