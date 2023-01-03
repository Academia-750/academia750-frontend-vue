<template>
  <div>
    <ul class="lista_footer mt-2">
      <li v-for="(item, index) in itemsFooter" :key="index"><v-icon dark> mdi-chevron-right </v-icon> {{ item }}</li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'FooterDos',
  props: {
    itemsFooter: {
      type: Array,
      required: true
    }
  },
  data() {
    return {}
  }
}
</script>
<style></style>
