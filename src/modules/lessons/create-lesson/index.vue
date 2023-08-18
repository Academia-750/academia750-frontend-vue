<template>
  <div>
<<<<<<< Updated upstream
    <Vtoolbar :title="title" icon="mdi-book-open-variant" />
=======
    <Vtoolbar title="Crear Lessione" icon="mdi-book-open-variant"/>
>>>>>>> Stashed changes
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
              name="nombre"
              :outlined="false"
              rules="required|min:3|max:25|regex:^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ _-]+$"
            />
            <DateInput
              ref="datePicker"
<<<<<<< Updated upstream
              name="lesson_date"
              label="Fecha"
              :value="date"
              rules="required|valid_date"
=======
              :date="parseDate(lesson.date)"
>>>>>>> Stashed changes
              @datePicked="datePicked"
            />
            <v-row>
              <v-col class="py-0">
                <TimeInput
<<<<<<< Updated upstream
                  name="start_time"
                  :value="start_time"
                  label="Hora de inicio"
=======
                  ref="StartimePicker"
                  :time="lesson.start_time"
                  label="Start Time"
>>>>>>> Stashed changes
                  rules="required"
                  @change="selectedStartTime"
                />
              </v-col>
              <v-col class="py-0">
                <TimeInput
<<<<<<< Updated upstream
                  name="end_time"
                  :value="end_time"
                  label="Hora de finalización"
                  rules="required|after:@start_time,la hora de inicio"
                  @change="selectedEndTime"
                />
              </v-col>
            </v-row>
            <v-row class="mt-2 ml-1">
              <v-col cols="12" sm="4" md="3" lg="4" class="py-0">
                <SwitchInput
                  name="is_online"
                  :value="isOnlineLesson"
                  label="Clase Online"
                  @change="setOnline"
                />
              </v-col>
              <v-col v-if="isOnlineLesson" class="py-0">
                <FieldInput
                  ref="lessonMeetingUrlInput"
                  v-model="lessonMeetingUrl"
                  rules="required|url"
=======
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
>>>>>>> Stashed changes
                  :filled="true"
                  :outlined="false"
                  name="URL"
                  label="URL de la sala de reuniones de la lección"
                />
              </v-col>
            </v-row>
            <v-col
<<<<<<< Updated upstream
              v-if="lesson"
=======
>>>>>>> Stashed changes
              cols="12"
              sm="4"
              md="3"
              lg="4"
              class="py-0 ml-1"
            >
<<<<<<< Updated upstream
              <SwitchInput
                name="is_active"
                :value="isActiveLesson"
                :label="isActiveLesson ? 'Activa' : 'Inactiva'"
                @change="setActive"
              />
=======
              <SwitchInput :active="Boolean(lesson.is_active)" label="Active" @activate="activeLesson"/>
>>>>>>> Stashed changes
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
          <v-row class="d-flex ml-1 mr-1 mt-2 justify-space-between">
            <div>
              <ResourceButton
                :loading="loading"
                :text-button="lesson ? 'Editar' : 'Crear'"
                color="light-blue darken-3"
                icon-button="mdi-account-group"
                @click="createLesson"
<<<<<<< Updated upstream
              />
            </div>
            <div v-if="lesson" class="d-flex">
=======
              >
                <v-icon right dark class="mr-1"> mdi-account-group </v-icon>
                {{ lesson ? 'Editar' : 'Crear' }}
              </v-btn>
            </v-col>
            <v-col
              class="d-flex justify-end flex-column flex-sm-row"
            >
>>>>>>> Stashed changes
              <ResourceButtonAdd
                text-button="Agregar Materiales"
                :disabled="true"
              />
              <ResourceButtonAdd
                text-button="Agregar Estudiantes"
                :disabled="true"
              />
<<<<<<< Updated upstream

              <ResourceButtonDelete text-button="Eliminar" />
            </div>
=======
              <div class="mt-2">
                <resource-button-delete
                  text-button="Eliminar"
                />
              </div>
            </v-col>
>>>>>>> Stashed changes
          </v-row>
        </v-row>
      </section>
    </validation-observer>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
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
      ),
    ResourceButton: () =>
      import(
        /* webpackChunkName: "ResourceButton" */ '@/modules/resources/components/resources/ResourceButton'
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
    title() {
      return !this.lesson ? 'Nueva Clase' : `Editar ${this.lesson.name}`
    },
    headers() {
      return headers
    }
  },
  mounted() {
<<<<<<< Updated upstream
    this.reset()
    if (this.lesson) {
      this.name = this.lesson.name
      this.date = moment(this.lesson.date).format('YYYY-MM-DD')
      this.comment = this.lesson.description
      this.start_time = this.lesson.start_time
      this.end_time = this.lesson.end_time
      this.lessonMeetingUrl = this.lesson.url
      this.isActiveLesson = Boolean(this.lesson.is_active)
      this.isOnlineLesson = Boolean(this.lesson.is_online)
    }
=======
    
>>>>>>> Stashed changes
  },
  beforeCreate() {
    this?.$hasRoleMiddleware('admin')
  },
  methods: {
<<<<<<< Updated upstream
    ...mapMutations('lessonsStore', ['SET_LESSON']),

=======
    parseDate(date) {
      console.log(moment(date).format('YYYY/MM/DD'))

      return moment(date).format('YYYY/MM/DD')
    },
>>>>>>> Stashed changes
    async handlingErrorValidation(errorResponse = {}) {
      await this.$refs['FormCreateLesson']['setErrors'](errorResponse)
      if (!status) {
        return
      }
    },
    reset() {
<<<<<<< Updated upstream
      this.name = ''
      this.date = ''
      this.comment = ''
      this.date = ''
      this.start_time = ''
      this.end_time = ''
=======
      this.$refs['lessonMeetingUrlInput'] && this.$refs['lessonInput'].resetErrors()
      this.$refs['commentInput'].resetErrors()

      this.name = '',
      this.date = '',
      this.comment = '',
      this.date = null,
      this.start_time = null,
      this.end_time = null,
      this.url = ''
>>>>>>> Stashed changes
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
    setActive(active) {
      this.isActiveLesson = active
    },
    setOnline(active) {
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
        console.log({
          name: this.name,
          description: this.comment,
          date: this.date,
          start_time: this.start_time,
          end_time: this.end_time,
          is_online: this.isOnlineLesson,
          url: this.lessonMeetingUrl || undefined
        })
        lesson = await LessonRepository.update(lesson.id, {
          name: this.name,
          description: this.comment,
          date: this.date,
          start_time: this.start_time,
          end_time: this.end_time,
          is_online: this.isOnlineLesson,
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
        await this.$swal.fire({
          icon: 'success',
          toast: true,
          title: this.lesson ? 'Lección Actualizada!' : 'Lession Creada!',
          showConfirmButton: true,
          confirmButtonText: 'Entendido',
          timer: 7500
        })

        this.SET_LESSON(lesson)
        // this.$router.push({ name: 'manage-lessons' })
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
      inner: 'Crear Clase'
    }
  }
}
</script>
