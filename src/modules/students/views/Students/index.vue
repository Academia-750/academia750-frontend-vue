<template>
  <v-card-text>
    <div ref="CreateOrEditStudentSection">
      <create-or-edit-student @emitReloadDatatableStudents="ReloadDatatableStudents" />
    </div>
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

    <div ref="sectionTabsItemsStudentsByStatusAccount">
      <v-tabs-items v-model="getCurrentTabView" touchless>
        <v-tab-item
          key="students-account-enable"
          :transition="false"
          value="students-account-enable"
          style="min-height: 800px;"
        >
          <v-card v-if="getCurrentTabView === 'students-account-enable'" flat>
            <v-card-text>
              <students-datatable
                ref="studentsDatatableStateEnable"
                state-account="enable"
                @emitScrollToCreateOrEditStudentForm="ScrollToCreateOrEditStudentForm"
              />
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item
          key="students-account-disable"
          :transition="false"
          value="students-account-disable"
          style="min-height: 800px;"
        >
          <v-card v-if="getCurrentTabView === 'students-account-disable'" flat>
            <v-card-text>
              <students-datatable
                ref="studentsDatatableStateDisable"
                state-account="disable"
                @emitScrollToCreateOrEditStudentForm="ScrollToCreateOrEditStudentForm"
              />
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </div>
    <v-container>
      <form-actions-buttons />
    </v-container>
  </v-card-text>
</template>

<script src="./Student.js"></script>
