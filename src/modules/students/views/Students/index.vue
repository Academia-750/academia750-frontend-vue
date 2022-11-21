<template>
  <v-card-text>
    <v-tabs
      v-model="tab"
      background-color="deep-purple accent-4"
      centered
      dark
      icons-and-text
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab href="#tab-1">
        Activos
        <v-icon>mdi-account-circle</v-icon>
      </v-tab>

      <v-tab href="#tab-2">
        Inactivos
        <v-icon>mdi-account-off</v-icon>
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        v-for="i in 2"
        :key="i"
        :value="'tab-' + i"
      >
        <v-card flat>
          <v-card-text>{{ text }}</v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card-text>
</template>

<script src="./Student.js"></script>
