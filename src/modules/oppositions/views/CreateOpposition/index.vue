<template>
  <v-card-text>
    <resource-header-crud-title
      text-header="Crear oposicion"
      :can-rendering-header="$vuetify.breakpoint.width < 420"
    />
    <v-toolbar
      flat
      class="indigo lighten-5 my-2"
      outlined
    >
      <resource-button-go-back-router :width-number-limit="300" :path-route-go-back="{ name: 'manage-oppositions' }"/>
      <resource-title-toolbar-datatable :width-limit-toolbar-title="420" title-text="Crear Oposicion" />
    </v-toolbar>
    <v-card-text>
      <validation-observer ref="FormCreateOpposition" v-slot="{ invalid }">
        <v-container fluid class="px-2 py-2 d-flex align-center">
          <v-row
            dense
          >
            <v-col
              cols="12"
              sm="12"
              md="6"
              lg="6"
            >
              <form-field-name-opposition
                ref="nameOppositionInputComponent"
                rules="required|max:100"
                @NameOppositionBinding="form.nameOpposition = $event"
              />
            </v-col>
            <v-col
              cols="12"
              sm="12"
              md="6"
              lg="6"
            >
              <form-field-period-opposition
                ref="periodOppositionInputComponent"
                rules="required|max:100"
                @PeriodOppositionBinding="form.periodOpposition = $event"
              />
            </v-col>
            <v-col
              cols="12"
              class="d-flex justify-center flex-column flex-sm-row"
            >
              <v-btn
                :loading="loadingButtonCreateOpposition"
                :disabled="disabledButtonCreateOpposition || invalid"
                color="light-blue darken-3"
                class="mt-3 white--text"
                @click="CreateOpposition"
              >
                <v-icon
                  right
                  dark
                  class="mr-1"
                >
                  mdi-database-plus
                </v-icon>
                Crear
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </validation-observer>
    </v-card-text>
  </v-card-text>
</template>

<script src="./CreateOpposition.js"></script>
