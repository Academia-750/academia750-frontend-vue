<template>
  <v-card-text>
    <!-- ------------ ADD STUDENT TAGS ------------ -->
    <AddTagModal ref="addTag" @create="createTag" />
    <ServerDataTable
      ref="table"
      :headers="headers"
      store-name="TagStore"
      :load="loadTags"
    >
      <template v-slot:top>
        <!-- ------------ ACTIONS ------------ -->
        <Toolbar title="Temas" icon="mdi-tag">
          <template slot="actions">
            <ResourceButtonAdd text-button="Agregar" @click="addTag()" />
            <resource-button
              icon-button="mdi-autorenew"
              @click="resetTableOptions"
            />
          </template>
        </Toolbar>
        <resource-text-field-search
          :search-word="store.tableOptions.content"
          label-text-field="Buscar por tema."
          @emitSearchTextBinding="searchFieldWithDebounce"
          @emitSearchWord="searchFieldExecuted"
        />
      </template>

      <!-- ------------ NO DATA ------------ -->
      <template v-slot:no-data>
        <resource-banner-no-data-datatable />
      </template>

      <!-- ------------ SLOTS ------------ -->
      <template v-slot:[`item.actions`]="{ item }">
        <div class="d-flex justify-center">
          <resource-button-delete
            text-button="Eliminar"
            @actionConfirmShowDialogDelete="deleteTag(item)"
          />
        </div>
      </template>
    </ServerDataTable>
  </v-card-text>
</template>

<script>
import _ from 'lodash'
import { mapActions, mapMutations } from 'vuex'
import componentButtonsCrud from '@/modules/resources/mixins/componentButtonsCrud'
import TagRepository from '@/services/TagRepository'
import headers from './tags-table-columns'

export default {
  name: 'DatatableTags',
  components: {
    ResourceButtonAdd: () =>
      import(
        /* webpackChunkName: "ResourceButtonAdd" */ '@/modules/resources/components/resources/ResourceButtonAdd'
      ),
    ResourceBannerNoDataDatatable: () =>
      import(
        /* webpackChunkName: "ResourceBannerNoDataDatatable" */ '@/modules/resources/components/resources/ResourceBannerNoDataDatatable'
      ),
    ServerDataTable: () =>
      import(
        /* webpackChunkName: "ServerDataTable" */ '@/modules/resources/components/resources/server-data-table'
      ),
    Toolbar: () =>
      import(
        /* webpackChunkName: "Toolbar" */ '@/modules/resources/components/resources/toolbar'
      ),
    ResourceTextFieldSearch: () =>
      import(
        /* webpackChunkName: "ResourceTextFieldSearch" */ '@/modules/resources/components/resources/ResourceTextFieldSearch'
      ),
    ResourceButton: () =>
      import(
        /* webpackChunkName: "ResourceButton" */ '@/modules/resources/components/resources/ResourceButton'
      ),
    AddTagModal: () =>
      import(
        /* webpackChunkName: "AddTagModal" */ '@/modules/resources/components/resources/add-tag-modal'
      ),
    ResourceButtonDelete: () =>
      import(
        /* webpackChunkName: "ResourceButtonDelete" */ '@/modules/resources/components/resources/ResourceButtonDelete'
      )
  },
  mixins: [componentButtonsCrud],
  data() {
    return {
      searchWordText: '',
      loading: false
    }
  },
  computed: {
    headers() {
      return headers
    },
    store() {
      return this.$store.state.TagStore
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

  mounted() {},

  methods: {
    ...mapActions('TagStore', ['resetTableOptions']),
    ...mapMutations('TagStore', ['SET_TABLE_OPTIONS']),
    addTag() {
      this.$refs.addTag.open()
    },
    tableReload() {
      this.$refs.table.reload()
    },
    async loadTags(pagination) {
      const params = {
        ...pagination
      }

      const res = await TagRepository.list(params)

      return res
    },
    async createTag() {
      this.resetTableOptions()
      this.$refs.table.reload()
    },
    async deleteTag(tag) {
      if (!tag) {
        return
      }
      const result = await this.$swal.fire({
        toast: true,
        width: '400px',
        icon: 'question',
        title: '¿Seguro que deseas eliminar este tema? ',
        html: 'No podrá etiquetar nuevos materiales ni filtrar por este tema. Los materiales ya etiquetados seguiran teniendo el tema, será necesario eliminarla manualmente.',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonColor: '#007bff',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      })

      if (!result.isConfirmed) {
        return
      }

      const res = await TagRepository.delete(tag.id)

      if (!res) {
        return
      }
      this.$swal.fire({
        icon: 'success',
        toast: true,
        title: 'El tema ha sido eliminada correctamente.',
        timer: 3000
      })

      this.$refs.table.reload()
    },
    searchFieldExecuted($event) {
      this.SET_TABLE_OPTIONS({ content: $event, offset: 0 })
      this.tableReload()
    },
    searchFieldWithDebounce(value) {
      this.searchFieldExecuted(value)
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
</style>
