<template>
  <v-dialog
    v-model="showGraphStatisticsStudent"
    transition="dialog-bottom-transition"
    hide-overlay
    fullscreen
    class="overflow-auto"
  >
    <template>
      <v-card class="overflow-auto">
        <v-toolbar flat dark color="primary">
          <v-btn
            icon
            dark
            @click="showGraphStatisticsStudent = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Ver gráfica</v-toolbar-title>
        </v-toolbar>
        <graph-statistics-topics
          :array-counts-questions-correct="arrayCountsQuestionsCorrect"
          :array-counts-questions-wrong="arrayCountsQuestionsWrong"
          :array-counts-questions-unanswered="arrayCountsQuestionsUnanswered"
          :categories-topics="categoriesTopics"
        />
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import GraphStatisticsTopics from '@/modules/statistics/components/graphStatisticsTopics'

export default {
  name: 'GraphStatisticsTopicsDialog',
  components: {
    GraphStatisticsTopics
  },
  props: {
    arrayCountsQuestionsCorrect: {
      type: Array,
      required: true
    },
    arrayCountsQuestionsWrong: {
      type: Array,
      required: true
    },
    arrayCountsQuestionsUnanswered: {
      type: Array,
      required: true
    },
    categoriesTopics: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      showGraphStatisticsStudent: false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
