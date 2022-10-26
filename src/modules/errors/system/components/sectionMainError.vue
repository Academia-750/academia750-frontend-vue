<template>
  <div>
    <section
      class="text-button font-weight-bold text-sm-h3 mt-1 mt-sm-6 mt-md-10"
    >
      {{ title }}
    </section>
    <section
      class="
        mx-auto
        text-wrap text-center
        my-1 my-sm-3 my-md-5
        text-caption text-sm-subtitle-1
      "
    >
      {{ description }}
    </section>
  </div>
</template>

<script>
export default {
  name: 'SectionMainError',
  props: {
    title: {
      type: String,
      default: 'OOPS! Algo ha salido mal'
    },
    description: {
      type: String,
      default:
        '¡Opps! El sistema ha sufrido una caida. Intente de nuevo, si el error persiste, intentelo más tarde.'
    }
  }
}
</script>

<style scoped>
</style>