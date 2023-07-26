<template>
  <v-card-text>
    <!-- ------------ ADD STUDENT TO GROUP ------------ -->
    <template @click="onCreate = false">
      <v-row justify="center">
        <v-dialog v-model="onCreate" max-width="400px">
          <v-card>
            <v-card-title>
              <span class="text-subtitle-1 font-weight-bold">
                Agregar Alumnos Individualmente
              </span>
            </v-card-title>
            <v-card-text>
              <div class="d-flex flex-wrap align-baseline card mt-1">
                <div class="input">
                  <v-autocomplete
                    v-model="studentSelected"
                    :items="itemsStudents"
                    dense
                    outlined
                    small-chips
                    clearable
                    item-text="text"
                    item-value="value"
                    label="Buscar por Nombre,correo,DNI"
                    return-object
                  ></v-autocomplete>
                </div>
                <v-btn
                  dark
                  color="blue darken-1"
                  class="button"
                  :loading="isLoading"
                  @click="joinGroup"
                >
                  OK
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
    <v-data-table
      v-model="getSelectedItems"
      :loading="stateLoadingItems"
      :headers="filter__headers_datatable"
      :items="groupMembers"
      item-key="id"
      show-select
      no-data-text="No hay datos disponibles"
      :mobile-breakpoint="700"
      class="elevation-1"
      :server-items-length="totalItems"
      :footer-props="footerProps"
      :items-per-page="vueTableOptions.limit"
      :sort-by="vueTableOptions.sortBy"
      :sort-desc="vueTableOptions.sortDesc"
      :page="vueTableOptions.page"
      @update:options="onOptionsUpdate"
    >
      <template v-slot:top>
        <!-- ------------ SEARCH ------------ -->
        <v-tabs
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
            :active="isActive"
            @click="isActive(true)"
          >
            Activos
            <v-icon>mdi-account-circle</v-icon>
          </v-tab>

          <v-tab
            key="section-students-account-disable"
            href="#students-account-disable"
            :active="!isActive"
            @click="isActive(false)"
          >
            Inactivos
            <v-icon>mdi-account-off</v-icon>
          </v-tab>
        </v-tabs>
        <resource-text-field-search
          :search-word="tableOptions.content"
          label-text-field="Buscar por nombre o código"
          @emitSearchTextBinding="searchFieldWithDebounce"
          @emitSearchWord="searchFieldExecuted"
        />
        <div
          v-if="active"
          class="d-flex justify-end mr-md-5"
          @click="onCreate = true"
        >
          <resource-button-add
            text-button="Alumnos"
            :disabled="false"
            :only-dispatch-click-event="true"
          />
        </div>
      </template>

      <!-- ------------ NO DATA ------------ -->
      <template v-slot:no-data>
        <resource-banner-no-data-datatable />
      </template>

      <!-- ------------ SLOTS ------------ -->
      <template v-slot:[`item.name`]="{ item }">
        <div class="d-flex align-center">
          <span
            :style="{ backgroundColor: item.color }"
            class="circle mr-1"
          ></span>
          {{ item.name }}
        </div>
      </template>
      <template v-slot:[`item.created_at`]="{ item }">
        {{ parseDate(item.created_at) }}
      </template>
      <template v-slot:[`item.alumnos`]>
        <div class="d-flex justify-space-around">
          <resource-button-add
            text-button="Alumnos"
            :disabled="true"
            :config-route="{ name: 'add-students' }"
            :only-dispatch-click-event="true"
          />
        </div>
      </template>
      <template v-if="active" v-slot:[`item.actions-resource`]="{ item }">
        <div class="d-flex justify-space-around">
          <resource-button-delete
            text-button="Baja"
            @actionConfirmShowDialogDelete="leaveGroup(item)"
          />
        </div>
      </template>
    </v-data-table>
  </v-card-text>
</template>

<script>
import _ from 'lodash'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import componentButtonsCrud from '@/modules/resources/mixins/componentButtonsCrud'
import headersOppositionsTable from '../group-list/data/headersStudentsDatatable'
import computedDatatable from '@/modules/resources/mixins/computedDatatable'
import URLBuilderResources from '@/modules/resources/mixins/URLBuilderResources'
import DatatableManageStudents from '../../../mixins/DatatableManageStudents'
import moment from 'moment'
import GroupRepository from '../../../repositories/GroupRepository'

export default {
  name: 'DatatableStudents',
  components: {
    ResourceButtonDelete: () =>
      import(
        /* webpackChunkName: "ResourceButtonDelete" */ '@/modules/resources/components/resources/ResourceButtonDelete'
      ),
    ResourceButtonAdd: () =>
      import(
        /* webpackChunkName: "ResourceButtonAdd" */ '@/modules/resources/components/resources/ResourceButtonAdd'
      ),
    ResourceTextFieldSearch: () =>
      import(
        /* webpackChunkName: "ResourceTextFieldSearch" */ '@/modules/resources/components/resources/ResourceTextFieldSearch'
      ),
    ResourceBannerNoDataDatatable: () =>
      import(
        /* webpackChunkName: "ResourceBannerNoDataDatatable" */ '@/modules/resources/components/resources/ResourceBannerNoDataDatatable'
      )
  },
  mixins: [
    DatatableManageStudents,
    URLBuilderResources,
    headersOppositionsTable,
    computedDatatable,
    componentButtonsCrud
  ],
  data() {
    return {
      active: this.isActive || true, // Set the initial value to true or false based on your requirement.
      onCreate: false,
      searchWordText: '',
      studentSelected: null,
      itemsStudents: [],
      groupMembers: [],
      isLoading: false
    }
  },
  computed: {
    ...mapState('groupsService', [
      'itemsDatatable',
      'totalItems',
      'stateLoadingItems',
      'usersSelected',
      'tableOptions'
    ]),
    ...mapGetters('groupsService', ['vueTableOptions']),
    footerProps() {
      return {
        ...this.get_items_per_page_options_datatable,
        showFirstLastPage: true,
        firstIcon: 'mdi-arrow-collapse-left',
        lastIcon: 'mdi-arrow-collapse-right',
        prevIcon: 'mdi-minus',
        nextIcon: 'mdi-plus'
      }
    },
    getSelectedItems: {
      get() {
        return this.usersSelected
      },
      set(value) {
        this.SET_ITEMS_SELECTED(value)
      }
    },
    manageSearchWord: {
      get() {
        return this.searchWordText
      },
      set(value) {
        this.searchWordText = value
      }
    }
  },
  watch: {
    searchWord(value) {
      this.searchWordText = value
    }
  },

  created() {
    this.searchFieldWithDebounce = _.debounce(this.searchFieldWithDebounce, 600)
  },
  mounted() {
    this.getGroupsMembers()
    this.loadStudents()
  },

  methods: {
    ...mapActions('groupsService', [
      'getGroups',
      'deleteGroup',
      'getGroupsStudents'
    ]),
    ...mapMutations('groupsService', [
      'SET_ITEMS_SELECTED',
      'SET_EDIT_ITEM',
      'SET_TABLE_OPTIONS',
      'SET_ACTIVE_STUDENTS',
      'SET_STUDENTS_ITEMS_DATATABLE'
    ]),
    ...mapActions('studentsService', ['getStudents']),
    parseDate(date) {
      return moment(date).format('YYYY-MM-DD hh:mm')
    },
    isActive(option) {
      this.active = option
      this.SET_ACTIVE_STUDENTS(option)

      return option
    },
    async getGroupsMembers() {
      console.log('>> Loading')

      const groupId = this.$route.params.id
      const params = {
        discharged: '',
        orderBy: '',
        limit: '',
        offset: '',
        content: ''
      }

      const res = await GroupRepository.studentsList(groupId, params)

      this.groupMembers = res
    },
    async loadStudents() {
      const res = await this.getStudents({
        params: {
          'filter[role]': 'student',
          sort: '-created-at',
          'page[size]': 5,
          'page[number]': 1
        }
      })

      this.itemsStudents = res.data.data.map((item) => {
        return `${item.attributes['first_name']} ${item.attributes['last_name']}`
      })

      return res
    },
    async joinGroup() {
      this.isLoading = true
      const res = await this.loadStudents()
      const student = res.data.data.find(
        (item) =>
          `${item.attributes['first_name']} ${item.attributes['last_name']}` ===
          this.studentSelected
      )

      const params = {
        group_id: this.$route.params.id,
        user_id: student.id
      }

      await GroupRepository.joinGroup(params)
      this.getGroupsMembers()
      this.studentSelected = null
      this.isLoading = false
      this.onCreate = false
    },
    async leaveGroup(item) {
      if (!item) {
        return
      }

      console.log('====item', item)
      const result = await this.$swal.fire({
        toast: true,
        width: '400px',
        icon: 'question',
        title: 'ABANDONAR EL GRUPO',
        html: '<b>Esta acción es irreversible</b><br>¿Seguro que deseas abandonar el grupo? Todos los alumnos seran dados de baja y perderas el histórico del grupo',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonColor: '#007bff',
        confirmButtonText: 'Sí, abandonar',
        cancelButtonText: 'Cancelar'
      })

      if (!result.isConfirmed) {
        return
      }

      const params = {
        group_id: this.$route.params.id,
        user_id: item.uuid
      }

      const res = await GroupRepository.leaveGroup(params)

      if (!res) {
        return
      }
      this.$swal.fire({
        icon: 'success',
        toast: true,
        title: 'El grupo ha sido eliminado con éxito.',
        timer: 3000
      })

      this.getGroupsMembers()
    },
    searchFieldExecuted($event) {
      this.SET_TABLE_OPTIONS({ content: $event, offset: 0 })
      this.getGroupsMembers()
    },
    searchFieldWithDebounce(value) {
      this.searchFieldExecuted(value)
    },
    onOptionsUpdate(options) {
      this.SET_TABLE_OPTIONS({
        orderBy: options.sortBy[0] || 'created_at',
        order: options.sortDesc[0] ? 1 : -1,
        limit: options.itemsPerPage,
        offset: (options.page - 1) * options.itemsPerPage
      })

      this.getGroups()
    }
  }
}
</script>
<style scoped>
.v-data-table > .v-data-table__wrapper .v-data-table__mobile-table-row {
  margin-top: 10px;
  border: 2px solid #ededed;
  display: block;
  box-shadow: 10px 10px 11px 0px rgba(0, 0, 0, 0.32);
  -webkit-box-shadow: 10px 10px 11px 0px rgba(0, 0, 0, 0.32);
  -moz-box-shadow: 10px 10px 11px 0px rgba(0, 0, 0, 0.32);
}

/* each cell border in mobile */
.v-data-table > .v-data-table__wrapper .v-data-table__mobile-row {
  border-bottom: 2px solid #ededed;
}

.theme--light.v-divider {
  border-color: rgba(0, 0, 0, 0.6);
}

.circle {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.card {
  width: 100%;
  justify-content: space-between;
}

.input {
  width: 80%;
}

.button {
  width: 10%;
}
</style>
