<template>
  <ValidationProvider
    v-slot="{ errors }"
    vid="group-color"
    mode="aggressive"
    :rules="rules"
  >
    <v-icon large>mdi-invert-colors</v-icon>
    <p class="font-weight-regular text-h5 ml-5 mr-8">Color del Grupo</p>
    <div class="colors-div">
      <div
        v-for="(color, index) in colors"
        :key="index"
        :style="{ backgroundColor: color }"
        class="circle"
        @click="selectColor(color)"
      >
        {{ value === color ? '✓' : '' }}
      </div>
    </div>
    <input v-model="value" type="hidden" />
    <div v-if="errors.length" class="mt-2 red--text">
      Seleccione un color {{ errors }}
    </div>
  </ValidationProvider>
</template>

<script>
import GroupRepository from '../../repositories/GroupRepository'

export default {
  name: 'SelectColorInput',
  props: {
    value: {
      type: String,
      default: ''
    },
    rules: {
      type: [Object, String],
      required: true
    },
    previousColor: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      colors: []
    }
  },
  mounted() {
    this.getColors()
  },
  methods: {
    async getColors() {
      this.colors = await GroupRepository.colors()

      // The colors only have the available colors, we add the selected color by this group as an option
      if (this.previousColor) {
        this.colors.unshift(this.previousColor)
      }
    },
    async selectColor(color) {
      this.$emit('input', color)
    }
  }
}
</script>
