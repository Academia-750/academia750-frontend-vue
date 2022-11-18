import Module from './module.vue'
import authMiddleware from '@/middlewares/auth'
import ManageTopicsModule from '@/modules/topics/views/Topics'

const shortcutRoutes = [
  {
    path: 'temas',
    redirect: { name: 'manage-topics' },
    meta: {
      middleware: [authMiddleware]
    }
  }/* ,
  {
    path: 'temas/crear',
    redirect: { name: 'create-subtopic' },
    meta: {
      middleware: [authMiddleware]
    }
  } */
]

const moduleRoute = [
  {
    path: '/',
    component: Module,
    redirect: { name: 'manage-topics' },
    children: [
      {
        path: '/topics',
        component: Module,
        redirect: { name: 'manage-topics' },
        children: [
          {
            path: 'update',
            redirect: { name: 'manage-topics' },
            meta: {
              middleware: [authMiddleware]
            }
          },
          {
            path: 'list',
            name: 'manage-topics',
            component: ManageTopicsModule,
            meta: {
              middleware: [authMiddleware]
            }
          }/* ,
          {
            path: 'create',
            name: 'create-subtopic',
            component: CreateSubtopicModule,
            meta: {
              middleware: [authMiddleware]
            }
          },
          {
            path: 'update/:id',
            name: 'update-subtopic',
            component: UpdateSubtopicModule,
            meta: {
              middleware: [authMiddleware]
            }
          } */
        ]
      },
      ...shortcutRoutes
    ]
  }
]

export default (router) => {
  router.addRoutes(moduleRoute)
}
