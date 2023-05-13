<template>
  <ValidationProvider
    v-slot="{ errors }"
    vid="claim_text"
    mode="aggressive"
    name="Motivo de impugnación"
    :rules="rules"
  >
    <v-textarea
      ref="claim-text-field"
      v-model="claim_text"
      :disabled="isDisabled"
      label="Motivo de impugnación"
      placeholder="Escribe el motivo de impugnación"
      :error-messages="errors"
      filled
      name="input-7-4"
    ></v-textarea>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'ClaimFieldCardMemory',
  props: {
    isDisabled: {
      type: Boolean,
      default: false
    },
    rules: {
      type: [Object, String],
      required: true
    }
  },
  data() {
    return {
      claim_text: ''
    }
  },
  watch: {
    claim_text(value) {
      this.$emit('ClaimTextBinding', value)
    }
  },
  methods: {
    resetAccessKey() {
      this.claim_text = ''
    }
  }
}
</script>
