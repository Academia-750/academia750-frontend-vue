<template>
  <v-card class="mb-4">
    <v-card-title>Clasificación</v-card-title>
    <v-card-text>
      <div v-if="loading" class="text-center py-4">
        <v-progress-circular
          :size="40"
          :width="4"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </div>
      <div v-else-if="error" class="text-center py-4">
        <v-alert type="error" dense>
          {{ error }}
        </v-alert>
      </div>
      <div
        v-else-if="!rankingData || displayedRanking.length === 0"
        class="text--secondary text-center py-4"
      >
        No hay clasificación disponible aún
      </div>
      <v-list v-else dense>
        <template v-for="(item, index) in displayedRanking">
          <v-list-item
            v-if="item.type === 'entry'"
            :key="`entry-${item.result.id}`"
            :class="{ 'font-weight-bold': item.isCurrentUser }"
            :style="item.isCurrentUser ? { backgroundColor: '#f5f5f5' } : {}"
          >
            <v-list-item-avatar size="32" class="mr-2">
              <v-icon
                v-if="item.result.position === 1"
                color="amber darken-1"
                size="28"
              >
                mdi-trophy
              </v-icon>
              <v-icon
                v-else-if="item.result.position === 2"
                color="grey darken-1"
                size="28"
              >
                mdi-trophy
              </v-icon>
              <v-icon
                v-else-if="item.result.position === 3"
                color="orange darken-2"
                size="28"
              >
                mdi-trophy
              </v-icon>
              <span v-else class="text-body-2">{{ item.result.position }}</span>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title
                :class="{
                  'font-weight-bold': item.isCurrentUser,
                  'primary--text': item.isCurrentUser
                }"
                :style="
                  item.isCurrentUser
                    ? { fontSize: '1rem', fontWeight: '700' }
                    : {}
                "
              >
                {{ getUserName(item.result.user) }}
              </v-list-item-title>
              <v-list-item-subtitle>
                Nota: {{ formatMark(item.result.mark) }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            v-else-if="item.type === 'ellipsis'"
            :key="`ellipsis-${index}`"
          >
            <v-list-item-avatar size="32" class="mr-2">
              <span class="text-body-2">{{ item.position || 6 }}</span>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title class="text--secondary">
                ...
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
      <div
        v-if="rankingData.total_participants"
        class="text-caption text--secondary mt-2"
      >
        Total de participantes: {{ rankingData.total_participants }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import AssessmentRepository from '@/services/AssessmentRepository'

export default {
  name: 'AssessmentRanking',
  props: {
    assessmentId: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      rankingData: null,
      loading: true,
      error: null
    }
  },
  computed: {
    displayedRanking() {
      if (!this.rankingData) {
        return []
      }

      const top5 = this.rankingData.top_5 || []
      const aroundStudent = this.rankingData.around_student || []
      const studentResult = this.rankingData.student_result

      if (!studentResult || !studentResult.position) {
        // If no student result, show top 5 + ellipsis if there are more participants
        const result = top5.map((resultItem) => ({
          type: 'entry',
          result: resultItem,
          isCurrentUser: false
        }))

        // Add ellipsis if there are more than 5 participants
        if (this.rankingData.total_participants > 5) {
          result.push({ type: 'ellipsis' })
        }

        return result
      }

      const studentPosition = studentResult.position
      const isInTop5 = studentPosition <= 5

      if (isInTop5) {
        // Show top 5 + 3 after them (positions 6, 7, 8)
        // Get top 5 position IDs to avoid duplicates
        const top5Ids = new Set(top5.map((result) => result.id))

        // Get results from around_student that are after position 5 and not already in top5
        const afterTop5 = aroundStudent.filter(
          (result) =>
            result.position > 5 &&
            result.position <= 8 &&
            !top5Ids.has(result.id)
        )

        // Combine top 5 + 3 after (no duplicates)
        const allResults = [...top5, ...afterTop5]

        const mappedResults = allResults.map((result) => ({
          type: 'entry',
          result,
          isCurrentUser: result.user_id === studentResult.user_id
        }))

        // Add end ellipsis if there are more users below position 8
        const lastShownPosition = Math.max(
          ...mappedResults.map((item) => item.result.position)
        )

        if (
          this.rankingData.total_participants &&
          lastShownPosition < this.rankingData.total_participants
        ) {
          mappedResults.push({
            type: 'ellipsis',
            position: lastShownPosition + 1
          })
        }

        return mappedResults
      }
      // Show top 5 + "..." (if position 6 is not in around_student) + around_student
      const position6InAround = aroundStudent.some(
        (result) => result.position === 6
      )
      const needsEllipsis = !position6InAround && studentPosition > 6

      const result = []

      // Add top 5
      top5.forEach((resultItem) => {
        result.push({
          type: 'entry',
          result: resultItem,
          isCurrentUser: resultItem.user_id === studentResult.user_id
        })
      })

      // Add ellipsis if needed
      if (needsEllipsis) {
        result.push({ type: 'ellipsis' })
      }

      // Add around student (avoid duplicates with top5)
      const top5Ids = new Set(top5.map((r) => r.id))

      aroundStudent.forEach((resultItem) => {
        // Skip if already in top5
        if (!top5Ids.has(resultItem.id)) {
          result.push({
            type: 'entry',
            result: resultItem,
            isCurrentUser: resultItem.user_id === studentResult.user_id
          })
        }
      })

      // Add end ellipsis if there are more users below the last shown position
      const lastShownPosition = Math.max(
        ...result
          .filter((item) => item.type === 'entry')
          .map((item) => item.result.position)
      )

      if (
        this.rankingData.total_participants &&
        lastShownPosition < this.rankingData.total_participants
      ) {
        result.push({ type: 'ellipsis', position: lastShownPosition + 1 })
      }

      return result
    }
  },
  async mounted() {
    await this.loadRanking()
  },
  methods: {
    getUserName(user) {
      if (!user || !user.attributes) {
        return 'Usuario desconocido'
      }

      const firstName = user.attributes.first_name || ''
      const lastName = user.attributes.last_name || ''

      return `${firstName} ${lastName}`.trim() || 'Usuario'
    },
    formatMark(mark) {
      if (mark === null || mark === undefined) {
        return 'N/A'
      }

      return mark
    },
    async loadRanking() {
      this.loading = true
      this.error = null
      try {
        const ranking = await AssessmentRepository.getAssessmentRanking(
          this.assessmentId
        )

        if (ranking) {
          this.rankingData = ranking
        } else {
          this.error = 'No se pudo cargar la clasificación'
        }
      } catch (error) {
        console.error('Error loading ranking:', error)
        this.error = error.message || 'Error al cargar la clasificación'
      } finally {
        this.loading = false
      }
    },
    refresh() {
      this.loadRanking()
    }
  }
}
</script>
