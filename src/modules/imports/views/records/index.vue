<template>
  <v-card-text>
    <div v-if="importProcessData !== null">
      <v-banner
        single-line
        transition="slide-y-transition"
      >
        Nombre del archivo: <span class="font-weight-bold">{{ importProcessData.attributes.name_file }}</span>
      </v-banner>
      <v-banner
        single-line
        transition="slide-y-transition"
      >
        Motivo: <span class="font-weight-bold">{{ importProcessData.attributes.category }}</span>
      </v-banner>
      <v-banner
        single-line
        transition="slide-y-transition"
      >
        Total de registros: <span class="font-weight-bold">{{ importProcessData.attributes.total_number_of_records }}</span>
      </v-banner>
      <v-banner
        single-line
        transition="slide-y-transition"
      >
        Total de registros fallidos: <span class="font-weight-bold">{{ importProcessData.attributes.total_number_failed_records }}</span>
      </v-banner>
      <v-banner
        single-line
        transition="slide-y-transition"
      >
        Total de registros satisfactorios: <span class="font-weight-bold">{{ importProcessData.attributes.total_number_successful_records }}</span>
      </v-banner>
      <v-banner
        single-line
        transition="slide-y-transition"
      >
        Fecha de inicio de importación: <span class="font-weight-bold">{{ importProcessData.attributes.created_at }}</span>
      </v-banner>
    </div>
    <v-data-table
      :loading="stateLoadingItems"
      :headers="filter__headers_datatable"
      :items="itemsDatatable"
      :options.sync="optionsDatatable"
      item-key="id"
      multi-sort
      show-expand
      :expanded.sync="expandedItemsDatatable"
      no-data-text="No hay datos disponibles"
      :items-per-page="25"
      :mobile-breakpoint="600"
      class="elevation-1"
      :server-items-length="informationMeta.total"
      :footer-props="get_footer_props"
    >
      <template v-slot:top>
        <resource-header-crud-title
          text-header="Registros del archivo importado"
          :can-rendering-header="$vuetify.breakpoint.width < 700"
        />
        <!-- <resource-header-crud-title text-header="Tema: Prevención de muertes y lesiones de bomberos durante los ejercicios de capacitación" /> -->
        <v-toolbar flat class="indigo lighten-5 my-2" outlined>
          <resource-button-go-back-router />
          <resource-title-toolbar-datatable
            title-text="Registros del archivo importado"
          />
        </v-toolbar>
        <resource-text-field-search
          ref="ResourceTextFieldSearch"
          @emitSearchWord="searchFieldExecuted"
        />
      </template>
      <template v-slot:expanded-item="{ item }">
        <td colspan="4">
          <v-expansion-panels v-if="item['has-errors']">
            <v-expansion-panel>
              <v-expansion-panel-header class="title">Errores de validación</v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-data-table
                  :key="item.id"
                  :headers="headersDescriptionRecord"
                  :items="getFieldsRowsValuesErrorRecord(Object.keys(item.errors_validation), item.errors_validation)"
                  :items-per-page="10"
                  class="elevation-1"
                >
                  <template v-slot:[`item.description-errors`]="{ item: errorItem }">
                    <errors-record-import-list :items-errors="errorItem['description-errors']" />
                  </template>
                </v-data-table>
                <!-- <pre class="body-2">{{ item.errors_validation }}</pre>
                <pre class="body-2">{{ Object.keys(item.errors_validation) }}</pre> -->
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
          <!-- <p v-if="item['has-errors']" class="ml-2 mt-2">
            {{ item.errors_validation }}
          </p> -->
          <p v-else class="font-weight-bold title ml-2 mt-2">
            Este registro no cuenta con errores.
          </p>
        </td>
      </template>
      <template v-slot:no-data>
        <resource-banner-no-data-datatable />
      </template>
      <template v-slot:[`item.has-errors`]="{ item }">
        <v-chip
          v-if="item['has-errors']"
          dark
          small
          class="ma-2"
          color="red"
          text-color="white"
        >
          <v-icon small dark class="mr-1"> mdi-cancel </v-icon>
          Error
        </v-chip>
        <v-chip
          v-else
          small
          dark
          class="ma-2"
          color="green"
        >
          <v-icon small dark class="mr-1"> mdi-check </v-icon>
          Completado
        </v-chip>
      </template>
      <template v-slot:[`item.actions-resource`]="{ item }">
        <div class="d-flex justify-space-around">
          <resource-button-edit
            icon-button="mdi-eye"
            color-button="success"
            text-button="Ver registros"
            :config-route="{
              name: 'my-imports-files-records',
              params: { id: item.id }
            }"
          />
        </div>
      </template>
    </v-data-table>
  </v-card-text>
</template>

<script src="./records.js"></script>
<style src="./records.css"></style>
