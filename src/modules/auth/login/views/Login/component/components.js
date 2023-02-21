//const FormAccessKeyField = () => import(/* webpackChunkName: "FormAccessKeyField" */ '@/modules/auth/login/components/form/FormAccessKeyField')

import FormAccessKeyField from '@/modules/auth/login/components/form/FormAccessKeyField'

const FormPasswordField = () => import(/* webpackChunkName: "FormPasswordField" */'@/modules/auth/login/components/form/FormPasswordField.vue')
const FormButtonSubmitLogin = () => import(/* webpackChunkName: "FormButtonSubmitLogin" */'@/modules/auth/login/components/form/FormButtonSubmitLogin.vue')

const ButtonRequestResetPassword = () => import('@/modules/auth/login/components/ButtonRequestResetPassword.vue')
const FooterDialogLogin = () =>  import('@/modules/home/components/Login/FooterDialogLogin')

const components = {
  FormAccessKeyField,
  FormPasswordField,
  FormButtonSubmitLogin,
  ButtonRequestResetPassword,
  FooterDialogLogin
}

export default {
  components
}
