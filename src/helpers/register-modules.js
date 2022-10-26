import router from '@/router'
import store from '@/store'

const registerModule = (nameModuleStore, module) => {
  if (module.store) {
    store.registerModule(`${nameModuleStore}Service`, module.store)
  }

  if (module.router) {
    module.router(router)
  }
}

export const registerModules = (modules) => {
  Object.keys(modules).forEach((moduleKey) => {
    const module = modules[moduleKey]

    registerModule(moduleKey, module)
  })
}