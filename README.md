# Academia750

This is the frontend of Academia750 is a Vue JS managment portal where the admin and the student got access to different
features as generating opposition test, lessons calendar / material or online meetings.


- [Current Version](https://github.com/Academia-750/academia750-frontend-vue/tags)

## Stack

- [Vue 2](https://v2.vuejs.org/)
- Components [Veutify](https://v2.vuetifyjs.com/en/)
- CSS Heslpers [Veutify](https://vuetifyjs.com/en/styles/display/)
- Stores [Vuex](https://vuex.vuejs.org/)
- Router [Vue Router](https://router.vuejs.org/) But is wrapped in the helper `@utils/Toast` 
- From Validation [Vee Validate](https://vee-validate.logaretm.com/v2/guide/)
- For Videos: [Vimeo Video Player](https://www.npmjs.com/package/vue-vimeo-player)
- Zoom: We use iframe integration. We dont use the SDK because requires pay mememberhip.

## Commands

- `npm install`
> Install package dependencies


- `npm run dev` or `npm run serve`
> Compile and maintain in real time, present each change to update the web automatically for development


- `npm run build`
> Compile and minify for production - Deliver a dist folder in the root of the project, and the content inside it, contains the HTML, CSS and Javascript that you will later have to upload to the server. Remember that it is a SPA, therefore depending on the server, you will need an .htaccess or a __redirects


- `npm run lint`
> Lints and fixes files - Works for development environment, and uses Eslint to code with Vue JS version 2 standard good practices and rules.

## Folder Structure

In the phase 2 we have simplify the folder structure, you may see this change in some folders and you can adapt old folders to the new structure

- Resources: Common Code
  - components
    - form: Inputs
    - resources: Modals, buttons,
  - mixins
  - rules
  - store: Common stores that can be included in module stores

- Services: All the API services are here, not in the modules.

- Modules:
  - module: Is the root  component for the router
  - router: defines the router
  - component-names: A folder per component
    - index / [component-name] : view page
    - store: Component specific store
    - components: Folder for sub components used only in this page

## Navigation

The navigation is common but displayed according to the permissions `navigation.js`.

The logic about Roles and Permissions is in the `helpers` folder with functions like `manageRoles` `managePermission` and `manageInitialPage`
This functions are injected into vue in `main.js` where you can use the global functions `this.$hasRole` `this.$hasPermission` and `$this.initialPage` among others.


### Production

Make sure you add the `robots.txt` in production with the Allow option.


## Default User
### Default Super Admin

DNI:  00000000T
Password: academia750

## Notes

- In order to link a user to an opposition you need to manually update the database `opposition_user` table. 


