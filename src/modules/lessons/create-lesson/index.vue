<template>
  <div>
    <Vtoolbar title="Crear Clase" icon="mdi-book-open-variant" />
    <validation-observer ref="FormCreateLesson">
      <section class="px-2 py-2 d-flex flex-sm-column align-center">
        <v-row dense :style="{ width: '-webkit-fill-available' }">
          <v-col cols="12" sm="12" md="6" lg="6" class="py-0">
            <FieldInput
              ref="lessonInput"
              v-model="name"
              label="Nombre de la clase"
              :filled="true"
              :outlined="false"
              rules="required|min:3|max:25|regex:^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ _-]+$"
            />

            <DateInput
              ref="datePicker"
              label="Fecha"
              :value="date"
              rules="required"
              @datePicked="datePicked"
            />

            <v-row>
              <v-col class="py-0">
                <TimeInput
                  ref="StartimePicker"
                  :time="start_time"
                  label="Hora de Inicio"
                  rules="required"
                  @timeSelected="selectedStartTime"
                />
              </v-col>
              <v-col class="py-0">
                <TimeInput
                  ref="endTimePicker"
                  :time="end_time"
                  label="Hora de finalización"
                  rules="required"
                  @timeSelected="selectedEndTime"
                />
              </v-col>
            </v-row>
            <v-row class="ml-1">
              <v-col cols="12" sm="4" md="3" lg="4" class="py-0">
                <SwitchInput
                  :active="isOnlineLesson"
                  label="Clase Online"
                  @activate="OnlineLesson"
                />
              </v-col>
              <v-col
                v-if="isOnlineLesson || lessonMeetingUrl !== ''"
                class="py-0"
              >
                <FieldInput
                  ref="lessonMeetingUrlInput"
                  v-model="lessonMeetingUrl"
                  :filled="true"
                  :outlined="false"
                  label="URL de la sala de reuniones de la lección"
                />
              </v-col>
            </v-row>
            <v-col cols="12" sm="4" md="3" lg="4" class="py-0 ml-1">
              <SwitchInput
                :active="isActiveLesson"
                :label="isActiveLesson ? 'Activa' : 'Inactiva'"
                @activate="activeLesson"
              />
            </v-col>
          </v-col>
          <v-col cols="12" sm="12" md="6" lg="6">
            <CommentFieldInput
              ref="commentInput|max:1500"
              v-model="comment"
              rules="required"
            />
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
            <v-col class="d-flex justify-end flex-column flex-sm-row">
              <ResourceButtonAdd
                text-button="Añadir Materiales"
                :disabled="true"
              />
              <ResourceButtonAdd
                text-button="Añadir Estudiantes"
                :disabled="true"
              />
              <div class="mt-2">
                <resource-button-delete text-button="Eliminar" />
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
    this.reset()
    if (this.lesson) {
      this.name = this.lesson.name
      this.date = moment(this.lesson.date).format('YYYY-MM-DD')
      this.comment = this.lesson.comment
      this.start_time = this.lesson.start_time
      this.end_time = this.lesson.end_time
      this.lessonMeetingUrl = this.lesson.url
      this.isActiveLesson = Boolean(this.lesson.is_active)
      this.isOnlineLesson = Boolean(this.lesson.is_online)
    }
  },
  beforeCreate() {
    this?.$hasRoleMiddleware('admin')
  },
  methods: {
    async handlingErrorValidation(errorResponse = {}) {
      await this.$refs['FormCreateLesson']['setErrors'](errorResponse)
      if (!status) {
        return
      }
    },
    reset() {
      this.$refs['lessonMeetingUrlInput'] &&
        this.$refs['lessonMeetingUrlInput'].resetErrors()
      this.$refs['lessonInput'] && this.$refs['lessonInput'].resetErrors()
      this.$refs['lessonInput'] && this.$refs['commentInput'].resetErrors()

      this.name = ''
      this.date = ''
      this.comment = ''
      this.date = new Date()
      this.start_time = moment().add(1, 'hours').format('hh:00')
      this.end_time = moment().add(2, 'hours').format('hh:00')
      this.lessonMeetingUrl = ''
      this.isActiveLesson = false
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
