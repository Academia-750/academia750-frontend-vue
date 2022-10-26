import Vue from 'vue'
// * Register Global Helpers *
// imports manually helpers
import { getErrorsMessagesValidation } from '@/helpers/getValidationErrorsMessages'

const RegisterGlobalHelpersPlugin = {
  install: () => {
    Vue.prototype.getErrorsMessagesValidationApi = getErrorsMessagesValidation
    Vue.getErrorsMessagesValidationApi = getErrorsMessagesValidation
  }
}

Vue.use(RegisterGlobalHelpersPlugin)