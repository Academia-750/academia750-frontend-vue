<template>
  <ValidationProvider
    v-slot="{ errors }"
    vid="topic-group-id"
    mode="aggressive"
    name="Grupo de Tema"
    rules="required"
    tag="div"
  >
    <v-autocomplete
      v-model="topicGroupSelected"
      :items="itemsTopicGroups"
      dense
      filled
      outlined
      :loading="loading"
      :error-messages="errors"
      small-chips
      solo
      clearable
      item-text="text"
      item-value="value"
      label="Grupo de temas"
      return-object
    ></v-autocomplete>
  </ValidationProvider>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data: () => ({
    topicGroupSelected: null,
    dialog: false,
    loading: false,
    itemsTopicGroups: []
  }),
  computed: {
    fields() {
      if (!this.model) return []

      return Object.keys(this.model).map((key) => {
        return {
          key,
          value: this.model[key] || 'n/a'
        }
      })
    },
    items() {
      return this.entries.map((entry) => {
        const Description =
          entry.Description.length > this.descriptionLimit
            ? entry.Description.slice(0, this.descriptionLimit) + '...'
            : entry.Description

        return Object.assign({}, entry, { Description })
      })
    }
  },
  watch: {
    search(val) {
      // Items have already been loaded
      if (this.items.length > 0) return

      // Items have already been requested
      if (this.isLoading) return

      this.isLoading = true

      // Lazily load input items
      fetch('https://api.publicapis.org/entries')
        .then((res) => res.json())
        .then((res) => {
          const { count, entries } = res

          this.count = count
          this.entries = entries
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => (this.isLoading = false))
    }
  },
  mounted() {
    this.fetchTopicGroupsApi()
  },
  methods: {
    ...mapActions('topicsService', ['fetchTopicGroups']),
    mapItemsTopicGroups (response) {
      return response.data.data.map((item) => {
        return {
          text: item.attributes.name,
          value: item.id
        }
      })
    },
    async fetchTopicGroupsApi() {
      try {
        this.syllabus = []
        this.loading = true
        this.$loadingApp.enableLoadingProgressLinear()

        const response = await this.fetchTopicGroups({
          config: {}
        })

        this.itemsTopicGroups = this.mapItemsTopicGroups(response)

        this.$loadingApp.disabledLoadingProgressLinear()
        this.loading = false
      } catch (error) {
        console.log(error)
        this.loading = false
        this.$loadingApp.disabledLoadingProgressLinear()
      }
    }
  }
}
</script>
