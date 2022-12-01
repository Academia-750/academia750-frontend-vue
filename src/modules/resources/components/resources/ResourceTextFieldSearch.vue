<template>
  <div
    :class="classesWrapper"
  >
    <v-text-field
      v-model="manageSearchWord"
      class="mx-3"
      :label="labelTextField"
      solo
      filled
      outlined
      clearable
      @keyup.enter="emitSearchWord"
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
    },
    labelTextField: {
      type: String,
      default: 'Buscar'
    }
  },
  data () {
    return {
      searchWordText: ''
    }
  },
  computed: {
    manageSearchWord: {
      get () {
        return this.searchWordText
      },
      set (value) {
        this.searchWordText = value
      }
    }
  },
  watch: {
    searchWord (value) {
      this.searchWordText = value
    }
  },
  methods: {
    emitSearchWord () {
      this.$emit('emitSearchWord', this.searchWordText)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
