<template>
  <section class="section-wrapper" :class="sectionClass">
    <div class="section-container">
      <slot />
    </div>
  </section>
</template>

<script>
export default {
  name: 'SectionWrapper',
  props: {
    backgroundColor: {
      type: String,
      default: '#ffffff'
    },
    paddingY: {
      type: String,
      default: 'normal' // 'small', 'normal', 'large'
    },
    fullWidth: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    sectionClass() {
      return {
        'section-none': this.paddingY === 'none',
        'section-small': this.paddingY === 'small',
        'section-normal': this.paddingY === 'normal',
        'section-large': this.paddingY === 'large',
        'section-full-width': this.fullWidth
      }
    }
  }
}
</script>

<style scoped>
.section-wrapper {
  width: 100%;
  background-color: v-bind(backgroundColor);
  font-family: 'Roboto', sans-serif;
}

.section-wrapper * {
  font-family: 'Roboto', sans-serif;
}

.section-container {
  width: calc(100% - 8.75rem);
  max-width: calc(100vw - 8.75rem);
  margin-left: 4.375rem;
  margin-right: 4.375rem;
  box-sizing: border-box;
}

/* Vertical Padding Variants */
.section-none {
  padding-top: 0;
  padding-bottom: 0;
}

.section-small {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.section-normal {
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
}

.section-large {
  padding-top: 1.875rem;
  padding-bottom: 1.875rem;
}

/* Full width override - removes margins completely */
.section-full-width .section-container {
  width: 100%;
  max-width: 100vw;
  margin-left: 0;
  margin-right: 0;
}

/* Responsive horizontal padding - simplified and consistent */
@media (min-width: 600px) {
  .section-container {
    width: calc(100% - 8.75rem);
    max-width: calc(100vw - 8.75rem);
    margin-left: 4.375rem;
    margin-right: 4.375rem;
  }
  
  .section-small {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
  }
  
  .section-normal {
    padding-top: 1.875rem;
    padding-bottom: 1.875rem;
  }
  
  .section-large {
    padding-top: 2.5rem;
    padding-bottom: 2.5rem;
  }
  
  /* Full width override for larger screens */
  .section-full-width .section-container {
    width: 100%;
    max-width: 100vw;
    margin-left: 0;
    margin-right: 0;
  }
}

@media (min-width: 960px) {
  .section-container {
    width: calc(100% - 8.75rem);
    max-width: calc(100vw - 8.75rem);
    margin-left: 4.375rem;
    margin-right: 4.375rem;
  }
  
  /* Full width override for larger screens */
  .section-full-width .section-container {
    width: 100%;
    max-width: 100vw;
    margin-left: 0;
    margin-right: 0;
  }
}

@media (min-width: 1264px) {
  .section-container {
    width: calc(100% - 8.75rem);
    max-width: calc(100vw - 8.75rem);
    margin-left: 4.375rem;
    margin-right: 4.375rem;
  }
  
  /* Full width override for larger screens */
  .section-full-width .section-container {
    width: 100%;
    max-width: 100vw;
    margin-left: 0;
    margin-right: 0;
  }
}

/* Mobile adjustments */
@media (max-width: 599px) {
  .section-container {
    width: calc(100% - 2.5rem);
    max-width: calc(100vw - 2.5rem);
    margin-left: 1.25rem;
    margin-right: 1.25rem;
  }
  
  .section-small {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
  }
  
  .section-normal {
    padding-top: 0.9375rem;
    padding-bottom: 0.9375rem;
  }
  
  .section-large {
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
  }
}
</style> 