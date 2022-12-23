import { $get_token_auth } from '@/helpers/auth'
import LaravelEchoJS from 'laravel-echo'
import PusherJS from 'pusher-js'
import Vue from 'vue'

export const $websocketConnectionAction = function () {
  if (window.$EchoJSInstanceAcademia750 === undefined) {
    connectWebsockets( $getCredentialsWebsocketsConnection() )
  }

  //console.log(window.$EchoJSInstanceAcademia750?.connector?.pusher)
}

export const $disconnectWebsocketsConnection = function (user_id = null) {
  /* if (user_id) {
    window?.$EchoJSInstanceAcademia750?.connector?.pusher.terminateUserConnections(user_id)
  } */
  window?.$EchoJSInstanceAcademia750?.connector?.pusher.disconnect()

  window.$EchoJSInstanceAcademia750 = undefined
}

const connectWebsockets = function ({
  DomainConnectServerWebsockets,
  PortConnectServerWebsockets,
  AuthEndpointConnectServerWebsockets,
  ForceTLSConnectServerWebsockets,
  EncryptedConnectServerWebsockets,
  DisabledStatsConnectServerWebsockets
}) {
  window.$EchoJSInstanceAcademia750 = new LaravelEchoJS({
    broadcaster: 'pusher',
    key: process.env.VUE_APP_KEY_PROJECT_CONNECTION_WEBSOCKETS,
    //cluster: 'mt1',
    host: `${DomainConnectServerWebsockets}:${PortConnectServerWebsockets}`,
    wsHost: DomainConnectServerWebsockets,
    wssHost: DomainConnectServerWebsockets,
    wsPort: PortConnectServerWebsockets,
    wssPort: PortConnectServerWebsockets,
    forceTLS: ForceTLSConnectServerWebsockets,
    encrypted: EncryptedConnectServerWebsockets,
    disableStats: DisabledStatsConnectServerWebsockets,
    authEndpoint: AuthEndpointConnectServerWebsockets,
    auth: {
      headers: {
        Authorization: `Bearer ${$get_token_auth()}`,
        Accept: 'application/json'
      }
    },
    enabledTransports: ['ws', 'wss']
  })

  listenErrorEventConnectionWebsockets()
}

export const listenErrorEventConnectionWebsockets = function () {
  window.$EchoJSInstanceAcademia750.connector.error((error) => {
    console.log({
      error
    } )
  })
  window.$EchoJSInstanceAcademia750.connector.connect({
    reconnect: false
  })
}

const $getCredentialsWebsocketsConnection = function () {
  Vue.prototype.$pusherSDK = PusherJS
  const DomainConnectServerWebsockets = process.env.NODE_ENV === 'development' ? process.env.VUE_APP_DOMAIN_SERVER_PROJECT_CONNECTION_WEBSOCKETS_DEVELOPMENT : process.env.VUE_APP_DOMAIN_SERVER_PROJECT_CONNECTION_WEBSOCKETS_PRODUCTION

  const PortConnectServerWebsockets = process.env.NODE_ENV === 'development' ? parseInt(process.env.VUE_APP_PORT_SERVER_PROJECT_CONNECTION_WEBSOCKETS_DEVELOPMENT) : parseInt(process.env.VUE_APP_PORT_SERVER_PROJECT_CONNECTION_WEBSOCKETS_PRODUCTION)

  const AuthEndpointConnectServerWebsockets = process.env.NODE_ENV === 'development' ? process.env.VUE_APP_URL_SERVER_AUTHENTICATION_PROJECT_CONNECTION_WEBSOCKETS_DEVELOPMENT : process.env.VUE_APP_URL_SERVER_AUTHENTICATION_PROJECT_CONNECTION_WEBSOCKETS_PRODUCTION

  const ForceTLSConnectServerWebsockets = process.env.NODE_ENV === 'development' ? process.env.VUE_APP_FORCE_TLS_SERVER_PROJECT_CONNECTION_WEBSOCKETS_DEVELOPMENT === 'true' : process.env.VUE_APP_FORCE_TLS_SERVER_PROJECT_CONNECTION_WEBSOCKETS_PRODUCTION === 'true'

  const EncryptedConnectServerWebsockets = process.env.NODE_ENV === 'development' ? process.env.VUE_APP_ENCRYPTED_SERVER_PROJECT_CONNECTION_WEBSOCKETS_DEVELOPMENT === 'true' : process.env.VUE_APP_ENCRYPTED_SERVER_PROJECT_CONNECTION_WEBSOCKETS_PRODUCTION === 'true'

  const DisabledStatsConnectServerWebsockets = process.env.NODE_ENV === 'development' ? process.env.VUE_APP_DISABLED_STATS_SERVER_PROJECT_CONNECTION_WEBSOCKETS_DEVELOPMENT === 'true' : process.env.VUE_APP_DISABLED_STATS_SERVER_PROJECT_CONNECTION_WEBSOCKETS_PRODUCTION === 'true'

  return {
    DomainConnectServerWebsockets,
    PortConnectServerWebsockets,
    AuthEndpointConnectServerWebsockets,
    ForceTLSConnectServerWebsockets,
    EncryptedConnectServerWebsockets,
    DisabledStatsConnectServerWebsockets
  }
}
