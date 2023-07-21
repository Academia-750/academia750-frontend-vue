<template>
  <ValidationProvider
    v-slot="{ errors }"
    vid="group-color"
    mode="aggressive"
    :rules="rules"
    class="d-flex align-start justify-center"
    :style="{ flexWrap: 'wrap' }"
  >
    <div class="d-flex align-center">
      <v-icon large>mdi-invert-colors</v-icon>
      <div class="font-weight-regular text-h6 ml-2 mr-8">Color del Grupo</div>
    </div>
    <div class="colors-div">
      <div
        v-for="(color, index) in colors"
        :key="index"
        :style="{ backgroundColor: color }"
        :class="`circle ${value === color ? 'selected' : ''}`"
        @click="selectColor(color)"
      ></div>
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
<style lang="scss" scoped>
.colors-div {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 11px;
  margin-top: 15px;

  .circle {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    cursor: pointer;
  }
  .selected {
    border: solid 2px #0277bd;
  }
}
</style>
