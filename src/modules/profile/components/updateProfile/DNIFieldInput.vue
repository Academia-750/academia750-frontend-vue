<template>
  <v-text-field
    id="__dni_person"
    ref="dni-field"
    v-model="dni"
    name="__dni"
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
      dni: ''
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
