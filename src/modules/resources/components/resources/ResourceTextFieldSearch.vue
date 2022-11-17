<template>
  <div
    :class="classesWrapper"
  >
    <v-text-field
      v-model="manageSearchWord"
      class="mx-3"
      label="Buscar"
      solo
      filled
      outlined
    >
      <template v-slot:append>
        <v-icon
          large
          style="cursor: pointer !important;"
          @click="emitSearchWord"
        >
          {{ iconAppend }}
        </v-icon>
      </template>
    </v-text-field>
  </div>
</template>

<script>
export default {
  name: 'ResourceTextFieldSearch',
  props: {
    iconAppend: {
      type: String,
      default: 'mdi-card-search'
    },
    searchWord: {
      type: String,
      default: ''
    },
    classesWrapper: {
      type: Object,
      default: function () {
        return {
          'my-2': true
        }
      }
    }
  },
  computed: {
    manageSearchWord: {
      get () {
        return this.searchWord
      },
      set (value) {
        this.emitSearchWord(value)
      }
    }
  },
  methods: {
    emitSearchWord (value) {
      this.$emit('emitSearchWord', value)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
