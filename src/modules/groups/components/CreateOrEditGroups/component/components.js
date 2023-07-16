export default {
  components: {
    DniFieldInput: () => import(/* webpackChunkName: "DNIFieldInput" */ '@/modules/students/components/form/DNIFieldInput'),
    NameFieldInput: () => import(/* webpackChunkName: "NameFieldInput" */ '@/modules/students/components/form/NameFieldInput'),
    LastNameFieldInput: () => import(/* webpackChunkName: "LastNameFieldInput" */ '@/modules/students/components/form/LastNameFieldInput'),
    PhoneFieldInput: () => import(/* webpackChunkName: "PhoneFieldInput" */ '@/modules/students/components/form/PhoneFieldInput'),
    EmailFieldInput: () => import(/* webpackChunkName: "EmailFieldInput" */ '@/modules/students/components/form/EmailFieldInput')
  }
}
