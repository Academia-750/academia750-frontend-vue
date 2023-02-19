<template>
  <div class="estilo_nosotros">
    <h2>{{ numeroNosotros }}</h2>
    <h2>{{ tituloNosotros }}</h2>
    <p>
      {{ contenidoNosotros }}
    </p>
  </div>
</template>
<script>
export default {
  name: 'NosotrosLeft',
  props: {
    numeroNosotros: {
      type: String,
      required: true
    },
    tituloNosotros: {
      type: String,
      required: true
    },
    contenidoNosotros: {
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
.estilo_nosotros h2 {
  font-size: 30px;
  font-family: var(--fuente_cuatro);
  color: #000;
}
</style>
