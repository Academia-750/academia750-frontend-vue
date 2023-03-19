# USO
En esta carpeta se configuran todos los servicios HTTP para configurar alguna instancia de un Servicio como por ejemplo, Axios, Fetch, jQuery Ajax, xmlhttprequest, etc...

# Instrucciones

* Agregar correctamente los archivos Javascript con Nombres Genericos terminando con la palabra "Services"
* Principalmente deben de usar el servicio para hacer las peticiones HTTP, en este caso se usa Axios:
```
import axios from 'axios'
```
* Para controlar errores que se generen por HTTP, usa las siguientes funciones que puedes importar de esta manera:
```
import { activateError } from '@/helpers/manageErrors'
import { disabledLoadingProgressCircular } from '@/helpers/manageLoading'
```
* Antes de establecer la configuración de la instancia HTTP, como por ejemplo, colocar que URL se ubica la API, o cada uno de sus Endpoints, usa una configuración que detecte si se trata de un entorno en local o producción y dependiendo el entorno, usar una u otra variable definida en el .env
```
const IsDevelopmentEnviroment = process.env.NODE_ENV === 'development'
const serverApiDevelopment = process.env.VUE_APP_BASE_URL_API_DEVELOPMENT
const serverApiProduction = process.env.VUE_APP_BASE_URL_API_PRODUCTION
```
* Recomiendo configurar interceptores para errores genéricos que puedan suceder al momento de hacer peticiones HTTP a la API
