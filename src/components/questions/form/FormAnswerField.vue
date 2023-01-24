<template>
  <div>
    <v-checkbox
      v-show="!forbiddenGrouperAnswer"
      v-model="is_grouper_answer"
      :disabled="isDisabledCheckGrouperAnswer"
      color="blue darken-1"
      :label="is_grouper_answer_label"
      :readonly="readonlyCheckbox"
    ></v-checkbox>
    <ValidationProvider
      v-slot="{ errors }"
      tag="div"
      :vid="vid"
      mode="aggressive"
      :name="nameFieldValidate"
      :rules="rulesTextFieldAnswer"
      class="d-flex justify-center flex-column flex-lg-row"
    >
      <v-text-field
        :ref="refTextField"
        v-model="answer_value"
        :label="label"
        :placeholder="placeholder"
        :error-messages="errors"
        :disabled="disableField"
        :readonly="readonlyField"
        filled
        required
        :clearable="clearable"
        @keyup.enter="$emit('submitForm')"
      >
        <template v-slot:prepend>
          <v-icon class="d-none d-sm-none d-md-block">
            mdi-text-box-check
          </v-icon>
        </template>
      </v-text-field>
    </ValidationProvider>
  </div>
</template>

<script>
export default {
  name: 'FormAnswerField',
  props: {
    disableField: {
      type: Boolean,
      default: false
    },
    uuid: {
      type: String,
      required: true
    },
    rules: {
      type: [Object, String],
      required: true
    },
    clearable: {
      type: Boolean,
      default: true
    },
    readonlyField: {
      type: Boolean,
      default: false
    },
    readonlyCheckbox: {
      type: Boolean,
      default: false
    },
    vid: {
      type: String,
      required: true
    },
    nameFieldValidate: {
      type: String,
      required: true
    },
    refTextField: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    correctAnswer: {
      type: Boolean,
      default: false
    },
    answerGrouperSelected: {
      type: String,
      required: true
    },
    forbiddenGrouperAnswer: {
      type: Boolean,
      default: false
    },
    isQuestionBinary: {
      type: Boolean,
      default: false
    },
    isRequiredAnswer: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      answer_id: null,
      answer_value: '',
      is_correct_answer: false,
      is_grouper_answer: false,
      isDisabledCheckGrouperAnswer: false
    }
  },
  computed: {
    is_grouper_answer_label () {
      const answer = this.is_grouper_answer ? 'Si' : 'No'

      /* if (this.$vuetify.breakpoint.width > 1264) {
        return `Es Agrupadora: ${answer}`
      }
 */
      //return `Es Agrupadora ${this.label}: ${answer}`
      return `Es Agrupadora: ${answer}`
    },
    rulesTextFieldAnswer () {
      return this.isRequiredAnswer ? this.rules : ''
    }
  },
  watch: {
    answer_value(value) {
      this.$emit('AnswerValueBinding', value)
    },
    answerGrouperSelected () {
      if (!this.answerGrouperSelected) {
        this.isDisabledCheckGrouperAnswer = false

        return
      }

      if (this.answerGrouperSelected === this.uuid) {
        this.isDisabledCheckGrouperAnswer = false

        return
      }

      this.isDisabledCheckGrouperAnswer = true
    },
    is_grouper_answer (value) {
      this.$emit('AnswerIsGrouperValueBinding', {
        value,
        uuid: this.uuid
      })
    },
    correctAnswer(value) {
      this.is_correct_answer = value
    }
  },
  methods: {
    onFocusAccesKeyField() {
      this.$refs[this.refTextField]['focus']()
    },
    onBlurAccesKeyField() {
      this.$refs[this.refTextField]['blur']()
    }
  }
}
</script>
