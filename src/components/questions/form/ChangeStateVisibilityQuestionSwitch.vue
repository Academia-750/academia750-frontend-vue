<template>
  <v-switch
    v-model="dataStateQuestionVisibilityComputed"
    :label="textLabelSwitchVisibility"
    color="primary"
    hide-details
  ></v-switch>
</template>

<script>
export default {
  name: 'ChangeStateVisibilityQuestionSwitch',
  props: {
    questionId: {
      type: String,
      required: true
    },
    stateQuestionVisibility: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    dataStateQuestionVisibilityComputed: {
      get () {
        return this.stateQuestionVisibility
      },
      set (value) {
        this.$emit('emitStateQuestionVisibility',value)
      }
    },
    textLabelSwitchVisibility () {
      //const stateQuestionVisibilityInTextHuman = this.stateQuestionVisibility ? 'Si' : 'No'

      //return `¿Es visible? ${stateQuestionVisibilityInTextHuman}`

      return this.stateQuestionVisibility ? 'Si' : 'No'
    }
  }
}
</script>
