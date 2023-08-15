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
            <FieldInput
              ref="lessonInput"
              v-model="name"
              label="Nombre del Lession"
              rules="required|min:3|max:25|regex:^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ _-]+$"
            />
            <DateInput
              ref="datePicker"
              @datePicked="datePicked"
            />
            <v-row>
              <v-col>
                <TimeInput
                  ref="StartimePicker"
                  label="Start Time"
                  @timeSelected="selectedStartTime"
                />
              </v-col>
              <v-col>
                <TimeInput
                  ref="endTimePicker"
                  label="End Time"
                  @timeSelected="selectedEndTime"
                />
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
              Crear
            </v-btn>
          </v-col>
        </v-row>
      </section>
    </validation-observer>
  </div>
</template>

<script>

export default {
  components: {
    ResourceButtonGoBackRouter: () =>
      import(
        /* webpackChunkName: "ResourceButtonGoBackRouter" */ '@/modules/resources/components/resources/ResourceButtonGoBackRouter'
      ),
    FieldInput: () =>
      import(
        /* webpackChunkName: "FieldInput" */ '@/modules/resources/components/form/FieldInput.vue'
      ),
    DateInput: () =>
      import(
        /* webpackChunkName: "DateInput" */ '@/modules/resources/components/form/date-input.vue'
      ),
    TimeInput: () =>
      import(
        /* webpackChunkName: "DateInput" */ '@/modules/resources/components/form/time-input.vue'
      ),
    CommentFieldInput: () =>
      import(
        /* webpackChunkName: "CommentFieldInput" */ './components/CommentFieldInput.vue'
      )
  },
  data() {
    return {
      loading: false,
      code: '',
      name: '',
      date: null,
      selectedColor: '',
      startTime: null,
      endTime: null,
      openStartTimeModal: false,
      openEndTimeModal: false,
      modal2: false
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
    datePicked(date) {
      this.date = date
    },
    selectedStartTime(time) {
      this.startTime = time
    },
    selectedEndTime(time) {
      this.startTime = time
    }
  },
  head: {
    title: {
      inner: 'Crear lession'
    }
  }
}
</script>
