<template>
  <ValidationProvider
    v-slot="{ errors }"
    vid="group-name"
    mode="aggressive"
    name="Nombre"
    :rules="rules"
  >
    <v-text-field
      id="__group_name"
      ref="name-group-field"
      v-model="name_group"
      name="__group_name"
      :error-messages="errors"
      :disabled="isDisabled"
      label="Nombre"
      :filled="isFilled"
      :solo="isSolo"
      required
      clearable
      @keyup.enter="$emit('submitForm')"
    >
      <template v-if="hasPrependIcon" v-slot:prepend>
        <v-icon class="d-none d-sm-none d-md-block"> mdi-account-group </v-icon>
      </template>
    </v-text-field>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'NombreFieldInput',
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
      name_group: ''
    }
  },
  watch: {
    name_group(value) {
      this.$emit('NamePersonBinding', value)
    }
  },
  methods: {
    resetAccessKey() {
      this.name_group = ''
    },
    onFocusAccesKeyField() {
      this.$refs['name-group-field']['focus']()
    },
    onBlurAccesKeyField() {
      this.$refs['name-group-field']['blur']()
    }
  }
}
</script>
