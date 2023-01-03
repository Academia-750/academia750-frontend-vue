<template>
  <a class="redes_footer" :href=" linkRedesFooter " target="_blank">
    <v-icon dark> {{ icoRedesFooter }} </v-icon>
  </a>
</template>
<script>
export default {
  name: 'FooterTres',
  props: {
    icoRedesFooter: {
      type: String,
      required: true
    },
    linkRedesFooter: {
      type: String,
      required: true
    }
  },
  data() {
    return {}
  }
}
</script>
<style>
.redes_footer{
    color: #202020!important;
}
</style>
