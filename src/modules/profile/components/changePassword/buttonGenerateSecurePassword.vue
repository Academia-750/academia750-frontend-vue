<template>
  <div title="Generar contraseña segura">
    <v-fade-transition leave-absolute>
      <v-btn color="primary" small @click="generateRandomSecurePassword"> <v-icon small class="mx-1">mdi-sync</v-icon> <span class="d-none d-sm-inline">Generar</span> </v-btn>
    </v-fade-transition>
  </div>
</template>

<script>
import generateSecureRandomPassword from 'secure-random-password'

export default {
  name: 'ButtonGenerateSecurePassword',
  methods: {
    generateRandomSecurePassword () {
      const PASSWORD_GENERATED = generateSecureRandomPassword.randomPassword(
        {
          characters: [
            { characters: generateSecureRandomPassword.lower, exactly: 2 },
            { characters: generateSecureRandomPassword.symbols, exactly: 2 },
            generateSecureRandomPassword.upper,
            { characters: generateSecureRandomPassword.digits, exactly: 2 }
          ],
          length: parseInt(Math.random() * (15, 8) + 8)
        }
      )

      this.$emit('PasswordGeneratedBinding', PASSWORD_GENERATED)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
