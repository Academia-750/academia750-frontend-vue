<template>
  <div class="version-display text-center caption">
    <span class="version-text">
      v{{ version }}
      <span v-if="versionRef" class="version-ref">
        {{ versionRef }}
      </span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'VersionDisplay',
  computed: {
    version() {
      return require('../../../package.json').version
    },
    versionRef() {
      // VUE_APP_VERSION_REF is injected during build for staging/preview builds
      return process.env.VUE_APP_VERSION_REF || null
    }
  }
}
</script>

<style scoped>
.version-display {
  padding: 8px;
  opacity: 0.7;
}

.version-text {
  font-style: italic;
  color: inherit;
}

.version-ref {
  font-style: italic;
  font-weight: 500;
  margin-left: 4px;
}

.version-ref::before {
  content: '(';
}

.version-ref::after {
  content: ')';
}
</style>
