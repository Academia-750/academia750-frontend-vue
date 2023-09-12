<template>
  <v-row justify="center">
    <v-dialog v-model="isOpen" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-subtitle-1 font-weight-bold">
            {{ title || 'Selecciona un perfil de usuario' }}
          </span>
        </v-card-title>
        <v-card-text>
          <div class="d-flex flex-wrap align-baseline card mt-1">
            <div class="input">
              <v-autocomplete
                ref="autocomplete"
                v-model="inputValue"
                :items="roles"
                :loading="loading"
                auto-select-first
                dense
                outlined
                small-chips
                clearable
                :autofocus="autofocus"
                item-text="name"
                item-value="alias_name"
                label="Buscar por nombre"
                return-object
                :no-filter="true"
                class="align-center"
                @change="onSelect"
                @update:search-input="loadProfiles"
              >
                <template v-slot:item="data">
                  <v-list-item-content>
                    <v-list-item-title>{{
                      data.item.alias_name
                    }}</v-list-item-title>
                  </v-list-item-content>
                </template>
              </v-autocomplete>
            </div>
            <v-btn
              dark
              color="blue darken-1"
              class="button"
              :loading="loading"
              @click="onOk"
            >
              OK
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import Swal from 'sweetalert2/dist/sweetalert2'
import ProfileRepository from '@/services/ProfileRepository'

export default {
  name: 'SearchRoleModal',
  props: {
    title: {
      type: String,
      default: ''
    },
    limit: {
      type: Number,
      default: 5
    },
    autofocus: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isOpen: false,
      selectedItem: false,
      roles: [],
      inputValue: '',
      loading: false
    }
  },
  watch: {
    isOpen() {
      this.reset()
    }
  },
  mounted() {
    this.selectedItem = false
    this.loadProfiles()
  },

  methods: {
    clearAutoComplete() {
      this.inputValue = ''
    },
    open() {
      this.isOpen = true
    },
    onSelect(item) {
      this.selectedItem = item
      this.$emit('change', item)
    },
    clear() {
      this.inputValue = ''
    },
    onOk() {
      if (!this.selectedItem) {
        Swal.fire({
          toast: true,
          timer: 1000,
          icon: 'warning',
          title: 'Seleccione a un role'
        })

        return
      }

      this.$emit('ok', this.selectedItem)
      this.isOpen = false
    },
    async loadProfiles(value) {
      this.loading = true

      const res = await ProfileRepository.list({
        content: value,
        limit: this.limit
      })

      this.roles = res.results

      console.log('roles', res.results)

      this.loading = false

      return res
    },
    reset() {
      // First time is not mounted
      this.$refs.studentAutoComplete && this.$refs.studentAutoComplete.clear()
      this.selectedItem = false
    }
  }
}
</script>
<style scoped>
.input {
  width: 80%;
}
.card {
  width: 100%;
  justify-content: space-between;
}
.button {
  width: 10%;
}
</style>
