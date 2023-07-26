import router from '@/router'
import store from '@/store'

export const registerModules = (modules) => {
  Object.keys(modules).forEach((moduleKey) => {
    const module = modules[moduleKey]

    registerModule(moduleKey, module)
  })
}

const registerModule = (nameModuleStore, module) => {
  // Modules with several stores need to have their own name
  if (module.stores) {
    module.stores.forEach((subStore) =>
      store.registerModule(`${subStore.name}`, subStore)
    )
  }
  if (module.store) {
    store.registerModule(
      `${module.store.name || `${nameModuleStore}Service`}`,
      module.store
    )
  }

  if (module.router) {
    module.router(router)
  }
}
