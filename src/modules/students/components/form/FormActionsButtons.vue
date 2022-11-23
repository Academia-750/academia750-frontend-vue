<template>
  <div
    class="d-flex justify-end flex-column flex-sm-row"
  >
    <form-delete-users-action/>
    <form-manage-status-account-action/>
  </div>
</template>

<script>
import FormDeleteUsersAction from '@/modules/students/components/form/FormDeleteUsersAction.vue'
import FormManageStatusAccountAction from '@/modules/students/components/form/FormManageStatusAccountAction.vue'

export default {
  components: {
    FormDeleteUsersAction,
    FormManageStatusAccountAction
  },
  computed: {

  }

}
</script>

<style lang="scss" scoped>

</style>
