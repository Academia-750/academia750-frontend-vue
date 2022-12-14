<template>
  <v-card-text>
    <resource-header-crud-title
      text-header="Ver oposición"
      :can-rendering-header="$vuetify.breakpoint.width < 420"
    />
    <v-toolbar
      flat
      class="indigo lighten-5 my-2"
      outlined
    >
      <resource-button-go-back-router :width-number-limit="300" />
      <resource-title-toolbar-datatable
        :width-limit-toolbar-title="420"
        title-text="Ver oposición"
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
        UUID de la oposición: <span class="mx-1">
          <copy-label :text="recordData.data.id" />
        </span>
      </div>
      <div class="my-2 text-subtitle-1">
        Oposición: <span class="mx-1">
          <copy-label :text="recordData.data.attributes.name" />
        </span>
      </div>
      <div class="my-2 text-subtitle-1">
        Periodo: <span class="mx-1">
          <copy-label :text="recordData.data.attributes.period" />
        </span>
      </div>
      <div class="my-2 text-subtitle-1">
        Fecha de alta: <span class="mx-1">
          <copy-label :text="recordData.data.attributes.created_at" />
        </span>
      </div>
    </v-card-text>
  </v-card-text>
</template>

<script src="./FetchOpposition.js"></script>
