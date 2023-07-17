export default {
  components: {
    DniFieldInput: () =>
      import(
        /* webpackChunkName: "DNIFieldInput" */ '@/modules/groups/components/form/DNIFieldInput'
      ),
    NameFieldInput: () =>
      import(
        /* webpackChunkName: "NameFieldInput" */ '@/modules/groups/components/form/NameFieldInput'
      ),
    LastNameFieldInput: () =>
      import(
        /* webpackChunkName: "LastNameFieldInput" */ '@/modules/groups/components/form/LastNameFieldInput'
      ),
    PhoneFieldInput: () =>
      import(
        /* webpackChunkName: "PhoneFieldInput" */ '@/modules/groups/components/form/PhoneFieldInput'
      ),
    EmailFieldInput: () =>
      import(
        /* webpackChunkName: "EmailFieldInput" */ '@/modules/groups/components/form/EmailFieldInput'
      )
  }
}
