<template>
  <ValidationProvider
    ref="autocomplete"
    v-slot="{ errors }"
    mode="aggressive"
    :rules="rules"
    :name="name"
  >
    <v-autocomplete
      :search-input="search"
      :value="values"
      :items="items"
      :loading="loading"
      :error-messages="errors"
      clearable
      :label="label || name"
      multiple
      solo
      outlined
      :dense="dense"
      :item-text="itemText"
      :item-value="itemValue"
      @change="change"
      @update:search-input="load"
      @focus="cleanSearch"
    >
      <template v-slot:selection="{ attrs, item, select, selected }">
        <v-chip
          v-bind="attrs"
          :input-value="selected"
          close
          small
          @click="select"
          @click:close="remove(item)"
        >
          <strong>{{ itemText ? item[itemText] : item }}</strong>
          &nbsp;
        </v-chip>
      </template>
    </v-autocomplete>
  </ValidationProvider>
</template>

<script>
export default {
  name: 'BaseMultipleAutocomplete',
  props: {
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    limit: {
      type: Number,
      default: 5
    },
    dense: {
      type: Boolean,
      default: false
    },
    values: {
      type: Array,
      default: () => []
    },
    rules: {
      type: String,
      default: ''
    },
    loadData: {
      type: Function,
      required: true
    },
    itemText: {
      type: String,
      default: ''
    },
    itemValue: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      search: '',
      loading: false,
      items: []
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    async load(search) {
      this.search = search
      this.loading = true

      this.items = await this.loadData(search)

      this.items = [...this.items, ...this.values]

      this.loading = false
    },
    change(values) {
      this.$emit('change', values)
      this.search = ''
    },
    cleanSearch() {
      this.load('')
    },
    remove(item) {
      const id = this.itemValue ? item[this.itemValue] : item

      this.$emit(
        'change',
        this.values.filter((value) => value !== id)
      )
    },
    resetErrors() {
      this.$refs['autocomplete'] && this.$refs['autocomplete'].reset()
    }
  }
}
</script>
