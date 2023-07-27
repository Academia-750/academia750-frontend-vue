# Academia750

- Vue js Admin with dark mode + RTL + Demo Apps
- Vuetify - Number #1 UI Vue Component Library
- Integrated with Vue CLI + Vuex + Vue-Router

<br/>
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
    


## Default User
### Default Super Admin

DNI:  74237694L
Password: academia750
