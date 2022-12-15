import Vue from 'vue'
import Router from 'vue-router'
import middleware from '@grafikri/vue-middleware'

// Routes
/* import AppsRoutes from './apps.routes'
import UIRoutes from './ui.routes'
import PagesRoutes from './pages.routes'
import UsersRoutes from './users.routes'
import EcommerceRoutes from './ecommerce.routes'
import LandingRoutes from './landing.routes' */

Vue.use(Router)

export const routes = [{
  path: '/',
  redirect: {
    name: 'update-my-profile'
  }
},
/* ...AppsRoutes,
...UIRoutes,
...PagesRoutes,
...UsersRoutes,
...EcommerceRoutes,
...LandingRoutes, */
{
  path: '*',
  name: 'error',
  component: () => import(/* webpackChunkName: "error" */ '@/modules/errors/system/views/error404.vue'),
  meta: {
    layout: 'error'
  }
}]

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL || '/',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition

    return { x: 0, y: 0 }
  },
  routes
})

/**
 * Before each route update
 */
router.beforeEach(middleware())

/**
 * After each route update
 */
router.afterEach((to, from) => {
})

export default router
