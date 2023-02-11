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
      topicGroupSelected: [],
      topicsGroups: []
    }
  },
  watch: {
    topicGroupSelected(value) {
      console.log(value)
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
