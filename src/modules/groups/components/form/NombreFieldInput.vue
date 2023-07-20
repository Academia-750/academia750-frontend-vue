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
      v-model="value"
      name="__group_name"
      :error-messages="errors"
      label="Nombre"
      :filled="isFilled"
      required
      clearable
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
    value: {
      type: String,
      default: ''
    },
    isFilled: {
      type: Boolean,
      default: true
    }
  }
}
</script>
