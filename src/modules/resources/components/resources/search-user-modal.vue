<template>
  <v-row justify="center">
    <v-dialog v-model="isOpen" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-subtitle-1 font-weight-bold">
            {{ title || 'Agregar alumnos individualmente' }}
          </span>
        </v-card-title>
        <v-card-text>
          <div class="d-flex flex-wrap align-baseline card mt-1">
            <div class="input">
              <StudentAutoComplete
                ref="studentAutoComplete"
                :autofocus="autofocus"
                :limit="limit"
                @change="onSelect"
              />
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
import Swal from 'sweetalert2/dist/sweetalert2'

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
    autofocus: {
      type: Boolean,
      default: true
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
  watch: {
    isOpen() {
      this.reset()
    }
  },
  mounted() {
    this.selectedItem = false
  },

  methods: {
    open() {
      this.isOpen = true
    },
    onSelect(value) {
      this.selectedItem = value
    },
    onOk() {
      if (!this.selectedItem) {
        Swal.fire({
          toast: true,
          timer: 1000,
          icon: 'warning',
          title: 'Seleccione a un alumno'
        })

        return
      }

      this.$emit('ok', this.selectedItem)
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
