<template>
  <v-container class="mt-2">
    <v-row dense>
      <image-groups-by-level />
      <v-col
        cols="12"
        sm="12"
        md="6"
        lg="6"
        xl="6"
      >
        <title-groups-by-level />
        <items-level-groups-by-level
          title="Iniciación"
          :items-level="startLevelItems"
        />
        <items-level-groups-by-level
          title="Avanzado"
          :items-level="advancedLevelItems"
        />
        <button-go-to-register-contact-us />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ImageGroupsByLevel from './GroupsByLevel/ImageGroupsByLevel'
import TitleGroupsByLevel from './GroupsByLevel/TitleGroupsByLevel'
import ItemsLevelGroupsByLevel from './GroupsByLevel/ItemsLevelGroupsByLevel'
import ButtonGoToRegisterContactUs from './ButtonGoToRegisterContactUs'

export default {
  name: 'GroupsByLevel',
  components: {
    ImageGroupsByLevel,
    TitleGroupsByLevel,
    ItemsLevelGroupsByLevel,
    ButtonGoToRegisterContactUs
  },
  data () {
    return {
      startLevelItems: [
        'Para aquellos que empiezan',
        'Temas adaptados y resumidos',
        'Técnicas de estudio y formas de resumir',
        'Fórmulas para enfrentar una oposición'
      ],
      advancedLevelItems: [
        'Calidad y alto ritmo semanal de estudio',
        'Varios temas de estudio por semana',
        'Exámen de bloque y simulacro',
        'Diapositivas de correción por pregunta',
        'Repaso de temas y continua evaluación para conocer fortalezas y debilidades'
      ]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
