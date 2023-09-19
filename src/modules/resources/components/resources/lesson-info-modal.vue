<template>
  <v-row justify="center">
    <v-dialog v-model="isOpen" width="500px">
      <v-card>
        <v-card-text>
          <div class="pt-2 mb-4">
            <p class="text-h5 mb-0 font-weight-black black--text">
              Información
            </p>
          </div>
          <div class="mb-4">
            <p class="text-h6 mb-0 font-weight-black black--text">Clase:</p>
            <p class="text-h6 font-weight-black">{{ lesson.name }}</p>
          </div>
          <div class="mb-4">
            <p class="text-h6 mb-0 font-weight-black black--text">
              Descripción:
            </p>
            <p class="text-h6 font-weight-black">{{ lesson.description }}</p>
          </div>
          <div class="mb-2 d-flex justify-space-between align-center">
            <div class="flex flex-column">
              <p class="text-h6 font-weight-black black--text">
                Hora de comienzo:
              </p>
              <p class="text-h6 font-weight-black">{{ start_time }}</p>
            </div>
            <div class="flex flex-column">
              <p class="text-h6 font-weight-black black--text text-center">
                Hora de finalización:
              </p>
              <p class="text-h6 font-weight-black text-center">{{ end_time }}</p>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import moment from 'moment'
export default {
  name: 'LessonInfoModal',
  props: {},
  data() {
    return {
      isOpen: false,
      loading: false,
      lesson: {},
      start_time: '',
      end_time: ''
    }
  },
  methods: {
    open(lesson) {
      this.lesson = lesson
      console.log(lesson.start_time)
      this.start_time = lesson.start_time
      this.end_time = lesson.end_time
      this.isOpen = true
    },
    onClose() {
      this.isOpen = false
    }
  }
}
</script>
