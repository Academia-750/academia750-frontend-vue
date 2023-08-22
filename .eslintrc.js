module.exports = {
  root: true,
  extends: ['@indielayer/eslint-config-vue'],
  rules: {
    indent: 0, // Handled by prettier
    'vue/max-attributes-per-line': [
      2,
      {
        singleline: 20,
        multiline: {
          max: 1,
          allowFirstLine: false
        }
      }
    ]
  }
}
