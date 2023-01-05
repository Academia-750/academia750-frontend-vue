<template>
  <div>
    <div class="todo_tarifa">
      <div class="cabeza_tarifa">
        <h2>{{ tituloTarifa }}</h2>
        <h3>{{ precioTarifa }} €/mes</h3>
      </div>
      <div class="cuerpo_tarifa">
        <p>{{ contenidoTarifa }}</p>
        <ul class="lista_tarifa mt-2">
          <li v-for="(item, index) in itemsTarifa" :key="index">{{ item }}</li>
        </ul>

      </div>
      <div class="caja_boton py-4"> <button class="boton-2" @click="$emit('emitClickInscriptionContactUs')">Únete</button></div>

    </div>
  </div>
</template>
<script>
export default {
  name: 'ItemTarifas',
  props: {
    tituloTarifa: {
      type: String,
      required: true
    },
    precioTarifa: {
      type: String,
      required: true
    },
    contenidoTarifa: {
      type: String,
      required: true
    },
    itemsTarifa: {
      type: Array,
      required: true
    }
  },
  data() {
    return {}
  }
}
</script>
<style scoped>
.cabeza_tarifa {
  padding: 25px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom: 1px solid #d7d7d7;
  background-color: #fff;
  display: flex;
justify-content: space-between;
align-items: center;

}
.cabeza_tarifa h2{
    font-family: var(--fuente_cinco);
    font-size: 25px;
    color: var(--color_uno);
}
.cabeza_tarifa h3{
    font-size: 17px;
    font-family: var(--fuente_tres);
    line-height: 17px;
}
.todo_tarifa {
  background: linear-gradient(
    180deg,
    rgba(70, 161, 187, 0.1127) 0%,
    rgba(125, 183, 200, 0.2303) 100%
  );
  z-index: 1;
  position: relative;
  border-radius: 20px;
  -webkit-box-shadow: 0px 5px 15px 5px rgb(0 0 0 / 10%) !important;
    box-shadow: 0px 5px 15px 5px rgb(0 0 0 / 10%) !important;
}
.cuerpo_tarifa {
  padding: 40px 45px 0px 45px;
  min-height: 360px;
}
.lista_tarifa {
  list-style: none;
}
.lista_tarifa  li::before {
  content: url(/images/academia750/cheack.svg);
  padding-right: 13px;
}
.caja_boton{

    padding: 40px 45px 0px 45px;
}
.lista_tarifa {
    padding-left: 15px;
}
</style>
