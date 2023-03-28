<template>
  <div class="estilo_nosotros">
    <div class="numeracion">{{ numeroNosotros }}</div>
    <h3>{{ tituloNosotros }}</h3>
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
.estilo_nosotros h2, .numeracion{
  font-size: 30px;
  font-family: var(--fuente_cuatro);
  color: #000;
}
</style>
