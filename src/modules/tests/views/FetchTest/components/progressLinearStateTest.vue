<template>
  <v-container style="position: relative !important;">
    <div class="d-flex justify-center mb-1 font-weight-bold"><span>Progreso del Test</span></div>
    <v-progress-linear
      v-model="progressResolvedQuestionOfTest"
      color="light-green lighten-2"
      height="30"
      rounded
    >
      <template v-slot:default>
        <strong>{{ progressResolvedQuestionOfTest }}%</strong>
      </template>

    </v-progress-linear>
    <v-overlay absolute z-index="1" opacity="0">
      <!-- Contenido de la capa -->
    </v-overlay>
  </v-container>
</template>

<script>
export default {
  name: 'ProgressLinearStateTest',
  props: {
    numberQuestionsResolved: {
      type: [Number, String],
      required: true
    },
    totalNumberQuestionsTest: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      progressResolvedQuestionOfTest: 0,
      isFixedMenu: false
    }
  },
  watch: {
    numberQuestionsResolved: {
      handler () {
        this.calculateValueProgressQuestionsTest()
        //console.log(this.numberQuestionsResolved)
      },
      deep: true
    },
    totalNumberQuestionsTest: {
      handler () {
        this.calculateValueProgressQuestionsTest()
        //console.log(this.totalNumberQuestionsTest)
      },
      deep: true
    }
  },
  mounted() {
    this.calculateValueProgressQuestionsTest()
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.isFixedMenu = window.scrollY >= 100
    },
    calculateValueProgressQuestionsTest() {
      /* console.log({
        total: this.totalNumberQuestionsTest,
        progress: this.numberQuestionsResolved
      }) */

      if (this.totalNumberQuestionsTest === 0 && this.numberQuestionsResolved === 0) {
        this.progressResolvedQuestionOfTest = 0

        return
      }

      if (this.totalNumberQuestionsTest < this.numberQuestionsResolved) {
        this.progressResolvedQuestionOfTest = 0

        return
      }

      this.progressResolvedQuestionOfTest = Math.ceil((this.numberQuestionsResolved / this.totalNumberQuestionsTest) * 100)
    }
  }
}
</script>

<style scope>
  .mode-normal-text-progress {
    writing-mode: vertical-lr;
  }
</style>
