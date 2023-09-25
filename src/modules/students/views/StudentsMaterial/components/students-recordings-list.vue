<template>
    <StudentsMaterialsList />
</template>
  <script>
  
  export default {
    name: 'StudentsMaterialsList',
    components: {
      StudentsMaterialsList: () =>
        import(/* webpackChunkName: "StudentsMaterialsList" */ './students-materials-base.vue')
    },
    data() {
      return {
        reloadDatatableUsers: false
      }
    }
  }
  </script>