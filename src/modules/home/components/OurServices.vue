<template>
  <v-container class="our-services-section">
    <header-section-our-services />
    <list-our-services />
  </v-container>
</template>

<script>
import HeaderSectionOurServices from './OurServices/HeaderSectionOurServices'
import ListOurServices from './OurServices/ListOurServices'

export default {
  name: 'OurServices',
  components: {
    HeaderSectionOurServices,
    ListOurServices
  }
}
</script>

<style scoped>
  /* .our-services-section {
    border-bottom: 1px solid #e3e1e1;
    margin-top: 80px auto;
    padding-top: 140px!important;
  } */
</style>
