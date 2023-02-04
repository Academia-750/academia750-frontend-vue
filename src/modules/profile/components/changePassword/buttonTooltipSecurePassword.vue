<template>
  <div title="Ver reglas semánticas para contraseña segura">
    <v-fade-transition leave-absolute>
      <v-tooltip
        v-model="showTooltipPassword"
        bottom
      >
        <template v-slot:activator="{ attrs }">
          <v-btn
            icon
            v-bind="attrs"
            @click="showTooltipPassword = !showTooltipPassword"
          >
            <v-icon color="grey lighten-1">
              mdi-help-circle-outline
            </v-icon>
          </v-btn>
        </template>
        <p class="overline my-0"> Requisitos: </p>
        <p
          v-for="(requirements, key) in requirementsSecurePassword"
          :key="key"
          class="caption my-0"
        > - {{ requirements }} </p>
      </v-tooltip>
    </v-fade-transition>
  </div>
</template>

<script>
export default {
  name: 'ButtonTooltipSecurePassword',
  data () {
    return {
      showTooltipPassword: false,
      requirementsSecurePassword: [
        'Entre 8 y 15 carácteres',
        'Al menos 1 minúscula y 1 mayúscula',
        'Al menos 1 dígito',
        'No espacios en blanco',
        'Al menos un carácter especial' //$@!%*?&#^=_/<>)(
      ]
    }
  }
}
</script>
