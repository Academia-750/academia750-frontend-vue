<template>
  <v-card-text>
    <create-or-edit-student/>
    <v-divider></v-divider>
    <v-tabs
      v-model="getCurrentTabView"
      grow
      background-color="cyan darken-1 mt-4"
      centered
      dark
      icons-and-text
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab
        key="section-students-account-enable"
        href="#students-account-enable"
      >
        Activos
        <v-icon>mdi-account-circle</v-icon>
      </v-tab>

      <v-tab
        key="section-students-account-disable"
        href="#students-account-disable"
      >
        Inactivos
        <v-icon>mdi-account-off</v-icon>
      </v-tab>
    </v-tabs>

    <v-tabs-items
      v-model="getCurrentTabView"
      touchless
    >
      <v-tab-item
        key="students-account-enable"
        :transition="false"
        value="students-account-enable"
      >
        <v-card flat>
          <v-card-text>
            <students-datatable
              state-account="enable"
            />
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item
        key="students-account-disable"
        :transition="false"
        value="students-account-disable"
      >
        <v-card flat>
          <v-card-text>
            <students-datatable
              state-account="disable"
            />
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    <form-actions-buttons/>
  </v-card-text>
</template>

<script src="./Student.js"></script>
