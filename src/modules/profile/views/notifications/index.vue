<template>
  <div>
    <v-card
      class="mx-auto"
      max-width="600"
    >
      <v-list three-line dense max-width="600">
        <v-toolbar
          color="cyan"
          dark
        >
          <v-toolbar-title>Notificaciones</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn
            x-small
            color="light-blue darken-3"
            class="white--text mx-1"
            @click="loadNotifications(30,1)"
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
        </v-toolbar>
        <!-- <v-subheader class="pa-2">
          <span class="font-weight-bold title">Notificaciones</span>
          <v-spacer></v-spacer>
          <v-btn
            x-small
            color="light-blue darken-3"
            class="white--text mx-1"
            @click="loadNotifications(30,1)"
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
        </v-subheader> -->
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
    </v-card>
    <v-container class="max-width">
      <v-pagination
        v-model="pageNumber"
        class="my-4"
        :length="totalNumberPages"
      ></v-pagination>
    </v-container>
  </div>
</template>

<script src="./notifications.js"></script>
