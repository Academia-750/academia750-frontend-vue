import menuUI from './menus/ui.menu'
import menuApps from './menus/apps.menu'
import menuPages from './menus/pages.menu'

export default {
  // main navigation - side menu
  menu: [
    {
      text: 'Mi cuenta',
      key: '',
      can: '*',
      items: [
        { icon: 'mdi-view-dashboard-outline', key: '', text: 'Perfil de usuario', to: { name: 'update-my-profile' }, can: '*' },
        { icon: 'mdi-lock', key: '', text: 'Cambiar contraeña', to: { name: 'change-password' }, can: '*' }
      ]
    },
    {
      text: 'Gestión administrativa',
      key: '',
      roles: 'admin',
      items: [
        { icon: 'mdi-book-open-variant', key: '', text: 'Gestión de Oposiciones', to: { name: 'manage-oppositions' }, can: 'list-oppositions' }
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
