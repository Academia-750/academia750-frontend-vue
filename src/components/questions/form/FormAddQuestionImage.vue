<template>
  <div>
    <v-file-input
      v-model="image"
      show-size
      label="Selecciona Imagen de explicación"
      accept="image/*"
      @change="Preview_image"
    ></v-file-input>
    <v-container v-if="image" fluid>
      <v-img
        max-width="500"
        :aspect-ratio="16/9"
        :src="urlImage"
      ></v-img>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'FormAddQuestionImage',
  data () {
    return {
      image: null,
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
