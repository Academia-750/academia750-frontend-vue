<template>
  <div>
    <ul class="lista_footer mt-2">
      <li style="cursor: pointer;" @click="$vuetify.goTo(0)">
        <v-icon dark> mdi-chevron-right </v-icon> Inicio
      </li>
      <li style="cursor: pointer;" @click="$emit('emitScrollToSectionHomePage', 'OurServiceSection')">
        <v-icon dark> mdi-chevron-right </v-icon> Qué ofrecemos
      </li>
      <li style="cursor: pointer;" @click="$emit('emitScrollToSectionHomePage', 'tarifasSection')">
        <v-icon dark> mdi-chevron-right </v-icon> Tarifas
      </li>
      <li style="cursor: pointer;" @click="$emit('emitScrollToSectionHomePage', 'ContactUsForm')">
        <v-icon dark> mdi-chevron-right </v-icon> Contáctanos
      </li>
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
