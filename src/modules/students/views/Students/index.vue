<template>
  <v-card-text>
    <v-tabs
      v-model="tab"
      grow
      background-color="cyan darken-1"
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
      v-model="tab"
      touchless
    >
      <v-tab-item
        key="students-account-enable"
        :transition="false"
        eager
        value="students-account-enable"
      >
        <v-card flat>
          <v-card-text>
            <students-datatable
              v-if="tab === 'students-account-enable'"
              state-account="enable"
            />
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item
        key="students-account-disable"
        :transition="false"
        eager
        value="students-account-disable"
      >
        <v-card flat>
          <v-card-text>
            <students-datatable
              v-if="tab === 'students-account-disable'"
              state-account="disable"
            />
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card-text>
</template>

<script src="./Student.js"></script>
