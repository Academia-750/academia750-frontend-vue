<template>
  <v-card-text>
    <resource-header-crud-title
      text-header="Crear subtema"
      :can-rendering-header="$vuetify.breakpoint.width < 420"
    />
    <v-toolbar
      flat
      class="indigo lighten-5 my-2"
      outlined
    >
      <resource-button-go-back-router :width-number-limit="300"/>
      <resource-title-toolbar-datatable :width-limit-toolbar-title="420" title-text="Crear Subtema" />
    </v-toolbar>
    <v-card-text>
      <validation-observer ref="FormCreateSubtopic" v-slot="{ invalid }">
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
                :loading="loadingButtonCreateSubtopic"
                :disabled="disabledButtonCreateSubtopic || invalid"
                color="light-blue darken-3"
                class="mt-3 white--text"
                @click="CreateSubtopic"
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

<script src="./CreateSubtopic.js"></script>
