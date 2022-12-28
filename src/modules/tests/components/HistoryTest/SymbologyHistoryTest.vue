<template>
  <v-container class="mt-4 mb-2 py-4 cyan lighten-4">
    <v-row dense>
      <v-col
        cols="12"
        sm="12"
        md="4"
        lg="4"
        xl="4"
        class="d-flex justify-center align-center"
      >
        <v-sheet
          class="rounded-circle transition-swing"
          elevation="12"
          height="20"
          width="7%"
          color="red darken-1"
        ></v-sheet> <span class="ml-1 font-weight-bold">Respuesta errónea del alumno</span>
      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="4"
        lg="4"
        xl="4"
        class="d-flex justify-center align-center"
      >
        <v-sheet
          class="rounded-circle transition-swing"
          elevation="12"
          height="20"
          width="7%"
          color="grey darken-4"
        ></v-sheet><span class="ml-1 font-weight-bold">Alternativa correcta</span>
      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="4"
        lg="4"
        xl="4"
        class="d-flex justify-center align-center"
      >
        <v-sheet
          class="rounded-circle transition-swing"
          elevation="12"
          height="20"
          width="7%"
          color="green darken-1"
        ></v-sheet><span class="ml-1 font-weight-bold">Respuesta correcta</span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'SymbologyHistoryTest'
}
</script>
