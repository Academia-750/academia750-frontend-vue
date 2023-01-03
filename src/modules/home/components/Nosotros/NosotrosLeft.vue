<template>
  <div class="estilo_nosotros">

        <h2>{{ NumeroNosotros }}</h2>
        <h2>{{ TituloNosotros }}</h2>
        <p>
          {{ ContenidoNosotros }}
        </p>
      
  </div>
</template>
<script>
export default {
  name: 'NosotrosLeft',
  props: {
    NumeroNosotros: {
      type: String,
      required: true
    },
    TituloNosotros: {
      type: String,
      required: true
    },
    ContenidoNosotros: {
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
.estilo_nosotros h2{
    font-size: 30px;
    font-family: var(--fuente_cuatro);
    color: #000;
}
</style>
