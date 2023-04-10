<template>
  <div class="ma-2">
    <form-datatable-select-topic-groups :items="topicsGroups" @emitSelectedItems="getTopicsGroupsSelectedDatatable"/>
  </div>
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
