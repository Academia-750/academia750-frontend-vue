<template>
  <ValidationProvider
    v-slot="{ errors }"
    vid="phone"
    mode="aggressive"
    name="Teléfono"
    :rules="rules"
  >
    <v-text-field
      ref="phone-field"
      v-model="phone"
      :error-messages="errors"
      :disabled="isDisabled"
      label="Teléfono"
      :filled="isFilled"
      :solo="isSolo"
      required
      clearable
      @keyup.enter="$emit('submitForm')"
    >
      <template v-if="hasPrependIcon" v-slot:prepend>
        <v-icon class="d-none d-sm-none d-md-block">
          mdi-phone
        </v-icon>
      </template>
    </v-text-field>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'NamePersonFieldInput',
  props: {
    isDisabled: {
      type: Boolean,
      default: false
    },
    rules: {
      type: [Object, String],
      required: true
    },
    isFilled: {
      type: Boolean,
      default: true
    },
    isSolo: {
      type: Boolean,
      default: false
    },
    hasPrependIcon: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      phone: ''
    }
  },
  watch: {
    phone(value) {
      this.$emit('PhoneBinding', value)
    }
  },
  methods: {
    resetAccessKey() {
      this.name_person = ''
    },
    onFocusAccesKeyField() {
      this.$refs['phone-field']['focus']()
    },
    onBlurAccesKeyField() {
      this.$refs['phone-field']['blur']()
    }
  }
}
</script>
