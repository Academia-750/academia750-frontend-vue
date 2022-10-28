<template>
  <v-text-field
    ref="dni-field"
    readonly
    label="DNI / NIE"
    filled
  >
    <template v-slot:prepend>
      <v-icon class="d-none d-sm-none d-md-block">
        mdi-card-account-details
      </v-icon>
    </template>
  </v-text-field>
</template>

<script>
export default {
  name: 'UpdateProfileDNIField',
  props: {
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  },
  watch: {
  },
  methods: {
    resetAccessKey() {
      this.access_key = ''
    },
    onFocusAccesKeyField() {
      this.$refs['access-key-field']['focus']()
    },
    onBlurAccesKeyField() {
      this.$refs['access-key-field']['blur']()
    }
  }
}
</script>
