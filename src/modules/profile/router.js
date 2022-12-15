import authMiddleware from '@/middlewares/auth'
import Module from './module.vue'
import UpdateMyProfileViewModule from './views/UpdateProfile/UpdateProfile.vue'
import ChangePasswordAccountViewModule from './views/ChangePassword/ChangePassword.vue'
import ChangeImageAccountViewModule from './views/ChangeImage/ChangeImage.vue'
import NotificationsUser from './views/notifications'

const moduleRoute = [
  {
    path: '/my-profile',
    component: Module,
    redirect: { name: 'update-my-profile' },
    children: [
      {
        path: 'update',
        name: 'update-my-profile',
        component: UpdateMyProfileViewModule,
        meta: {
          middleware: [authMiddleware]
        }
      },
      {
        path: 'change-password',
        name: 'change-password',
        component: ChangePasswordAccountViewModule,
        meta: {
          middleware: [authMiddleware]
        }
      },
      {
        path: 'update-image-account',
        name: 'update-image-account',
        component: ChangeImageAccountViewModule,
        meta: {
          middleware: [authMiddleware]
        }
      },
      {
        path: 'notifications',
        name: 'notifications-user-auth',
        component: NotificationsUser,
        meta: {
          middleware: [authMiddleware]
        }
      }
    ]
  }
]

export default (router) => {
  router.addRoutes(moduleRoute)
}
