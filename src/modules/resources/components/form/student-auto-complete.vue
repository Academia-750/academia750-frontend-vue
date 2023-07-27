<template>
  <v-autocomplete
    v-model="inputValue"
    :items="itemsStudents"
    :loading="loading"
    auto-select-first
    dense
    outlined
    small-chips
    clearable
    item-text="text"
    item-value="uuid"
    label="Buscar por Nombre o DNI"
    return-object
    :no-filter="true"
    @change="onSelect"
    @update:search-input="loadStudents"
  >
    <template v-slot:item="data">
      <v-list-item-content>
        <v-list-item-title>{{ data.item.name }}</v-list-item-title>
        <v-list-item-subtitle>{{ data.item.dni }}</v-list-item-subtitle>
      </v-list-item-content>
    </template>
  </v-autocomplete>
</template>

<script>
import StudentRepository from '@/services/StudentRepository'
export default {
  name: 'StudentAutoComplete',
  props: {
    limit: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      itemsStudents: [],
      inputValue: '',
      loading: false
    }
  },

  mounted() {
    this.loadStudents('')
  },

  methods: {
    async loadStudents(value) {
      this.loading = true
      const students = await StudentRepository.search({
        content: value,
        limit: this.limit
      })

      this.itemsStudents = students.map((item) => {
        return {
          text: `${item['first_name']} ${item['last_name']}`,
          uuid: item.uuid,
          dni: item.dni,
          name: `${item['first_name']} ${item['last_name']}`
        }
      })
      this.loading = false
    },

    onSelect(item) {
      this.$emit('change', item)
    },
    clear() {
      this.inputValue = ''
    }
  }
}
</script>
