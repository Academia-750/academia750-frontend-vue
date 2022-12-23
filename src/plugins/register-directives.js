// Imports Directives
import Vue from 'vue'
/* import '@/directives/capitalize' */

const scrollTargetElement = {
  bind(el, binding) {
    // Obtiene la posición del elemento y la posición del scroll
    const elementTop = el.offsetTop
    const { scrollTop, windowHeight } = window

    // Asigna un controlador de eventos al evento scroll
    window.onscroll = function () {
      // Verifica si el scroll ha llegado a la altura del elemento
      if (scrollTop + windowHeight >= elementTop) {
        // Ejecuta la acción especificada en binding.value
        binding.value()
      }
    }
  }
}

Vue.directive('scroll-target-element', scrollTargetElement)
