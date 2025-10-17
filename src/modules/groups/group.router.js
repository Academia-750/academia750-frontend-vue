import Module from './module.vue'
import authMiddleware from '@/middlewares/auth'
import ManageGroupsModule from './group-list'
import CreateGroupModule from './update-groups'
import StudentModule from './group-students'

const shortcutRoutes = [
  {
    path: 'grupos',
    redirect: { name: 'manage-groups' },
    meta: {
      middleware: [authMiddleware]
    }
  },
  {
    path: 'grupos/crear',
    redirect: { name: 'create-group' },
    meta: {
      middleware: [authMiddleware]
    }
  },
  {
    path: 'grupos/editar',
    redirect: { name: 'create-group' },
    meta: {
      middleware: [authMiddleware]
    }
  },
  {
    path: 'grupos/alumnos',
    redirect: { name: 'group-students' },
    meta: {
      middleware: [authMiddleware]
    }
  }
]

const moduleRoute = [
  {
    path: '/',
    component: Module,
    redirect: { name: 'manage-groups' },
    children: [
      {
        path: '/groups',
        component: Module,
        redirect: { name: 'manage-groups' },
        children: [
          {
            path: 'list',
            name: 'manage-groups',
            component: ManageGroupsModule,
            meta: {
              middleware: [authMiddleware]
            }
          },
          {
            path: 'create',
            name: 'create-group',
            component: CreateGroupModule,
            meta: {
              middleware: [authMiddleware]
            }
          },
          {
            path: 'edit',
            name: 'edit-group',
            component: CreateGroupModule,
            meta: {
              middleware: [authMiddleware]
            }
          },
          {
            path: ':id/students/list',
            name: 'group-students',
            component: StudentModule,
            meta: {
              middleware: [authMiddleware]
            }
          }
        ]
      },
      ...shortcutRoutes
    ]
  }
]

export default (router) => {
  moduleRoute.forEach((route) => router.addRoute(route))
}
