<template>
  <v-row justify="center">
    <v-dialog v-model="isOpen" max-width="400px">
      <v-card>
        <v-card-title>
          <span class="text-subtitle-1 font-weight-bold">
            {{ title || 'Agregar Alumnos Individualmente' }}
          </span>
        </v-card-title>
        <v-card-text>
          <div class="d-flex flex-wrap align-baseline card mt-1">
            <div class="input">
              <StudentAutoComplete :limit="limit" @change="onSelect" />
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
      this.selectedItem = false
      this.isOpen = true
    },
    onSelect(value) {
      this.selectedItem = value
    },
    onOk() {
      this.$emit('ok', this.selectedItem)
      this.isOpen = false
      this.selectedItem = false
    }
  }
}
</script>
<style scoped>
.input {
  width: 80%;
}

.button {
  width: 10%;
}
</style>
