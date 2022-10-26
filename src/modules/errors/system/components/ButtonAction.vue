<template>
  <v-btn
    class="my-3"
    :block="isBlockStyle"
    :color="colorButton"
    :small="isBreakpointMobileSmall"
    :normal="!isBreakpointMobileSmall"
    @click="executeAction"
  >
    {{ textButton }}
  </v-btn>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'ButtonAction',
  props: {
    href: {
      type: String,
      default: '/'
    },
    isBlockStyle: {
      type: Boolean,
      default: false
    },
    colorButton: {
      type: String,
      default: 'primary'
    },
    textButton: {
      type: String,
      default: 'Regresar al Inicio'
    }
  },
  computed: {
    isBreakpointMobileSmall() {
      return this.$vuetify.breakpoint.width < 600
    }
  },
  methods: {
    ...mapMutations('errorsService', ['set_response_error']),
    executeAction() {
      this.set_response_error(null)
      this.$router.push(this.href)
    }
  }
}
</script>