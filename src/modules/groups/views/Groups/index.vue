<template>
  <v-card-text>
    <div ref="sectionTabsItemsGroupsByStatusAccount">
      <v-tabs-items v-model="getCurrentTabView" touchless>
        <v-tab-item
          key="groups-account-enable"
          :transition="false"
          value="groups-account-enable"
          style="min-height: 600px"
        >
          <v-card v-if="getCurrentTabView === 'groups-account-enable'" flat>
            <v-card-text>
              <groups-datatable
                ref="groupsDatatableStateEnable"
                state-account="enable"
                @emitScrollToCreateOrEditGrouptForm="
                  ScrollToCreateOrEditGroupForm
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
          key="groups-account-disable"
          :transition="false"
          value="groups-account-disable"
          style="min-height: 600px"
        >
          <v-card v-if="getCurrentTabView === 'groups-account-disable'" flat>
            <v-card-text>
              <groups-datatable
                ref="groupsDatatableStateDisable"
                state-account="disable"
                @emitScrollToCreateOrEditGrouptForm="
                  ScrollToCreateOrEditGroupForm
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
