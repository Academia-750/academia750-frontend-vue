<template>
  <div class="d-flex flex-column px-md-3 py-2 px-2 justify-center align-center">
    <h3>{{ valueFormatted }}</h3>
    <h3>{{ label }}</h3>
  </div>
</template>

<script>
export default {
  name: 'Counter',
  props: {
    value: { type: Number, required: true },
    label: { type: String, required: true }
  },
  computed: {
    valueFormatted() {
      return String(this.value).padStart(2, '0')
    }
  }
}
</script>
