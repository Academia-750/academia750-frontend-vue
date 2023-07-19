<template>
  <ValidationProvider
    v-slot="{ errors }"
    vid="code"
    mode="aggressive"
    name="Codigo"
    :rules="rules"
  >
    <v-text-field
      id="__group_code"
      ref="code-group-field"
      v-model="code_group"
      class="mx-3"
      max-width="330"
      name="__group_code"
      :error-messages="errors"
      :disabled="isDisabled"
      label="Código"
      :filled="isFilled"
      :solo="isSolo"
      required
      clearable
      @keyup.enter="$emit('submitForm')"
    />
  </ValidationProvider>
</template>

<script>
export default {
  name: 'CodigoFieldInput',
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
      code_group: ''
    }
  },
  watch: {
    code_group(value) {
      this.$emit('NamePersonBinding', value)
    }
  },
  methods: {
    resetAccessKey() {
      this.code_group = ''
    },
    onFocusAccesKeyField() {
      this.$refs['code-group-field']['focus']()
    },
    onBlurAccesKeyField() {
      this.$refs['code-group-field']['blur']()
    }
  }
}
</script>
