const FormAccessKeyField = () => import(/* webpackChunkName: "FormAccessKeyField" */ '@/modules/auth/login/components/form/FormAccessKeyField')

const FormPasswordField = () => import(/* webpackChunkName: "FormPasswordField" */'@/modules/auth/login/components/form/FormPasswordField.vue')
const FormButtonSubmitLogin = () => import(/* webpackChunkName: "FormButtonSubmitLogin" */'@/modules/auth/login/components/form/FormButtonSubmitLogin.vue')

const components = {
  FormAccessKeyField,
  FormPasswordField,
  FormButtonSubmitLogin
}

export default {
  components
}
