<template>
  <v-data-table
    :value="state.selected"
    :loading="loading"
    :headers="headers"
    :items="state.items"
    :item-key="itemKey"
    show-select
    no-data-text="No hay datos disponibles"
    :mobile-breakpoint="700"
    class="elevation-1"
    :server-items-length="state.totalItems"
    :footer-props="footerProps"
    :items-per-page="vueTableOptions.limit"
    :sort-by="vueTableOptions.sortBy"
    :sort-desc="vueTableOptions.sortDesc"
    :page="vueTableOptions.page"
    @update:options="onOptionsUpdate"
    @input="setSelected"
  >
    <template v-for="(_, name) in $scopedSlots" v-slot:[name]="slotProps">
      <slot :name="name" v-bind="slotProps || {}"></slot>
    </template>
  </v-data-table>
</template>
<script lang="ts">
import computedDatatable from '@/modules/resources/mixins/computedDatatable'

export default {
  name: 'ServerDataTable',
  mixins: [computedDatatable],
  props: {
    headers: {
      type: Array,
      default: () => []
    },
    storeName: {
      type: String,
      required: true
    },
    load: {
      type: Function,
      required: true
    },
    itemKey: {
      type: String,
      default: 'id'
    }
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
    state() {
      return this.$store.state[this.storeName]
    },
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
    vueTableOptions() {
      return this.$store.getters[`${this.storeName}/vueTableOptions`]
    }
  },
  methods: {
    setSelected(value) {
      this.$store.commit(`${this.storeName}/SET_ITEMS_SELECTED`, value)

      console.log({ selected: this.state.selected })
    },
    onOptionsUpdate(options) {
      this.$store.commit(`${this.storeName}/SET_TABLE_OPTIONS`, {
        orderBy: options.sortBy[0] || 'updated_at',
        order: options.sortDesc[0] ? -1 : 1,
        limit: options.itemsPerPage,
        offset: (options.page - 1) * options.itemsPerPage
      })
      this.reload()
    },

    async reload() {
      this.loading = true
      const response = await this.load(this.state.tableOptions)

      this.loading = false
      if (!response) {
        return
      }
      this.$store.dispatch(`${this.storeName}/setTableItems`, response)
    }
  }
}
</script>
