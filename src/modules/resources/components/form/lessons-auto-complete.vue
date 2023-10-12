<template>
  <BaseAutocomplete
    ref="autocomplete"
    name="lessons"
    label="Nombre de la clase"
    :limit="limit"
    :values="lessons"
    :rules="rules"
    :load-data="loadLessons"
    item-text="name"
    item-value="id"
    @change="onChange"
  />
</template>

<script>
/**
 * We edited this field but is not in use, maybe next time we use is a little issue on it.
 */
import LessonRepository from '@/services/LessonRepository'
import BaseAutocomplete from './base-multiple-autocomplete.vue'

export default {
  name: 'LessonsAutoComplete',
  components: { BaseAutocomplete },
  props: {
    limit: {
      type: Number,
      default: 5
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
  methods: {
    async loadLessons(value) {
      const lessons = await LessonRepository.searchLessons({
        content: value,
        limit: this.limit
      })

      return lessons.map((item) => {
        return {
          name: item.name,
          id: item.id
        }
      })
    },
    onChange(value) {
      this.$emit('change', value)
    },
    resetErrors() {
      this.$refs['autocomplete'] && this.$refs['autocomplete'].resetErrors()
    }
  }
}
</script>
