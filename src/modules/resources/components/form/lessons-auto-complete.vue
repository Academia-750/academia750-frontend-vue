<template>
  <ValidationProvider
    ref="autocomplete"
    v-slot="{ errors }"
    mode="aggressive"
    :rules="rules"
    name="lessons"
  >
    <v-autocomplete
      :value="lessons"
      :items="lessonsList"
      :loading="loading"
      :error-messages="errors"
      lessons-list
      clearable
      label="Nombre de la clase"
      multiple
      solo
      outlined
      :dense="dense"
      item-text="name"
      item-value="id"
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
          @click:close="remove(item.id)"
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
      this.$emit('change', value)
    },
    remove(id) {
      this.$emit(
        'change',
        this.lessons.filter((lessonId) => lessonId !== id)
      )
    },
    resetErrors() {
      this.$refs['autocomplete'] && this.$refs['autocomplete'].reset()
    }
  }
}
</script>
