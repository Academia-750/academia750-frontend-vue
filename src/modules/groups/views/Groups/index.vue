<template>
  <v-card-text>
    <div ref="sectionTabsItemsGroupsByStatusAccount">
      <v-tabs-items v-model="getCurrentTabView" touchless>
        <v-tab-item
          key="students-account-enable"
          :transition="false"
          value="students-account-enable"
          style="min-height: 600px"
        >
          <v-card v-if="getCurrentTabView === 'students-account-enable'" flat>
            <v-card-text>
              <students-datatable
                ref="studentsDatatableStateEnable"
                state-account="enable"
                @emitScrollToCreateOrEditStudentForm="
                  ScrollToCreateOrEditStudentForm
                "
              />
            </v-card-text>
            <v-card-text>
              <v-container>
                <form-actions-buttons />
              </v-container>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item
          key="students-account-disable"
          :transition="false"
          value="students-account-disable"
          style="min-height: 600px"
        >
          <v-card v-if="getCurrentTabView === 'students-account-disable'" flat>
            <v-card-text>
              <students-datatable
                ref="studentsDatatableStateDisable"
                state-account="disable"
                @emitScrollToCreateOrEditStudentForm="
                  ScrollToCreateOrEditStudentForm
                "
              />
            </v-card-text>
            <v-card-text>
              <v-container>
                <form-actions-buttons />
              </v-container>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </v-card-text>
</template>

<script src="./Groups.js"></script>
