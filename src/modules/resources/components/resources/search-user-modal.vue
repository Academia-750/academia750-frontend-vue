<template>
  <v-row justify="center">
    <v-dialog v-model="isOpen" @close="onClose" max-width="400px">
      <v-card>
        <v-card-title>
          <span class="text-subtitle-1 font-weight-bold">
            {{ title || 'Agregar Alumnos Individualmente' }}
          </span>
        </v-card-title>
        <v-card-text>
          <div class="d-flex flex-wrap align-baseline card mt-1">
            <div class="input">
              <StudentAutoComplete ref="studentAutoComplete" :limit="limit" @change="onSelect" />
            </div>  
            <v-btn
              dark
              color="blue darken-1"
              class="button"
              :loading="loading"
              @click="onOk"
            >
              OK
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import StudentAutoComplete from '../form/student-auto-complete.vue'

export default {
  name: 'SearchUserModal',
  components: { StudentAutoComplete },
  props: {
    title: {
      type: String,
      default: ''
    },
    limit: {
      type: Number,
      default: 5
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isOpen: false,
      selectedItem: false
    }
  },

  mounted() {
    this.selectedItem = false
  },

  methods: {
    open() {
      this.reset()
      this.isOpen = true
    },
    onSelect(value) {
      this.selectedItem = value
    },
    onOk() {
      this.$emit('ok', this.selectedItem)
      this.isOpen = false
      this.reset()
    },
    onClose() {
      this.reset()
        this.isOpen = false
    },
    reset() {
       // First time is not mounted
      this.$refs.studentAutoComplete && this.$refs.studentAutoComplete.clear()
      this.selectedItem = false
    }
  }
}
</script>
<style scoped>
.input {
  width: 80%;
}
.card {
  width: 100%;
  justify-content: space-between;
}
.button {
  width: 10%;
}
</style>
