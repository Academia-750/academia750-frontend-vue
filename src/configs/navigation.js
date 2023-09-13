 /* import menuUI from './menus/ui.menu'
import menuApps from './menus/apps.menu'
import menuPages from './menus/pages.menu' */

export default {
  // main navigation - side menu
  menu: [
    {
      text: 'Mi cuenta',
      key: '',
      can: '*',
      items: [
        {
          icon: 'mdi-account-circle',
          key: '',
          text: 'Perfil de usuario',
          to: { name: 'update-my-profile' },
          can: '*'
        },
        {
          icon: 'mdi-camera',
          key: '',
          text: 'Cambiar mi foto',
          to: { name: 'update-image-account' },
          can: '*'
        },
        {
          icon: 'mdi-lock',
          key: '',
          text: 'Cambiar contraseña',
          to: { name: 'change-password' },
          can: '*'
        }
      ]
    },
    {
      text: 'Zona de entrenamiento',
      key: '',
      permissions: ['generate-tests'],
      items: [
        {
          icon: 'mdi-book-edit',
          key: '',
          text: 'Zona de entrenamiento',
          permissions: ['generate-tests'],
          regex: /^\/Zona de Entrenamiento/,
          items: [
            {
              icon: 'mdi-book-open-variant',
              key: '',
              text: 'Generar cuestionario',
              to: { name: 'generate-questionnaire' },
              permissions: ['generate-tests']
            },
            {
              icon: 'mdi-book-clock',
              key: '',
              text: 'Tests sin completar',
              to: { name: 'list-questionnaires-of-student-not-complete' },
              permissions: ['generate-tests']
            },
            {
              icon: 'mdi-view-list',
              key: '',
              text: 'Tarjetas de memoria',
              to: { name: 'list-cards-memory' },
              permissions: ['generate-tests']
            }
          ]
        }
      ]
    },
    {
      text: 'Mi evolución',
      key: '',
      permissions: ['generate-tests'],
      items: [
        {
          icon: 'mdi-chart-areaspline',
          key: '',
          text: 'Resumen',
          permissions: ['generate-tests'],
          regex: /^\/Resumen/,
          items: [
            {
              icon: 'mdi-book-open-variant',
              key: '',
              text: '5 temas a mejorar',
              to: { name: 'fetch-resume-student-five-topics-to-improve' },
              permissions: ['generate-tests']
            },
            {
              icon: 'mdi-book-clock',
              key: '',
              text: 'Resultados por tema',
              to: { name: 'fetch-resume-student-results-per-topic' },
              permissions: ['generate-tests']
            },
            {
              icon: 'mdi-view-list',
              key: '',
              text: 'Errores por tema',
              to: { name: 'fetch-resume-student-questions-wrong-per-topic' },
              permissions: ['generate-tests']
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
          permissions: ['generate-tests']
        },
        {
          icon: 'mdi-notebook-check',
          key: '',
          text: 'Tests completados',
          to: { name: 'fetch-history-tests-completed' },
          permissions: ['generate-tests']
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
          icon: 'mdi-account-group',
          key: '',
          text: 'Gestión de Grupos',
          to: { name: 'manage-groups' },
          roles: 'admin'
        },
        {
          icon: 'mdi-clipboard-account',
          key: '',
          text: 'Gestión de Permisos',
          to: { name: 'manage-profiles' },
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
    /* ,
    {
      text: 'Apps',
      items: menuApps
    },
    {
      text: 'Landing Pages',
      can: 'list-students-system',
      items: [
        { icon: 'mdi-airplane-landing', key: 'menu.landingPage', text: 'Landing Page', link: '/landing', can: 'list-students-system' },
        { icon: 'mdi-cash-usd-outline', key: 'menu.pricingPage', text: 'Pricing Page', link: '/landing/pricing' }
      ]
    },
    {
      text: 'UI - Theme Preview',
      items: menuUI
    },
    {
      text: 'Pages',
      key: 'menu.pages',
      items: menuPages
    },
    {
      text: 'Other',
      key: 'menu.others',
      items: [
        { icon: 'mdi-file-outline', key: 'menu.blank', text: 'Blank Page', link: '/blank' },
        { key: 'menu.levels', text: 'Menu Levels',
          items: [
            { text: 'Menu Levels 2.1' },
            { text: 'Menu Levels 2.2',
              items: [
                { text: 'Menu Levels 3.1' },
                { text: 'Menu Levels 3.2' }
              ]
            }
          ]
        },
        { key: 'menu.disabled', text: 'Menu Disabled', disabled: true }
      ]
    } */
  ]

  // footer links
  /* footer: [{
    text: 'Docs',
    key: 'menu.docs',
    href: 'https://vuetifyjs.com',
    target: '_blank'
  }] */
}
