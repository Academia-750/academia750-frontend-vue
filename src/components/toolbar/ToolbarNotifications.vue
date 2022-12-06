<template>
  <v-menu rounded="b-xl" offset-y left transition="slide-y-transition">
    <template v-slot:activator="{ on }">
      <v-badge
        bordered
        :content="count_notification_unread"
        offset-x="22"
        offset-y="22"
      >
        <v-btn icon v-on="on">
          <v-icon>mdi-bell-outline</v-icon>
        </v-btn>
      </v-badge>
    </template>

    <!-- dropdown card -->
    <v-card>
      <v-list three-line dense max-width="400">
        <v-subheader class="pa-2">
          <span class="font-weight-bold">Notificaciones</span>
          <v-spacer></v-spacer>
          <v-btn
            x-small
            color="light-blue darken-3"
            class="white--text mx-1"
            @click="loadNotifications(5,1)"
          >
            <v-icon
              right
              dark
              small
              class="mr-1"
            >
              mdi-refresh
            </v-icon>
          </v-btn>
        </v-subheader>
        <div v-for="(item, index) in notifications" :key="index">
          <v-divider v-if="index > 0 && index < notifications.length" inset></v-divider>

          <v-list-item :class="{ 'grey lighten-2': !item.has_read_notification }" @click="redirectRouteNotification(item)">
            <v-list-item-avatar size="32" :color="item.color">
              <v-icon dark small>{{ item.icon }}</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
              <v-list-item-subtitle class="caption" v-text="item.subtitle"></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action class="align-self-center">
              <v-list-item-action-text v-text="item.time"></v-list-item-action-text>
            </v-list-item-action>
          </v-list-item>
        </div>
      </v-list>

      <div class="text-center py-2">
        <v-btn small class="blue lighten-5" @click="$router.push({ name: 'notifications-user-auth' })">Ver todo</v-btn>
      </div>
    </v-card>
  </v-menu>
</template>

<script>
/*
|---------------------------------------------------------------------
| Toolbar Notifications Component
|---------------------------------------------------------------------
|
| Quickmenu to check out notifications
|
*/
import notifications from '@/mixins/notifications'

export default {
  mixins: [notifications],
  data() {
    return {
      numberOfNotifications: '2',
      disabledButtonSeeAllNotifications: true,
      items: [
        {
          title: 'Brunch this weekend?',
          color: 'primary',
          icon: 'mdi-account-circle',
          subtitle: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint, repudiandae?',
          time: '3 min'
        },
        {
          title: 'Summer BBQ',
          color: 'success',
          icon: 'mdi-email-outline',
          subtitle: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit, Sint, repudiandae, Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sint, repudiandae?',
          time: '3 min'
        }
      ]
    }
  },
  mounted () {
    this.loadNotifications(5,1)
    this.listenChannelNotificationsUserAuth()
  },
  methods: {
    listenChannelNotificationsUserAuth () {
      this.listenChannelUserAuth(() => {
        this.loadNotifications(5, 1)
      })
    }
  }
}
</script>
