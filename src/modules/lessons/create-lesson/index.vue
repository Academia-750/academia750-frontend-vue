<template>
  <div>
    <Vtoolbar title="Crear Lessione" icon="mdi-book-open-variant"/>
    <validation-observer ref="FormCreateLesson">
      <section class="px-2 py-2 d-flex flex-sm-column align-center">
        <v-row dense :style="{ width: '-webkit-fill-available' }">
          <v-col
            cols="12"
            sm="12"
            md="6"
            lg="6"
            class="py-0"
          >
            <FieldInput
              ref="lessonInput"
              v-model="lesson.name"
              label="Nombre del Lession"
              :filled="true"
              :outlined="false"
              rules="required|min:3|max:25|regex:^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ _-]+$"
            />
            <DateInput
              ref="datePicker"
              :date="parseDate(lesson.date)"
              @datePicked="datePicked"
            />
            <v-row>
              <v-col class="py-0">
                <TimeInput
                  ref="StartimePicker"
                  :time="lesson.start_time"
                  label="Start Time"
                  rules="required"
                  @timeSelected="selectedStartTime"
                />
              </v-col>
              <v-col class="py-0">
                <TimeInput
                  ref="endTimePicker"
                  :time="lesson.end_time"
                  label="End Time"
                  rules="required"
                  @timeSelected="selectedEndTime"
                />
              </v-col>
            </v-row>
            <v-row class="ml-1">
              <v-col
                cols="12"
                sm="4"
                md="3"
                lg="4"
                class="py-0"
              >
                <SwitchInput :active="Boolean(lesson.is_online)" label="Is Online" @activate="OnlineLesson"/>
              </v-col>
              <v-col v-if="isOnlineLesson || lesson.url !== ''" class="py-0">
                <FieldInput
                  ref="lessonMeetingUrlInput"
                  v-model="lesson.url"
                  :filled="true"
                  :outlined="false"
                  label="URL de la sala de reuniones de la lección"
                />
              </v-col>
            </v-row>
            <v-col
              cols="12"
              sm="4"
              md="3"
              lg="4"
              class="py-0 ml-1"
            >
              <SwitchInput :active="Boolean(lesson.is_active)" label="Active" @activate="activeLesson"/>
            </v-col>
          </v-col>
          <v-col
            cols="12"
            sm="12"
            md="6"
            lg="6"
          >
            <CommentFieldInput ref="commentInput" v-model="lesson.description" rules="required" />
          </v-col>
          <v-row>
            <v-col
              cols="12"
              sm="12"
              md="5"
              lg="6"
              class="d-flex ml-1 justify-start flex-column flex-sm-row"
            >
              <v-btn
                :loading="loading"
                color="light-blue darken-3"
                class="mt-3 white--text"
                @click="createLesson"
              >
                <v-icon right dark class="mr-1"> mdi-account-group </v-icon>
                {{ lesson ? 'Editar' : 'Crear' }}
              </v-btn>
            </v-col>
            <v-col
              class="d-flex justify-end flex-column flex-sm-row"
            >
              <ResourceButtonAdd
                text-button="Agregar Materiales"
                :disabled="true"
              />
              <ResourceButtonAdd
                text-button="Agregar Estudiantes"
                :disabled="true"
              />
              <div class="mt-2">
                <resource-button-delete
                  text-button="Eliminar"
                />
              </div>
            </v-col>
          </v-row>
        </v-row>
      </section>
    </validation-observer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import LessonRepository from '@/services/LessonRepository'
import moment from 'moment'

export default {
  components: {
    Vtoolbar: () =>
      import(
        /* webpackChunkName: "Vtoolbar" */ '@/modules/resources/components/resources/toolbar'
      ),
    FieldInput: () =>
      import(
        /* webpackChunkName: "FieldInput" */ '@/modules/resources/components/form/input.vue'
      ),
    DateInput: () =>
      import(
        /* webpackChunkName: "DateInput" */ '@/modules/resources/components/form/date-input.vue'
      ),
    TimeInput: () =>
      import(
        /* webpackChunkName: "DateInput" */ '@/modules/resources/components/form/time-input.vue'
      ),
    SwitchInput: () =>
      import(
        /* webpackChunkName: "DateInput" */ '@/modules/resources/components/form/switch-input.vue'
      ),
    CommentFieldInput: () =>
      import(
        /* webpackChunkName: "CommentFieldInput" */ './components/CommentFieldInput.vue'
      ),
    ResourceButtonDelete: () =>
      import(
        /* webpackChunkName: "ResourceButtonDelete" */ '@/modules/resources/components/resources/ResourceButtonDelete'
      ),
    ResourceButtonAdd: () =>
      import(
        /* webpackChunkName: "ResourceButtonAdd" */ '@/modules/resources/components/resources/ResourceButtonAdd'
      )
  },
  props: {
    lesson: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      loading: false,
      lessonMeetingUrl: '',
      comment: '',
      name: '',
      date: null,
      start_time: null,
      end_time: null,
      isActiveLesson: false,
      isOnlineLesson: false
    }
  },
  computed: {
    ...mapState('lessonsStore', ['lesson']),

    headers() {
      return headers
    }
  },
  mounted() {
    
  },
  beforeCreate() {
    this?.$hasRoleMiddleware('admin')
  },
  methods: {
    parseDate(date) {
      console.log(moment(date).format('YYYY/MM/DD'))

      return moment(date).format('YYYY/MM/DD')
    },
    async handlingErrorValidation(errorResponse = {}) {
      await this.$refs['FormCreateLesson']['setErrors'](errorResponse)
      if (!status) {
        return
      }
    },
    reset() {
      this.$refs['lessonMeetingUrlInput'] && this.$refs['lessonInput'].resetErrors()
      this.$refs['commentInput'].resetErrors()

      this.name = '',
      this.date = '',
      this.comment = '',
      this.date = null,
      this.start_time = null,
      this.end_time = null,
      this.url = ''
      this.lessonMeetingUrl = ''
      this.isActiveLesson = false,
      this.isOnlineLesson = false
    },
    datePicked(date) {
      this.date = date
    },
    selectedStartTime(time) {
      this.start_time = time
    },
    selectedEndTime(time) {
      this.end_time = time
    },
    activeLesson(active) {
      this.isActiveLesson = active
    },
    OnlineLesson(active) {
      this.isOnlineLesson = active
    },
    async createLesson() {
      const status = await this.$refs['FormCreateLesson'].validate()

      if (!status) {
        return
      }
      this.loading = true

      let { lesson } = this

      try {
        if (!this.lesson) {
          lesson = await LessonRepository.create({
            name: this.name,
            date: this.date,
            start_time: this.start_time,
            end_time: this.end_time
          })
        }
        lesson = await LessonRepository.update(lesson.id, {
          name: this.name,
          description: this.comment,
          date: this.date,
          start_time: this.start_time,
          end_time: this.end_time,
          url: this.lessonMeetingUrl || undefined
        })

        if (this.isActiveLesson) {
          const res = await LessonRepository.active(lesson.id, {
            active: this.isActiveLesson
          })
        }

        if (!lesson) {
          this.loading = false

          return
        }
        this.loading = false
        this.reset()
        await this.$swal.fire({
          icon: 'success',
          toast: true,
          title: this.lesson ? 'Lession Actualizado!' : 'Lession Creado!',
          showConfirmButton: true,
          confirmButtonText: 'Entendido',
          timer: 7500
        })
        this.$router.push({ name: 'manage-lessons' })
      } catch (error) {
        console.error(error)
        this.loading = false
      }
    },
    async deleteLesson(lesson) {
      const res = await LessonRepository.delete(lesson.id)

      if (!res) {
        return
      }
      await this.$swal.fire({
        icon: 'success',
        toast: true,
        title: 'Lession Eliminado!',
        showConfirmButton: true,
        confirmButtonText: 'Entendido',
        timer: 7500
      })
      this.$router.push({ name: 'manage-lessons' })
    }
  },
  head: {
    title: {
      inner: 'Crear lession'
    }
  }
}
</script>
