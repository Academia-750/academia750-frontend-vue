<template>
  <div v-if="hasErrorServiceApp" class="my-3">
    <v-alert
      v-model="hasErrorServiceApp"
      class="d-flex justify-center"
      dense
      border="left"
      color="pink darken-1"
      dark
      icon="mdi-danger"
      transition="scale-transition"
      dismissible
    >
      <span class="font-weight-bold caption">{{
        messageErrorServiceApp
      }}</span>
    </v-alert>
  </div>
</template>

<script>
export default {
  name: 'AlertErrorLogin',
  data () {
    return {
      hasErrorServiceApp: false,
      messageErrorServiceApp: null
    }
  }
}
</script>
