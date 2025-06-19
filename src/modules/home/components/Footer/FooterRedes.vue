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
<style scoped>
.redes_footer {
  display: inline-block;
  margin: 0 8px;
  color: #ffffff !important;
  text-decoration: none;
  transition: opacity 0.3s ease;
}

.redes_footer:hover {
  opacity: 0.8;
}

.redes_footer .v-icon {
  font-size: 24px;
}
</style>
