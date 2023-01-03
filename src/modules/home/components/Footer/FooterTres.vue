<template>
  <li>
    <v-icon dark> {{ icoContacto }} </v-icon> {{ itemsContacto }}
  </li>
</template>
<script>
export default {
  name: 'FooterTres',
  props: {
    itemsContacto: {
      type: String,
      required: true
    },
    icoContacto: {
      type: String,
      required: true
    }
    
  },
  data() {
    return {}
  }
}
</script>
<style></style>
