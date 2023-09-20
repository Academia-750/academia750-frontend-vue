import { PermissionEnum } from '@/utils/enums'

export default {
  menu: [
    {
      text: 'Mi cuenta',
      key: '',
      items: [
        {
          icon: 'mdi-account-circle',
          key: '',
          text: 'Perfil de usuario',
          to: { name: 'update-my-profile' }
        },
        {
          icon: 'mdi-camera',
          key: '',
          text: 'Cambiar mi foto',
          to: { name: 'update-image-account' }
        },
        {
          icon: 'mdi-lock',
          key: '',
          text: 'Cambiar contraseña',
          to: { name: 'change-password' }
        }
      ]
    },
    {
      text: 'Zona de entrenamiento',
      key: '',
      permissions: [PermissionEnum.GENERATE_TESTS],
      items: [
        {
          icon: 'mdi-book-edit',
          key: '',
          text: 'Zona de entrenamiento',
          permissions: [PermissionEnum.GENERATE_TESTS],
          regex: /^\/Zona de Entrenamiento/,
          items: [
            {
              icon: 'mdi-book-open-variant',
              key: '',
              text: 'Generar cuestionario',
              to: { name: 'generate-questionnaire' },
              permissions: [PermissionEnum.GENERATE_TESTS]
            },
            {
              icon: 'mdi-book-clock',
              key: '',
              text: 'Tests sin completar',
              to: { name: 'list-questionnaires-of-student-not-complete' },
              permissions: [PermissionEnum.GENERATE_TESTS]
            },
            {
              icon: 'mdi-view-list',
              key: '',
              text: 'Tarjetas de memoria',
              to: { name: 'list-cards-memory' },
              permissions: [PermissionEnum.GENERATE_TESTS]
            }
          ]
        }
      ]
    },
    {
      text: 'Mi evolución',
      key: '',
      permissions: [PermissionEnum.GENERATE_TESTS],
      items: [
        {
          icon: 'mdi-chart-areaspline',
          key: '',
          text: 'Resumen',
          permissions: [PermissionEnum.GENERATE_TESTS],
          regex: /^\/Resumen/,
          items: [
            {
              icon: 'mdi-book-open-variant',
              key: '',
              text: '5 temas a mejorar',
              to: { name: 'fetch-resume-student-five-topics-to-improve' },
              permissions: [PermissionEnum.GENERATE_TESTS]
            },
            {
              icon: 'mdi-book-clock',
              key: '',
              text: 'Resultados por tema',
              to: { name: 'fetch-resume-student-results-per-topic' },
              permissions: [PermissionEnum.GENERATE_TESTS]
            },
            {
              icon: 'mdi-view-list',
              key: '',
              text: 'Errores por tema',
              to: { name: 'fetch-resume-student-questions-wrong-per-topic' },
              permissions: [PermissionEnum.GENERATE_TESTS]
            }
          ]
        },
        {
          icon: 'mdi-chart-timeline',
          key: '',
          text: 'Históricos de preguntas',
          to: {
            name: 'fetch-history-questions-student-by-tests-period-type-question'
          },
          permissions: [PermissionEnum.GENERATE_TESTS]
        },
        {
          icon: 'mdi-notebook-check',
          key: '',
          text: 'Tests completados',
          to: { name: 'fetch-history-tests-completed' },
          permissions: [PermissionEnum.GENERATE_TESTS]
        }
      ]
    },
    {
      text: 'Gestión de Usuarios',
      key: '',
      roles: 'admin',
      items: [
        {
          icon: 'mdi-account',
          key: '',
          text: 'Gestión de Alumnos',
          to: { name: 'manage-students' },
          roles: 'admin'
        },
        {
          icon: 'mdi-clipboard-account',
          key: '',
          text: 'Gestión de Permisos',
          to: { name: 'manage-profiles' },
          roles: 'admin'
        },
        {
          icon: 'mdi-account-group',
          key: '',
          text: 'Gestión de Grupos',
          to: { name: 'manage-groups' },
          roles: 'admin'
        }
      ]
    },
    {
      text: 'Gestión de Clases',
      key: '',
      roles: 'admin',
      items: [
        {
          icon: 'mdi-book-open-page-variant',
          key: '',
          text: 'Gestión Clases',
          to: { name: 'manage-lessons' },
          roles: 'admin'
        },
        {
          icon: 'mdi-folder-open',
          key: '',
          text: 'Gestión de Materiales',
          to: { name: 'manage-workspaces' },
          roles: 'admin'
        }
      ]
    },
    {
      text: 'Gestión de Opisiciones',
      key: '',
      roles: 'admin',
      items: [
        {
          icon: 'mdi-book-open-variant',
          key: '',
          text: 'Gestión de Oposiciones',
          to: { name: 'manage-oppositions' },
          roles: 'admin'
        },
        {
          icon: 'mdi-file-document-multiple',
          key: '',
          text: 'Gestión de Temas',
          to: { name: 'manage-topics' },
          roles: 'admin'
        },
        {
          icon: 'mdi-database-import',
          key: '',
          text: 'Importar',
          roles: 'admin',
          regex: /^\/Importar/,
          items: [
            {
              icon: 'mdi-database-plus',
              key: '',
              text: 'Importar Temas',
              to: { name: 'import-topics' },
              roles: 'admin'
            },
            {
              icon: 'mdi-database-plus',
              key: '',
              text: 'Importar Subtemas',
              to: { name: 'import-subtopics' },
              roles: 'admin'
            },
            {
              icon: 'mdi-database-plus',
              key: '',
              text: 'Importar Preguntas',
              to: { name: 'import-questions' },
              roles: 'admin'
            }
          ]
        }
      ]
    },
    {
      text: 'Sistema',
      key: '',
      roles: 'admin',
      items: [
        {
          icon: 'mdi-file-document-multiple-outline',
          key: '',
          text: 'Bitácora de importaciones',
          to: { name: 'my-imports-files' },
          roles: 'admin'
        }
      ]
    }
  ]
}
