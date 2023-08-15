<template>
  <div>
    <v-toolbar
      flat
      class="indigo lighten-5 my-md-2 mx-md-2"
      outlined
      elevation="2"
    >
      <resource-button-go-back-router :width-number-limit="300" />
      <v-toolbar-title class="d-flex align-end">
        <v-icon large right class="mx-1">mdi-book-open-page-variant</v-icon>
        <span class="ml-2 font-weight-medium text-xs-caption text-sm-h7">
          Crear Lessione
        </span>
      </v-toolbar-title>
    </v-toolbar>
    <validation-observer ref="FormCreateLesson">
      <section class="px-2 py-2 d-flex flex-sm-column align-center">
        <v-row dense :style="{ width: '-webkit-fill-available' }">
          <v-col cols="12" sm="12" md="6" lg="6">
            <NameFieldInput
              v-model="name"
              rules="required|min:3|max:25|regex:^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ _-]+$"
            />
            <v-menu
              ref="datePicker"
              v-model="menu1"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="dateFormatted"
                  label="Date"
                  hint="MM/DD/YYYY format"
                  persistent-hint
                  prepend-icon="mdi-calendar"
                  v-bind="attrs"
                  filled
                  @blur="date = parseDate(dateFormatted)"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="date"
                no-title
                @input="menu1 = false"
              ></v-date-picker>
            </v-menu>
            <v-row>
              <v-col>
                <v-menu
                  ref="startTime"
                  v-model="openStartTimeModal"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="time"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="time"
                      label="Start Time"
                      prepend-icon="mdi-clock-time-four-outline"
                      readonly
                      v-bind="attrs"
                      filled
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="openStartTimeModal"
                    v-model="time"
                    full-width
                    @click:minute="$refs.menu.save(time)"
                  ></v-time-picker>
                </v-menu>
              </v-col>
              <v-col>
                <v-menu
                  ref="endTime"
                  v-model="openEndTimeModal"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="time"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="time"
                      label="End Time"
                      prepend-icon="mdi-clock-time-four-outline"
                      readonly
                      v-bind="attrs"
                      filled
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="openEndTimeModal"
                    v-model="time"
                    full-width
                    @click:minute="$refs.menu.save(time)"
                  ></v-time-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-col>
          <v-col
            cols="12"
            sm="12"
            md="6"
            lg="6"
            class=""
          >
            <CommentFieldInput v-model="code" rules="required" />
          </v-col>
          <v-col cols="12" class="d-flex justify-start flex-column flex-sm-row">
            <v-btn
              :loading="loading"
              color="light-blue darken-3"
              class="mt-3 white--text"
            >
              <v-icon right dark class="mr-1"> mdi-account-group </v-icon>
              {{ editItem ? 'Editar' : 'Crear' }}
            </v-btn>
          </v-col>
        </v-row>
      </section>
    </validation-observer>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'

export default {
  components: {
    ResourceButtonGoBackRouter: () =>
      import(
        /* webpackChunkName: "ResourceButtonGoBackRouter" */ '@/modules/resources/components/resources/ResourceButtonGoBackRouter'
      ),
    NameFieldInput: () =>
      import(
        /* webpackChunkName: "NameFieldInput" */ './components/NameFieldInput.vue'
      ),
    CommentFieldInput: () =>
      import(
        /* webpackChunkName: "CommentFieldInput" */ './components/CommentFieldInput.vue'
      )
  },
  data: (vm) => ({
      loading: false,
      code: '',
      name: '',
      selectedColor: '',
      time: null,
      menu1: false,
      openStartTimeModal: false,
      openEndTimeModal: false,
      modal2: false,
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      dateFormatted: vm.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10))
  }),
  computed: {
    computedDateFormatted () {
      return this.formatDate(this.date)
    }
  },
  watch: {
      date (val) {
        this.dateFormatted = this.formatDate(this.date)
      }
    },
  mounted() {
    
  },
  beforeCreate() {
    this?.$hasRoleMiddleware('admin')
  },
  methods: {
    async handlingErrorValidation(errorResponse = {}) {
      await this.$refs['FormCreateLesson']['setErrors'](errorResponse)
    },
    async formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')

        return `${month}/${day}/${year}`
    },
    async parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')

        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }
  },
  head: {
    title: {
      inner: 'Crear lession'
    }
  }
}
</script>
