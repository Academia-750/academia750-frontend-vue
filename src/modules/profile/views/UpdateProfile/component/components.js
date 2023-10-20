/* No importar asincronamente (usando import()) aquellos componentes que queremos acceder mediante $refs */
import DniFieldInput from '@/modules/profile/components/updateProfile/DNIFieldInput.vue'
import NamePersonInput from '@/modules/profile/components/updateProfile/NameFieldInput.vue'
import LastNamePersonInput from '@/modules/profile/components/updateProfile/LastNameFieldInput.vue'
import PhoneFieldInput from '@/modules/profile/components/updateProfile/PhoneFieldInput.vue'
import EmailFieldInput from '@/modules/profile/components/updateProfile/EmailFieldInput.vue'
const components = {
  DniFieldInput,
  NamePersonInput,
  LastNamePersonInput,
  PhoneFieldInput,
  EmailFieldInput
}

export default {
  components
}
