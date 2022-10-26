<template>
  <div>
    <!-- Loading component -->
    <v-progress-linear
      :active="displayProgressLinearLoading"
      color="deep-purple accent-4"
      :indeterminate="true"
      class="ma-0"
      height="9"
      style="top: -2px;"
    ></v-progress-linear>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ProgressLinearLoadingAppComponent',
  computed: {
    ...mapState('loadingService', ['displayProgressLinearLoading'])
  }
}
</script>
