<template>
  <v-card-text>
    <resource-header-crud-title
      text-header="Actualizar oposicion"
      :can-rendering-header="$vuetify.breakpoint.width < 620"
    />
    <v-toolbar
      flat
      class="indigo lighten-5 my-2"
      outlined
    >
      <resource-button-go-back-router :width-number-limit="325" :path-route-go-back="{ name: 'manage-oppositions' }"/>
      <resource-title-toolbar-datatable :width-limit-toolbar-title="620" title-text="Actualizar Oposicion" />
      <resource-divider-title-datatable :width-limit-title-divider="620"/>
      <v-spacer></v-spacer>
      <div class="d-flex justify-center">
        <resource-button-add :config-route="{ name: 'create-opposition' }"/>
        <v-btn
          small
          color="light-blue darken-3"
          class="white--text mx-1 align-self-center"
          @click="fetchOppositionForUpdate"
        >
          <v-icon
            right
            dark
            class="mr-1"
          >
            mdi-refresh
          </v-icon>
        </v-btn>
      </div>
    </v-toolbar>
    <v-card-text>
      <validation-observer ref="FormUpdateOpposition" v-slot="{ invalid }">
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
                :loading="loadingButtonUpdateOpposition"
                :disabled="disabledButtonUpdateOpposition || invalid"
                color="light-blue darken-3"
                class="mt-3 white--text"
                @click="UpdateOpposition"
              >
                <v-icon
                  right
                  dark
                  class="mr-1"
                >
                  mdi-database-sync
                </v-icon>
                Actualizar
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </validation-observer>
    </v-card-text>
  </v-card-text>
</template>

<script src="./UpdateOpposition.js"></script>
