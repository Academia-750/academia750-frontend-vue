<template>
  <v-row justify="center">
    <v-dialog
      v-model="isOpen"
      width="500px"
    >
      <v-card>
        <v-card-text>
          <div class="pt-2 mb-4">
            <p class="text-h5 mb-0 font-weight-black black--text ">More Information</p>
          </div>
          <div class="mb-4">
            <p class="text-h6 mb-0 font-weight-black black--text ">Name of the lesson:</p>
            <p class="text-h6 font-weight-black">{{ lesson.name }}</p>
          </div>
          <div class="mb-4">
            <p class="text-h6 mb-0 font-weight-black black--text ">Description:</p>
            <p class="text-h6 font-weight-black ">{{ lesson.description }}</p>
          </div>
          <div class="mb-2 d-flex justify-space-between align-center">
            <div class="flex flex-column">
              <p class="text-h6 font-weight-black black--text">Start Time:</p>
              <p class="text-h6 font-weight-black">{{ date }}</p>
            </div>
            <div class="flex flex-column">
              <p class="text-h6 font-weight-black black--text text-center">End Time:</p>
              <p class="text-h6 font-weight-black text-center">{{ date }}</p>
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
      date: ''
    }
  },
  methods: {
    open(lesson) {
      this.lesson = lesson
      this.date = moment(lesson.date).format('DD MMMM YYYY')
      this.isOpen = true
    },
    onClose() {
      this.isOpen = false
    }
  }
}
</script>
