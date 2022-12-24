<template>
  <ValidationProvider
    v-slot="{ errors }"
    tag="div"
    class="d-flex justify-center"
    :vid="vid"
    mode="aggressive"
    name="Tipo de test"
    :rules="rules"
  >
    <v-radio-group
      v-model="typeTest"
      active-class="blue lighten-4"
      :error-messages="errors"
      :disabled="isDisabled"
      row
    >
      <v-radio
        value="test"
      >
        <template #label>
          <span class="title font-weight-bold py-1">Examen</span>
        </template>
      </v-radio>
      <v-radio
        value="card_memory"
      >
        <template #label>
          <span class="title font-weight-bold py-1">Tarjeta de memoria</span>
        </template>
      </v-radio>
    </v-radio-group>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'FormTypeTestRadioButtons',
  props: {
    vid: {
      type: String,
      required: true
    },
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
      typeTest: null
    }
  },
  watch: {
    typeTest(value) {
      this.$emit('TypeTestBinding', value)
    }
  }
}
</script>
