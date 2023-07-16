<template>
  <div class="d-flex justify-end flex-column flex-sm-row">
    <form-button-enable-account v-if="!isEnableUsersTab"/>
    <form-button-disable-account v-else/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import FormButtonEnableAccount from './FormButtonEnableAccount.vue'
import FormButtonDisableAccount from './FormButtonDisableAccount.vue'

export default {
  components: {
    FormButtonEnableAccount,
    FormButtonDisableAccount
  },
  computed: {
    ...mapState('studentsService', ['tabViewStudents']),
    isEnableUsersTab () {
      return this.tabViewStudents === 'students-account-enable'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
