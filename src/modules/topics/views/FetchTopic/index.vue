<template>
  <v-card-text>
    <resource-header-crud-title
      text-header="Ver tema"
      :can-rendering-header="$vuetify.breakpoint.width < 420"
    />
    <v-toolbar
      flat
      class="indigo lighten-5 my-2"
      outlined
    >
      <resource-button-go-back-router :width-number-limit="300" :path-route-go-back="{ name: 'manage-topics' }" />
      <resource-title-toolbar-datatable
        :width-limit-toolbar-title="420"
        title-text="Ver tema"
      />
      <resource-divider-title-datatable :width-limit-title-divider="620"/>
      <v-spacer></v-spacer>
      <div class="d-flex justify-center">
        <v-btn
          small
          :loading="loadingButtonFetchRecord"
          :disabled="disabledButtonFetchRecord"
          color="light-blue darken-3"
          class="white--text mx-1 align-self-center"
          @click="fetchRecordData"
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
    <v-card-text v-if="recordData">
      <div class="my-2 text-subtitle-1">
        UUID del tema: <span class="mx-1">
          <copy-label :text="recordData.data.id" />
        </span>
      </div>
      <div class="my-2 text-subtitle-1">
        Tema: <span class="mx-1">
          <copy-label :text="recordData.data.attributes.name" />
        </span>
      </div>
      <div class="my-2 text-subtitle-1">
        Fecha de alta: <span class="mx-1">
          <copy-label :text="recordData.data.attributes.created_at" />
        </span>
      </div>
      <div class="my-2 text-subtitle-1">
        UUID del grupo de tema: <span class="mx-1">
          <copy-label :text="recordData.data.relationships.topic_group?.id" />
        </span>
      </div>
      <div class="my-2 text-subtitle-1">
        Grupo de tema: <span class="mx-1">
          <copy-label :text="recordData.data.relationships.topic_group?.attributes?.name" />
        </span>
      </div>
    </v-card-text>
  </v-card-text>
</template>

<script src="./FetchTopic.js"></script>
