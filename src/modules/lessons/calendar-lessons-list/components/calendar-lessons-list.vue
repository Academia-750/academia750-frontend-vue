<template>
  <div>
    <v-toolbar 
      flat
      class="indigo lighten-5"
      outlined 
    >
      <resource-title-toolbar-datatable title-text="Lessiones" />

      <v-row class="ml-1">
        <v-col cols="auto">
          <span
            class="circle"
          ></span>
        </v-col>
        <v-col cols="auto">
          <div class=""><span class="font-weight-bold subtitle-2">Lession: </span> {{ lesson.name }}</div>
        </v-col>
        <v-col cols="auto">
          <div><span class="font-weight-bold subtitle-2">Fecha: </span>{{ lesson.date }}</div>
        </v-col>
        <v-col cols="auto">
          <div><span class="font-weight-bold subtitle-2">tiempo: </span>{{ `${lesson.start_time} - ${lesson.end_time}` }}</div>
        </v-col>
        <v-col cols="auto">
          <div><span class="font-weight-bold subtitle-2">Estudiantes totales: </span>{{ lesson.student_count }}</div>
        </v-col>
      </v-row>

      <v-spacer />
      <resource-button-edit
        :config-route="{ name: 'create-lessons' }"
      />
      <resource-button-edit
        text-button="Materials"
        :config-route="{}"
        :only-dispatch-click-event="true"
      />
      <resource-button-edit
        text-button="Students"
        :config-route="{}"
        icon-button=""
        :only-dispatch-click-event="true"
      />
      
    </v-toolbar>
    <v-row>
      <v-col>
        <v-sheet>
          <v-toolbar
            flat
            class="d-flex justify-end flex-wrap"
          >
            <v-btn
              fab
              x-small
              color="primary"
              @click="prev"
            >
              <v-icon small>
                mdi-chevron-left
              </v-icon>
            </v-btn>
            <v-toolbar-title v-if="$refs.calendar" class="mx-3 font-weight-medium text-h5">
              {{ $refs.calendar.title }}
            </v-toolbar-title>
            <v-btn
              fab
              x-small
              color="primary"
              class="mr-16"
              :style="{ marginRight: '300px !important'}"
              @click="next"
            >
              <v-icon small>
                mdi-chevron-right
              </v-icon>
            </v-btn>
            <ResourceButtonAdd
              class="ml-16" 
              text-button="Crear lession"
              @click="addLesson"
            />
          </v-toolbar>
        </v-sheet>
        <v-sheet height="600">
          <v-calendar
            ref="calendar"
            v-model="focus"
            color="primary"
            :events="events"
            :event-color="getEventColor"
            :type="type"
            @click:event="showEvent"
            @click:more="viewDay"
            @click:date="viewDay"
            @change="updateRange"
          ></v-calendar>
          <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-x
          >
            <v-card
              color="grey lighten-4"
              min-width="350px"
              flat
            >
              <v-toolbar
                :color="selectedEvent.color"
                dark
              >
                <v-btn icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <span v-html="selectedEvent.details"></span>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  text
                  color="secondary"
                  @click="selectedOpen = false"
                >
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
  
</template>

<script>
import _ from 'lodash'
import { mapMutations, mapActions, mapState } from 'vuex'
import componentButtonsCrud from '@/modules/resources/mixins/componentButtonsCrud'
import LessonRepository from '@/services/LessonRepository'

export default {
  name: 'CalendarLessonsList',
  components: {
    ResourceButtonEdit: () =>
      import(
        /* webpackChunkName: "ResourceButtonEdit" */ '@/modules/resources/components/resources/ResourceButtonEdit'
      ),
    ResourceTitleToolbarDatatable: () =>
      import(
        /* webpackChunkName: "ResourceTitleToolbarDatatable" */ '@/modules/resources/components/resources/ResourceTitleToolbarDatatable'
      ),
    ResourceButtonAdd: () =>
      import(
        /* webpackChunkName: "ResourceButtonAdd" */ '@/modules/resources/components/resources/ResourceButtonAdd'
      )
  },
  mixins: [componentButtonsCrud],
  data: () => ({
      focus: '',
      from: '',
      to: '',
      content: '',
      lessons: [],
      type: 'month',
      typeToLabel: {
        month: 'Month',
        week: 'Week',
        day: 'Day',
        '4day': '4 Days'
      },
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
      colors: [],
      names: []
    }),
  computed: {
    ...mapState('lessonsStore', ['lesson']),

    headers() {
      return headers
    }
  },
  mounted () {
      this.$refs.calendar.checkChange()
    },
    methods: {
      ...mapActions('lessonsStore', [
      'lesson'
    ]),
    ...mapMutations('lessonsStore', [
      'SET_LESSON'
    ]),
      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
      },
      getEventColor (event) {
        return event.color
      },
      setToday () {
        this.focus = ''
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      async showEvent ({ event }) {
        const lesson = this.lessons.find(
          (item) => item.id === event.id
        )

        this.SET_LESSON(lesson)

      },
      addLesson() {
        this.$router.push({ name: 'create-lesson' })
      },
      updateRange ({ start, end }) {
        this.getCalendarLessons({ start, end })
      },
      async getCalendarLessons({ start, end }) {
        const params = {
          from: start.date,
          to: end.date,
          content: this.content
        }
        const lessons = await LessonRepository.calendar(params)

        if (!lessons) {
          return
        }
        this.lessons = lessons.results
        this.SET_LESSON(this.lessons[0])
        this.events = lessons.results.map(
          (item) => {
            return {
              id: item.id,
              name: item.name,
              start: item.date + ' ' + item.start_time,
              end: item.date + ' ' + item.end_time,
              color: item.color || 'red',
              timed: false
            }
          }
        )
      }
    }
}
</script>
<style lang="scss" scoped>
.circle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: green;
  }
</style>