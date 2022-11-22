import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState('profileService', ['user']),
    ...mapGetters('profileService', ['get_roles']),
    checkIfThereIsAtLeast_1ModifiedData () {
      const { firstName, lastName, phone, email } = this.cache.data.profile

      return (firstName !== this.form.firstName) || (lastName !== this.form.lastName) || (phone !== this.form.phone) || (email !== this.form.email)
    },
    activeStyleBlockButton () {
      return this.$vuetify.breakpoint.width <= 600
    },
    canUnsubscribeSystem () {
      return !this.get_roles.includes('admin')
    }
  }
}
