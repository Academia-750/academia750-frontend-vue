<template>
  <v-btn
    class="mx-1 my-1"
    dark
    small
    color="deep-purple darken-1"
    @click="$emit('actionConfirmShowDialogDelete')"
  >
    <span >Desactivar</span>
    <v-icon
      class="ml-1"
      small
      dark
    >
      mdi-close-circle
    </v-icon>
  </v-btn>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('studentsService', ['tabViewStudents'])
  },
  methods: {}
}
</script>
