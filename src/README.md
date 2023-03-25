# USO

Esta carpeta es para poder colocar todos los archivos que conforman el funcionamiento y desarrollo de una SPA (Single Page Application) de Vue JS v2 (versión 2)
El archivo *main.js* es el primer punto de entrada más importante del proyecto. Aquí se configurará todos los archivos que se van a utilizar en el proyecto, funcionalidades principales como Helpers, Middlewares, Rutas, Store (para estados globales de la aplicación) y poder indicar en que elemento html se deberá inyectar todas las vistas o páginas funcionales.

El archivo *App.vue* es el segundo punto de entrada que se configura primero en el archivo *main.js*. Este archivo se utiliza para indicar el primer fragmento HTML global que se va a renderizar en la página. Aquí podremos encontrar principalmente 3 elementos que son: El Fragmento html definido por la etiqueta <template></template>, el segundo definido por un <script></script> y el tercero que puede ser opcional definido por un <style></style>.
Este se considera como un Layout principal, en el cual en el fragmento html, podremos encontrar una etiqueta <router-view></router-view> la cual indica que aquí se van a inyectar cada una de las rutas que están configuradas en la carpeta */src/router/index.js* el cual solo es el punto de entrada de las rutas, pero este se explicará en esa carpeta, porque no todas las rutas están definidas ahí
