<template>
  <v-card-text>
    <resource-header-crud-title
      text-header="Actualizar subtema"
      :can-rendering-header="$vuetify.breakpoint.width < 620"
    />
    <v-toolbar
      flat
      class="indigo lighten-5 my-2"
      outlined
    >
      <resource-button-go-back-router :width-number-limit="325"/>
      <resource-title-toolbar-datatable :width-limit-toolbar-title="620" title-text="Actualizar subtema" />
      <resource-divider-title-datatable :width-limit-title-divider="620"/>
      <v-spacer></v-spacer>
      <div class="d-flex justify-center">
        <resource-button-add :config-route="{ name: 'create-subtopic' }"/>
        <v-btn
          small
          color="light-blue darken-3"
          class="white--text mx-1 align-self-center"
          @click="fetchSubtopicForUpdate"
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
      <validation-observer ref="FormUpdateSubtopic" v-slot="{ invalid }">
        <v-container fluid class="px-2 py-2 d-flex align-center">
          <v-row
            dense
          >
            <v-col
              cols="12"
              sm="12"
              md="12"
              lg="12"
            >
              <form-field-name-subtopic
                ref="nameSubtopicInputComponent"
                rules="required|max:100"
                @NameSubtopicBinding="form.nameSubtopic = $event"
              />
            </v-col>
            <v-col
              cols="12"
              class="d-flex justify-center flex-column flex-sm-row"
            >
              <v-btn
                :loading="loadingButtonUpdateSubtopic"
                :disabled="disabledButtonUpdateSubtopic || invalid"
                color="light-blue darken-3"
                class="mt-3 white--text"
                @click="UpdateSubtopic"
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

<script src="./UpdateSubtopic.js"></script>
