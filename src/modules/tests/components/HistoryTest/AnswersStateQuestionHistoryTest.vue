<template>
  <v-container>
    <div v-for="(answer, index) in answers" :key="index">
      <answer-item-history-test
        :index="index"
        :answer-correct="getCorrectAnswer"
        :answer="answer"
        :question-history="getQuestionHistory"
      />
    </div>
  </v-container>
</template>

<script>
import AnswerItemHistoryTest from './AnswerItemHistoryTest'
export default {
  name: 'AnswersStateQuestionHistoryTest',
  components: {
    AnswerItemHistoryTest
  },
  props: {
    question: {
      type: Object,
      required: true
    },
    answers: {
      type: Array,
      required: true
    },
    questionsDataHistory: {
      type: Array,
      required: true
    }
  },
  computed: {
    answersWithIndexComputed() {
      const indexAnswers = ['a)', 'b)', 'c)', 'd)']

      indexAnswers.slice(0, this.answers.length)

      return this.answers.map((answer, i) => {
        return (this.answers[i]['index-answer'] = indexAnswers[i])
      })
    },
    getQuestionHistory() {
      return this.questionsDataHistory.find(
        (questionHistory) =>
          questionHistory.question_id === this.question.attributes.id
      )
    },
    getCorrectAnswer() {
      return this.answers.find(
        (answerHistory) => answerHistory.attributes.is_correct_answer === 'yes'
      )
    }
  }
}
</script>
