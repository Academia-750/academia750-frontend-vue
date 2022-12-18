<template>
  <ValidationProvider
    v-slot="{ errors }"
    tag="div"
    class="d-flex justify-center"
    :vid="vid"
    mode="aggressive"
    name="Grupo de tema"
    :rules="rules"
  >
    <v-radio-group
      v-model="topicGroupSelected"
      active-class="blue lighten-4"
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
    </v-radio-group>
  </ValidationProvider>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'FormTopicGroupRadioButtons',
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
      topicGroupSelected: null,
      topicsGroups: []
    }
  },
  watch: {
    topicGroupSelected(value) {
      this.$emit('TopicGroupTestBinding', value)
    }
  },
  mounted () {
    this.loadTopicGroupsForSelect()
  },
  methods: {
    ...mapActions('topicsService', ['getTopicsGroups']),
    async loadTopicGroupsForSelect () {
      const { data } = await this.getTopicsGroups()

      this.topicsGroups = data.data
    }
  }
}
</script>
