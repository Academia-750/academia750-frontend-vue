<template>
  <ValidationProvider
    ref="validationProvider"
    v-slot="{ errors }"
    mode="aggressive"
    :name="label"
  >
    <v-switch
      v-model="active"
      :error-messages="errors"
      :label="label"
      @click="activate(active)"
    ></v-switch>
  </ValidationProvider>
</template>
  
  <script>
  export default {
    name: 'SwitchInput',
    props: {
      active: {
        type: Boolean,
        default: false
      },
      label: {
        type: String,
        default: 'active'
      }
    },
    methods: {
      activate(active) {
        this.$emit('activate', active)
      }
    }
  }
  </script>
