import { activateError } from '@/helpers/manageErrors'

export const $KeepOneTabOpenInTheBrowserBroascastChannel = function () {

  const bc = new BroadcastChannel('Academia 750')

  bc.onmessage = (event) => {

    if (event.data === 'Am I the first?') {
      bc.postMessage('No you re not.')
      alert('Se acaba de abrir otra pestaña de este sitio')
    }
    if (event.data === 'No you re not.') {
      activateError({
        status: 'keep-one-tab',
        message: 'Solo puedes mantener una pestaña abierta en el navegador'
      })
      //window.location = 'https://freefrontend.com/assets/img/403-forbidden-html-templates/403-Forbidden.gif'
    }
  }

  bc.postMessage('Am I the first?')
}

export const $KeepOneTabOpenInTheBrowserLocalStorage = function () {
  // Broadcast that you're opening a page.
  localStorage.openpages = Date.now()

  const onLocalStorageEvent = function(e) {
    if (e.key === 'openpages') {
      localStorage.page_available = Date.now()
    }
    if (e.key === 'page_available') {
      //alert('One more page already open')
      activateError({
        status: 'keep-one-tab',
        message: 'Solo puedes mantener una pestaña abierta en el navegador'
      })
      //window.location = 'https://freefrontend.com/assets/img/403-forbidden-html-templates/403-Forbidden.gif'
    }
  }

  window.addEventListener('storage', onLocalStorageEvent, false)
}
