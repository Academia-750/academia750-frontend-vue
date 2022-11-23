<template>
  <v-btn
    class="mx-1 my-1"
    dark
    small
    color="success"
    @click="$emit('actionConfirmShowDialogDelete')"
  >
    <span >Reactivar</span>
    <v-icon
      class="ml-1"
      small
      dark
    >
      mdi-check-circle
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

<style lang="scss" scoped>

</style>
