<template>
  <div>
    <v-file-input
      v-model="image"
      :error-messages="validationErrors"
      show-size
      :label="label"
      accept="image/*"
      @change="Preview_image"
    ></v-file-input>
    <v-container v-if="image || previewImageForUpdate" class="d-flex justify-center" fluid>
      <v-img
        :max-width="maxWidthImagePreview"
        :aspect-ratio="16/9"
        :src="urlImage"
      ></v-img>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'FormAddQuestionImage',
  props: {
    label: {
      type: String,
      default: 'Selecciona Imagen de explicación'
    },
    maxWidthImagePreview: {
      type: String,
      default: '500'
    },
    validationErrors: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      image: null,
      previewImageForUpdate: false,
      urlImage: null
    }
  },
  methods: {
    Preview_image() {
      if (!this.image) return

      this.urlImage = URL.createObjectURL(this.image)
    }
  }
}
</script>
