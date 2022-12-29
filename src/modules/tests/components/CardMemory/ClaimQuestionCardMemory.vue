<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header color="blue-grey lighten-5" expand-icon="mdi-menu-down"><span class="font-weight-black">Impugnar pregunta: </span></v-expansion-panel-header>
      <v-expansion-panel-content>
        <div class="mt-3">
          <validation-observer ref="FormClaimQuestion">
            <claim-field-card-memory
              ref="ClaimFieldCardMemoryField"
              rules="required|max:400"
            />
            <div class="d-flex justify-center">
              <v-btn
                dark
                rounded
                color="deep-orange darken-1"
                small
                :loading="loadingButtonClaimQuestion"
                @click="validateClaimQuestion"
              >
                Impugnar pregunta <v-icon small class="ml-1">mdi-close-octagon</v-icon>
              </v-btn>
            </div>
          </validation-observer>
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import ClaimFieldCardMemory from './ClaimFieldCardMemory'
import { mapActions } from 'vuex'

export default {
  name: 'ClaimQuestionCardMemory',
  components: {
    ClaimFieldCardMemory
  },
  props: {
    questionUuid: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      loadingButtonClaimQuestion: false,
      disabledButtonClaimQuestion: false
    }
  },
  methods: {
    ...mapActions('testsService', ['claimQuestion']),
    async validateClaimQuestion () {
      const statusValidate = await this.$refs['FormClaimQuestion'].validate()

      if (!statusValidate) {
        this.$swal.fire({
          icon: 'error',
          toast: true,
          title: 'Por favor, complete correctamente los campos del formulario.',
          showConfirmButton: true,
          confirmButtonText: 'Entendido',
          timer: 7500
        })

        return
      }

      this.claimQuestionApi()
    },
    resetFormValidator () {
      this.$nextTick(() => {
        this.$refs['FormClaimQuestion']['reset']()
      })
    },
    async handlingErrorValidation(errorResponse = {}) {
      await this.$refs['FormClaimQuestion']['setErrors'](errorResponse)
    },
    async claimQuestionApi () {
      try {
        this.$loadingApp.enableLoadingProgressLinear()
        this.loadingButtonClaimQuestion = true
        this.disabledButtonClaimQuestion = true

        await this.claimQuestion({
          data: {
            test_id: this.$route.params.id,
            question_id: this.questionUuid,
            claim_text: this.$refs['ClaimFieldCardMemoryField'].claim_text
          },
          config: {}
        })

        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButtonClaimQuestion = false
        this.disabledButtonClaimQuestion = false

        this.$swal.fire({
          icon: 'success',
          toast: true,
          title: 'Su solicitud de impugnación ha sido enviada con éxito.',
          timer: 10000
        })

        this.$refs['ClaimFieldCardMemoryField'].claim_text = null
        this.resetFormValidator()

      } catch (error) {
        console.log(error)
        this.$loadingApp.disabledLoadingProgressLinear()
        this.$refs['ClaimFieldCardMemoryField'].claim_text = null
        this.resetFormValidator()

        this.loadingButtonClaimQuestion = false
        this.disabledButtonClaimQuestion = false
        if (error.response === undefined) {
          this.$swal.fire({
            icon: 'error',
            title: 'Ha ocurrido un problema en la aplicación. Reportelo e intente más tarde',
            showConfirmButton: true,
            confirmButtonText: '¡Entendido!',
            timer: 7500
          })
        } else if (error.response?.status === 422) {
          this.handlingErrorValidation(error.response.data.errors)
        }
      }
    }
  }
}
</script>
