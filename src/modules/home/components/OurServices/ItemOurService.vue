<template>
  <v-col
    :cols="cols"
    :sm="sm"
    :md="md"
    :lg="lg"
    :xl="xl"
    class="mt-2 mt-sm-2 mt-md-4 mt-lg-4 mt-xl-4 mb-1 mb-sm-1 mb-md-2 mb-lg-2 mb-xl-2"
  >
    <div class="d-flex justify-center">
      <v-img
        :src="pathImageService"
        contain
        max-width="110"
        max-height="110"
        :alt="titleService"
      />
    </div>
    <h2 class="font-weight-bold text-center text-subtitle-2 text-sm-h6 text-md-h6 text-lg-h6 text-xl-h6">{{ titleService }}</h2>
    <p class="text-center text-caption">{{ descriptionService }}</p>
  </v-col>
</template>

<script>
export default {
  name: 'ItemOurService',
  props: {
    cols: {
      type: [String, Number],
      required: true
    },
    sm: {
      type: [String, Number],
      required: true
    },
    md: {
      type: [String, Number],
      required: true
    },
    lg: {
      type: [String, Number],
      required: true
    },
    xl: {
      type: [String, Number],
      required: true
    },
    pathImageService: {
      type: String,
      required: true
    },
    titleService: {
      type: String,
      required: true
    },
    descriptionService: {
      type: String,
      required: true
    }
  }
}
</script>
