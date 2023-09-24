<template>
  <ValidationProvider
    ref="autocomplete"
    v-slot="{ errors }"
    mode="aggressive"
    :rules="rules"
    name="etiquetas"
  >
    <v-autocomplete
      :value="lessons"
      :items="lessonsList"
      :loading="loading"
      :error-messages="errors"
      lessons-list
      clearable
      label="Lessiones"
      multiple
      solo
      outlined
      :dense="dense"
      item-text="name"
      item-value="id"
      return-object
      @change="onChangelessons"
      @update:search-input="loadLessons"
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
          <strong>{{ item.name }}</strong>
          &nbsp;
        </v-chip>
      </template>
    </v-autocomplete>
  </ValidationProvider>
</template>

<script>
import LessonRepository from '@/services/LessonRepository'
export default {
  name: 'LessonsAutoComplete',
  props: {
    limit: {
      type: Number,
      default: 5
    },
    dense: {
      type: Boolean,
      default: false
    },
    lessons: {
      type: Array,
      default: () => []
    },
    rules: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      lessonsList: [],
      loading: false
    }
  },
  mounted() {
    this.loadLessons()
  },
  methods: {
    async loadLessons(value) {
      this.loading = true
      const lessons = await LessonRepository.searchLessons({
        content: value,
        limit: this.limit
      })

      this.lessonsList = lessons.map((item) => {
        return {
        name: item.name,
        id: item.id
        }
      })
      this.loading = false
    },
    onChangelessons(value) {
      const lessonsIds = value.map((lesson) => lesson.id.toString())

      console.log({ lessonsIds })
      this.$emit('change', lessonsIds)
    },
    remove(item) {
      this.$emit(
        'change',
        this.lessons.filter((lesson) => lesson !== item)
      )
    },
    resetErrors() {
      this.$refs['autocomplete'] && this.$refs['autocomplete'].reset()
    }
  }
}
</script>
