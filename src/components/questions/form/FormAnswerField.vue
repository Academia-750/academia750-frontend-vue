<template>
  <div>
    <v-checkbox
      v-model="is_grouper_answer"
      :disabled="disableCheckbox"
      color="blue darken-1"
      :label="is_grouper_answer_label"
    ></v-checkbox>
    <ValidationProvider
      v-slot="{ errors }"
      tag="div"
      :vid="vid"
      mode="aggressive"
      :name="nameFieldValidate"
      :rules="rules"
      class="d-flex justify-center flex-column flex-lg-row"
    >
      <v-text-field
        :ref="refTextField"
        v-model="answer_value"
        :counter="255"
        :label="label"
        :placeholder="placeholder"
        :error-messages="errors"
        :disabled="disableField"
        filled
        required
        clearable
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
    disableCheckbox: {
      type: Boolean,
      default: false
    },
    rules: {
      type: [Object, String],
      required: true
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
    }
  },
  data() {
    return {
      answer_id: null,
      answer_value: '',
      is_correct_answer: false,
      is_grouper_answer: false
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
    }
  },
  watch: {
    answer_value(value) {
      this.$emit('AnswerValueBinding', value)
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
