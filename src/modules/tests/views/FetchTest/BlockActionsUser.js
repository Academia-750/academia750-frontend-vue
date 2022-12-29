export default {
  methods: {
    blockEventJavascript($element, $eventName) {
      $element.addEventListener($eventName, ($event) => {
        $event.preventDefault()
        $event.stopPropagation()

        if ($event.keyCode === 123 || ($event.ctrlKey && $event.keyCode === 74)) {
          $event.preventDefault()
          $event.stopPropagation()
        }
      })
    },
    enableEventJavascript($element, $eventName) {
      $element.removeEventListener($eventName, ($event) => {
        $event.preventDefault()
        $event.stopPropagation()
      })
    }
  }
}
