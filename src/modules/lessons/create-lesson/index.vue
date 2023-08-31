<template>
  <div>
    <Vtoolbar :title="title" icon="mdi-book-open-variant" />
    <validation-observer ref="FormCreateLesson">
      <section class="px-2 py-2 d-flex flex-sm-column align-center">
        <v-row dense :style="{ width: '-webkit-fill-available' }">
          <v-col cols="12" md="6">
            <FieldInput
              id="name"
              v-model="name"
              label="Nombre de la Clase"
              :filled="true"
              :outlined="false"
              :disabled="!canEdit"
              rules="required|min:3|max:50|regex:^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑ _-]+$"
            />
            <DateInput
              id="lesson_date"
              label="Fecha"
              :value="date"
              :disabled="!canEdit"
              rules="required|valid_date"
              @datePicked="datePicked"
            />
            <v-row>
              <v-col class="py-0">
                <TimeInput
                  id="start_time"
                  :disabled="!canEdit"
                  :value="start_time"
                  label="Hora de inicio"
                  rules="required|after:07:00, 7:00"
                  @change="selectedStartTime"
                />
              </v-col>
              <v-col class="py-0">
                <TimeInput
                  id="end_time"
                  :value="end_time"
                  :disabled="!canEdit"
                  label="Hora de finalización"
                  rules="required|after:@start_time,la hora de inicio|before:21:00, 21:00"
                  @change="selectedEndTime"
                />
              </v-col>
            </v-row>
            <v-row class="ml-1 align-start">
              <v-col cols="12" md="4" class="py-0 pl-0">
                <SwitchInput
                  id="is_online"
                  :value="isOnlineLesson"
                  :disabled="!canEdit"
                  label="Clase Online"
                  @click="setOnline"
                />
              </v-col>
              <v-col v-if="isOnlineLesson" cols="12" md="8" class="py-0 pl-0">
                <FieldInput
                  id="url"
                  v-model="lessonMeetingUrl"
                  rules="required|url"
                  :filled="true"
                  :outlined="false"
                  :disabled="!canEdit"
                  label="URL de la sala de reuniones de la lección"
                />
              </v-col>
            </v-row>
            <v-row class="ml-1 align-start">
              <v-col
                v-if="lesson"
                cols="12"
                sm="4"
                md="3"
                lg="4"
                class="py-0 pl-0"
              >
                <SwitchInput
                  id="is_active"
                  :value="isActiveLesson"
                  :label="isActiveLesson ? 'Activa' : 'Inactiva'"
                  @click="activateLesson"
                />
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" md="6">
            <TextAreaInput
              id="comment"
              v-model="comment"
              label="Descripción"
              rules="required"
              :disabled="!canEdit"
            />
          </v-col>
          <v-row class="d-flex ml-1 mr-1 mt-2 justify-space-between">
            <div>
              <ResourceButton
                :loading="loading"
                :text-button="lesson ? 'Editar' : 'Crear'"
                color="primary"
                icon-button="mdi-account-group"
                @click="createLesson"
              />
            </div>
            <div v-if="lesson" class="d-flex">
              <resource-button
                text-button="Materiales"
                icon-button="mdi-folder-open"
                color="success"
                :disabled="true"
              />
              <resource-button
                text-button="Alumnos"
                icon-button="mdi-account-group"
                color="success"
                :disabled="true"
              />

              <resource-button
                text-button="Eliminar"
                icon-button="mdi-delete"
                color="red"
                @click="deleteLesson"
              />
            </div>
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
    TextAreaInput: () =>
      import(
        /* webpackChunkName: "TextAreaInput" */ '@/modules/resources/components/form/text-area-input.vue'
      ),
    ResourceButton: () =>
      import(
        /* webpackChunkName: "ResourceButton" */ '@/modules/resources/components/resources/ResourceButton'
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
    title() {
      return !this.lesson ? 'Nueva Clase' : `Editar "${this.lesson.name}":`
    },
    canEdit() {
      return this.isActiveLesson === false
    },
    headers() {
      return headers
    }
  },
  mounted() {
    this.reset()
  },
  beforeCreate() {
    this?.$hasRoleMiddleware('admin')
  },
  methods: {
    ...mapMutations('lessonsStore', ['SET_LESSON']),
    reset() {
      this.name = ''
      this.date = ''
      this.comment = ''
      this.date = this.$route.query.date || ''
      this.start_time = ''
      this.end_time = ''
      this.lessonMeetingUrl = ''
      this.isActiveLesson = false
      this.isOnlineLesson = false
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
      this.reset()
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

        lesson = await LessonRepository.update(lesson.id, {
          name: this.name,
          description: this.comment,
          date: this.date,
          start_time: this.start_time,
          end_time: this.end_time,
          is_online: this.isOnlineLesson,
          url: this.lessonMeetingUrl || undefined
        })

        if (!lesson) {
          this.loading = false

          return
        }
        this.loading = false
        await this.$swal.fire({
          icon: 'success',
          toast: true,
          title: this.lesson ? 'Clase Actualizada!' : 'Clase Creada!',
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

    async activateLesson(value) {
      const active = value || false // is returning  NULL instead of false

      if (active === true) {
        const result = await this.$swal.fire({
          toast: true,
          width: '400px',
          icon: 'question',
          title: 'Activar Clase',
          html: 'Si activa esta clase, los alumnos serán notificados y podrán acceder a los materiales.',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonColor: '#007bff',
          confirmButtonText: 'Sí, activala',
          cancelButtonText: 'Cancelar'
        })

        if (!result.isConfirmed) {
          this.$nextTick(() => {
            this.isActiveLesson = false
          })

          return
        }
      }

      const res = await LessonRepository.active(this.lesson.id, {
        active
      })

      if (!res) {
        return
      }
      this.isActiveLesson = active
      this.lesson.is_active = active
      this.SET_LESSON(this.lesson)
      this.reset()
    },
    async deleteLesson() {
      if (this.lesson.is_active) {
        await this.$swal.fire({
          toast: true,
          width: '400px',
          title: 'No se puede eliminar',
          html: 'Las clases activas no pueden ser eliminadas',
          showConfirmButton: true,
          confirmButtonText: 'Entendido'
        })

        return
      }
      const result = await this.$swal.fire({
        toast: true,
        width: '400px',
        icon: 'question',
        title: 'Eliminar',
        html: '<b>Esta acción es irreversible</b><br>¿Seguro que deseas eliminar esta clase?',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonColor: '#007bff',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      })

      if (!result.isConfirmed) {
        return
      }

      const res = await LessonRepository.delete(this.lesson.id)

      if (!res) {
        return
      }
      await this.$swal.fire({
        icon: 'success',
        toast: true,
        title: 'Clase eliminada!',
        showConfirmButton: true,
        confirmButtonText: 'Entendido',
        timer: 7500
      })
      this.SET_LESSON(false)
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
