<template>
  <v-container class="mt-4 mb-1 py-4 cyan lighten-4">
    <v-row dense>
      <v-col
        cols="12"
        sm="12"
        md="3"
        lg="3"
        xl="3"
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
        md="3"
        lg="3"
        xl="3"
        class="d-flex justify-center align-center"
      >
        <v-sheet
          class="rounded-circle transition-swing"
          elevation="12"
          height="20"
          width="7%"
          color="secondary"
        ></v-sheet><span class="ml-1 font-weight-bold">Alternativa correcta</span>
      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="3"
        lg="3"
        xl="3"
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
      <v-col
        cols="12"
        sm="12"
        md="3"
        lg="3"
        xl="3"
        class="d-flex justify-center align-center"
      >
        <v-sheet
          class="rounded-circle transition-swing"
          elevation="12"
          height="20"
          width="7%"
          color="#D0B838"
        ></v-sheet><span class="ml-1 font-weight-bold">Pregunta no respondida</span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'SymbologyHistoryTest'
}
</script>
