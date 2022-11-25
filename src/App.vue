<template>
  <v-app>
    <!-- Layout component -->
    <template v-if="responseError">
      <transition name="scale" mode="out-in">
        <handle-errors :error-response="responseError"/>
      </transition>
    </template>
    <template v-else>
      <progress-linear-loading-app />
      <component :is="currentLayout" v-if="isRouterLoaded">
        <transition name="scale" mode="out-in">
          <router-view :key="$route.path" />
        </transition>
      </component>
    </template>

    <v-snackbar v-model="toast.show" :timeout="toast.timeout" :color="toast.color" bottom>
      {{ toast.message }}
      <v-btn v-if="toast.timeout === 0" color="white" text @click="toast.show = false">{{ $t('common.close') }}</v-btn>
    </v-snackbar>

    <!-- Demo customization menu -->
    <!-- <customization-menu /> -->
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

// Demo Menu
import CustomizationMenu from './components/demo/CustomizationMenu'

import config from './configs'

// Layouts
import defaultLayout from './layouts/DefaultLayout'
import landingLayout from './layouts/LandingLayout'
import simpleLayout from './layouts/SimpleLayout'
import authLayout from './layouts/AuthLayout'
import errorLayout from './layouts/ErrorLayout'
import handleErrors from '@/modules/errors/system/views/handleErrors.vue'
import ProgressLinearLoadingApp from '@/modules/loading/components/ProgressLinearLoadingApp.vue'

/*
|---------------------------------------------------------------------
| Main Application Component
|---------------------------------------------------------------------
|
| In charge of choosing the layout according to the router metadata
|
*/
export default {
  components: {
    CustomizationMenu,
    defaultLayout,
    landingLayout,
    simpleLayout,
    authLayout,
    errorLayout,
    handleErrors,
    ProgressLinearLoadingApp
  },
  computed: {
    ...mapState('app', ['toast']),
    ...mapState('errorsService', ['responseError']),
    isRouterLoaded: function() {
      if (this.$route.name !== null) return true

      return false
    },
    currentLayout: function() {
      const layout = this.$route.meta.layout || 'default'

      return layout + 'Layout'
    }
  }

}
</script>

<style scoped>
/**
 * Transition animation between pages
 */
/* .fade-enter-active,
.fade-leave-active {
  transition-duration: 0.2s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
} */
.scale-enter-active,
.scale-leave-active {
  transition: all 0.5s ease;
}
.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.v-progress-linear {
  -moz-transform: scale(1, -1);
  -webkit-transform: scale(1, -1);
  -o-transform: scale(1, -1);
  -ms-transform: scale(1, -1);
  transform: scale(1, -1);
}

.v-toolbar__extension {
  padding: 0px !important;
}
</style>
