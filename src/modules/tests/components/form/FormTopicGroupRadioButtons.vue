<template>
  <ValidationProvider
    v-slot="{ errors }"
    tag="div"
    class="d-flex justify-center"
    :vid="vid"
    mode="aggressive"
    name="Grupo de tema"
    :rules="rules"
  >
    <v-radio-group
      v-model="topicGroup"
      active-class="blue lighten-4"
      :error-messages="errors"
      :disabled="isDisabled"
      row
    >
      <v-radio
        value="Legislación"
      >
        <template #label>
          <span class="title font-weight-bold py-1">Legislación</span>
        </template>
      </v-radio>
      <v-radio
        value="Genérico"
      >
        <template #label>
          <span class="title font-weight-bold py-1">Genérico</span>
        </template>
      </v-radio>
      <v-radio
        value="Específico"
      >
        <template #label>
          <span class="title font-weight-bold py-1">Específico</span>
        </template>
      </v-radio>
    </v-radio-group>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'FormTopicGroupRadioButtons',
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
      topicGroup: null
    }
  },
  watch: {
    topicGroup(value) {
      this.$emit('TopicGroupTestBinding', value)
    }
  }
}
</script>
