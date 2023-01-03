<template>
  <div class="nosotros_seccion">
    <v-container>
        <v-row align="center">
            <v-col md="6" cols="12">
                <v-row>
                    <v-col cols="6">
                        <NosotrosLeft numero-nosotros="1." titulo-nosotros="¿Quienes somos?" contenido-nosotros="Grupo humano con años de experiencia en la preparación de oposiciones y en el sector de las emergencias."/>
                    </v-col>
                    <v-col cols="6">
                        <NosotrosLeft numero-nosotros="2." titulo-nosotros="¿Qué hacemos?" contenido-nosotros="Nos encargamos de preparar todas las pruebas de la oposición de bomberos sin dejar nada al azar, puliendo todos los detalles."/>
                    </v-col>
                    <v-col cols="6">
                        <NosotrosLeft numero-nosotros="3." titulo-nosotros="¿Como formamos?" contenido-nosotros="Nuestro método permite facilitar al alumno/a múltiples herramientas y recursos para desenvolverse en cualquier situación siempre exigiéndonos la mayor calidad."/>
                    </v-col>
                    <v-col cols="6">
                        <NosotrosLeft numero-nosotros="4." titulo-nosotros="Nuestra meta" contenido-nosotros="Obtener el máximo rendimiento de nuestros alumnos/as y prepararlos para cualquier prueba o situación."/>
                    </v-col>
                </v-row>
            </v-col>
            <v-col md="6" cols="12"> <ImagenNosotrosUnidad /></v-col>
        </v-row>
    </v-container>
   
  </div>
</template>
<script>
import ImagenNosotrosUnidad from './Nosotros/NosotrosImagen'
import NosotrosLeft from './Nosotros/NosotrosLeft'
export default {
  name: 'Nosotros',
  components: {
    ImagenNosotrosUnidad,
    NosotrosLeft
  },
  data() {
    return {}
  }
}
</script>
<style>
.nosotros_seccion{
    background-image: url(/images/academia750/quienesSomos.png);
    height: 875px;
    width: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    align-items: center;
}
</style>
