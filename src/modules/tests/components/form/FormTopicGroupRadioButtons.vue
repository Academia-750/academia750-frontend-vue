<template>
  <ValidationProvider
    tag="div"
    :class="classGroupCheckboxSectionTopicsGroup"
    :vid="vid"
    mode="aggressive"
    name="Grupo de tema"
    :rules="rules"
  >
    <!-- <div class="ma-2">
      <v-checkbox
        v-model="is_checked_all_options"
        :error-messages="errors"
        @change="selectAllTopicsGroups"
      >
        <template v-slot:label>
          <span class="title font-weight-bold py-1">Seleccionar todos</span>
        </template>
      </v-checkbox>
    </div>
    <div v-for="topicGroup in topicsGroups" :key="topicGroup.id" class="ma-2">

      <v-checkbox
        v-model="topicGroupSelected"
        :error-messages="errors"
        :value="topicGroup.id"
      >
        <template v-slot:label>
          <span class="title font-weight-bold py-1">{{ topicGroup.attributes.name }}</span>
        </template>
      </v-checkbox>
    </div> -->
    <div class="ma-2">
      <form-datatable-select-topic-groups :items="topicsGroups" @emitSelectedItems="getTopicsGroupsSelectedDatatable"/>
    </div>
    <!-- <v-radio-group
      v-model="topicGroupSelected"
      :error-messages="errors"
      :disabled="isDisabled"
      row
    >
      <v-radio
        v-for="topicGroup in topicsGroups"
        :key="topicGroup.id"
        :value="topicGroup.id"
      >
        <template #label>
          <span class="title font-weight-bold py-1">{{ topicGroup.attributes.name }}</span>
        </template>
      </v-radio>
    </v-radio-group> -->
  </ValidationProvider>
</template>

<script>
import { mapActions } from 'vuex'
import FormDatatableSelectTopicGroups from './FormDatatableSelectTopicGroups'

export default {
  name: 'FormTopicGroupRadioButtons',
  components: {
    FormDatatableSelectTopicGroups
  },
  props: {
    vid: {
      type: String,
      required: true
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    rules: {
      type: [Object, String],
      required: true
    }
  },
  data() {
    return {
      topicGroupSelected: [],
      topicsGroups: []
    }
  },
  computed: {
    classGroupCheckboxSectionTopicsGroup () {
      return {
        'd-flex': this.$vuetify.breakpoint.width >= 650,
        'justify-center': this.$vuetify.breakpoint.width >= 650
      }
    },
    getAllTopicsGroupsId () {
      return this.topicsGroups.map((topic_group_item) => {
        return topic_group_item.id
      })
    }
  },
  watch: {
  },
  mounted () {
    this.loadTopicGroupsForSelect()
  },
  methods: {
    ...mapActions('topicsService', ['getTopicsGroups']),
    async loadTopicGroupsForSelect () {
      const { data } = await this.getTopicsGroups()

      this.topicsGroups = data.data.map((__topic_group_item) => {
        return {
          'topic-group-id': __topic_group_item.id,
          'topic-group-name': __topic_group_item.attributes.name
        }
      })
    },
    selectAllTopicsGroups () {
      this.topicGroupSelected = this.getAllTopicsGroupsId
    },
    getTopicsGroupsSelectedDatatable ($topicsGroupsSelectedDatatable) {
      this.topicGroupSelected = $topicsGroupsSelectedDatatable

      const TopicsGroupsSelectedMapped = $topicsGroupsSelectedDatatable.map((__topic_group) => {
        return __topic_group['topic-group-id']
      })

      this.$emit('TopicGroupTestBinding', TopicsGroupsSelectedMapped)
    }
  }
}
</script>
