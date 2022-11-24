export const $KeepOneTabOpenInTheBrowser = function () {

  const bc = new BroadcastChannel('Academia 750')

  bc.onmessage = (event) => {

    if (event.data === 'Am I the first?') {
      bc.postMessage('No you re not.')
      alert('Se acaba de abrir otra pestaña de este sitio')
    }
    if (event.data === 'No you re not.') {
      alert('Ya se está ejecutando una instancia de este sitio')
      window.close()
    }
  }

  bc.postMessage('Am I the first?')
}
