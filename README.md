Temporal branch for fixes of v1.0.0 while v2.0.0 is already on development

# Academia750

- Vue js Admin with dark mode + RTL + Demo Apps
- Vuetify - Number #1 UI Vue Component Library
- Integrated with Vue CLI + Vuex + Vue-Router

<br/>


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
#### `npm install`
> Install package dependencies

#### `npm run dev` or `npm run serve`
> Compile and maintain in real time, present each change to update the web automatically for development

#### `npm run build`
> Compile and minify for production - Deliver a dist folder in the root of the project, and the content inside it, contains the HTML, CSS and Javascript that you will later have to upload to the server. Remember that it is a SPA, therefore depending on the server, you will need an .htaccess or a __redirects

#### `npm run lint`
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
    

### Production

Make sure you add the `robots.txt` in production with the Allow option.



## Default User
### Default Super Admin

DNI:  00000000T
Password: academia750

## Notes

- In order to link a user to an opposition you need to manually update the database `opposition_user` table. 

## According to permission here are pages you see when you login

- If user is Admin we check for role if is admin we open students page
- If user has permission see-lessons we open with calendar
- If user has permission generate-test we open questionaire page
- If user has default role we open profile page
