<template>
  <v-card-text>
    <resource-header-crud-title
      text-header="Crear tema"
      :can-rendering-header="$vuetify.breakpoint.width < 420"
    />
    <v-toolbar flat class="indigo lighten-5 my-2" outlined>
      <resource-button-go-back-router :width-number-limit="300" />
      <resource-title-toolbar-datatable
        :width-limit-toolbar-title="420"
        title-text="Crear tema"
      />
    </v-toolbar>
    <v-card-text>
      <validation-observer ref="FormCreateTopic" v-slot="{ invalid }">
        <v-row dense>
          <v-col
            cols="12"
            sm="12"
            md="12"
            lg="12"
          >
            <autocomplete-a-topic-group ref="AutocompleteATopicGroup" />
          </v-col>
          <v-col
            cols="12"
            sm="12"
            md="12"
            lg="12"
          >
            <form-field-name-topic
              ref="nameTopicInputComponent"
              rules="required|max:100"
              @NameTopicBinding="form.nameTopic = $event"
            />
          </v-col>
          <v-col
            cols="12"
            class="d-flex justify-center flex-column flex-sm-row"
          >
            <v-btn
              :loading="loadingButtonCreateTopic"
              :disabled="disabledButtonCreateTopic || invalid"
              color="light-blue darken-3"
              class="mt-3 white--text"
              @click="CreateTopic"
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

<script src="./CreateTopic.js"></script>
