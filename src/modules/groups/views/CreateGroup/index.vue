<template>
  <v-card-text>
    <resource-header-crud-title
      text-header="Crear Grupo"
      :can-rendering-header="$vuetify.breakpoint.width < 420"
    />
    <v-toolbar flat class="lighten-5 my-2" outlined elevation="2">
      <v-icon right dark class="mx-1" color="black">mdi-account-group</v-icon>
      <resource-title-toolbar-datatable
        :width-limit-toolbar-title="420"
        title-text="Crear Grupo"
      />
    </v-toolbar>
    <validation-observer ref="FormCreateGroup" v-slot="{ invalid }">
      <section class="px-2 py-2 d-flex align-center">
        <v-row dense>
          SDFFN
          <!-- CÓDIGO -->
          <name-person-input
            ref="namePersonInputComponent"
            rules="requiredFirstName|min:3|max:25|mustContainLettersAndOptionalTilde"
            @NamePersonBinding="form.firstName = $event"
          />
          <v-col cols="12" sm="12" md="6" lg="2">
            <!-- Nombre -->
            <name-person-input
              ref="namePersonInputComponent"
              rules="requiredFirstName|min:3|max:25|mustContainLettersAndOptionalTilde"
              @NamePersonBinding="form.firstName = $event"
            />
          </v-col>
          <v-col cols="12" class="d-flex justify-start flex-column flex-sm-row">
            <v-btn
              :loading="loadingButtoncreateGroup"
              :disabled="
                disabledButtonUpdateGroup ||
                invalid ||
                !checkIfThereIsAtLeast_1ModifiedData
              "
              color="light-blue darken-3"
              class="mt-3 white--text"
              :block="activeStyleBlockButton"
              @click="createGroup"
            >
              <v-icon right dark class="mr-1"> mdi-account-group </v-icon>
              Crear
            </v-btn>
          </v-col>
        </v-row>
      </section>
    </validation-observer>
  </v-card-text>
</template>

<script src="./CreateGroup.js"></script>
