<template>
  <div class="d-flex justify-center flex-wrap mt-6">
    {{ title }}
    <a :href="href" target="_blank" class="font-weight-bold ml-1 body-1">
      {{ textButton }}
    </a>
  </div>
</template>

<script>
export default {
  name: 'ButtonRequestNewAccount',
  props: {
    title: {
      type: String,
      default: '¿No tienes una cuenta?'
    },
    href: {
      type: String,
      default: 'https://wa.link/u3zc5w'
    },
    textButton: {
      type: String,
      default: 'Solicita una aquí'
    }
  }
}
</script>