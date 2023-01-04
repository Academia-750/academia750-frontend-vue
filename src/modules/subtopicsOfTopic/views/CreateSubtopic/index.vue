<template>
  <v-card-text>
    <resource-header-crud-title
      text-header="Crear Subtema"
      :can-rendering-header="$vuetify.breakpoint.width < 420"
    />
    <resource-header-crud-title
      v-if="topicData !== null"
      :text-header="getNameCurrentTopic"
      :can-rendering-header="true"
    />
    <v-toolbar flat class="indigo lighten-5 my-2" outlined>
      <resource-button-go-back-router :width-number-limit="300" :path-route-go-back="{ name: 'manage-subtopics-of-topic' }" />
      <resource-title-toolbar-datatable
        :width-limit-toolbar-title="420"
        title-text="Crear subtema"
      />
    </v-toolbar>
    <v-card-text>
      <validation-observer ref="FormCreateSubtopic" v-slot="{ invalid }">
        <v-row dense>
          <v-col
            cols="12"
            sm="12"
            md="12"
            lg="12"
          >
            <form-field-name-subtopic
              ref="nameSubtopicInputComponent"
              rules="required|max:255"
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
              <v-icon right dark class="mr-1"> mdi-database-plus </v-icon>
              Crear
            </v-btn>
          </v-col>
        </v-row>
      </validation-observer>
    </v-card-text>
  </v-card-text>
</template>

<script src="./CreateSubtopic.js"></script>
