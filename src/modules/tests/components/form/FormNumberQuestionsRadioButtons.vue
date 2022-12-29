<template>
  <ValidationProvider
    v-slot="{ errors }"
    tag="div"
    class="d-flex justify-center"
    :vid="vid"
    mode="aggressive"
    name="Numero de preguntas"
    :rules="rules"
  >
    <v-radio-group
      v-model="numberQuestionsTest"
      active-class="blue lighten-4"
      :error-messages="errors"
      :disabled="isDisabled"
      row
    >
      <v-radio
        value="25"
      >
        <template #label>
          <span class="title font-weight-bold py-1">25</span>
        </template>
      </v-radio>
      <v-radio
        value="50"
      >
        <template #label>
          <span class="title font-weight-bold py-1">50</span>
        </template>
      </v-radio>
      <v-radio
        value="100"
      >
        <template #label>
          <span class="title font-weight-bold py-1">100</span>
        </template>
      </v-radio>
    </v-radio-group>
    <v-radio
      value="120"
    >
      <template #label>
        <span class="title font-weight-bold py-1">120</span>
      </template>
    </v-radio>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'FormNumberQuestionsRadioButtons',
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
      numberQuestionsTest: null
    }
  },
  watch: {
    numberQuestionsTest(value) {
      this.$emit('NumberQuestionsTestBinding', value)
    }
  }
}
</script>
