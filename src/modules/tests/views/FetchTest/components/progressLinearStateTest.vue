<template>
  <div style="width: 60% !important; height: auto !important;">
    <!-- <pre>
      {{ fetchTestModuleNumberQuestionsResolved }}
    </pre>
    <pre>
      {{ fetchTestModuleTotalNumberQuestionsTest }}
    </pre> -->
    <!-- <div class="d-flex justify-center mb-1 font-weight-bold"><span>Progreso del Test</span></div> -->
    <div>
      <v-progress-linear
        v-model="progressResolvedQuestionOfTest"
        color="light-green lighten-2"
        height="30"
        rounded
        style="z-index: 0 !important;"
      >
        <template v-slot:default>
          <strong>{{ progressResolvedQuestionOfTest }}%</strong>
        </template>

      </v-progress-linear>
      <v-overlay absolute z-index="1" opacity="0">
        <!-- Contenido de la capa -->
      </v-overlay>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

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
  computed: {
    ...mapState('testsService', ['fetchTestModuleNumberQuestionsResolved', 'fetchTestModuleTotalNumberQuestionsTest'])
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
