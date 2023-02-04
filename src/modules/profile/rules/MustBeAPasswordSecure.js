import { extend } from 'vee-validate'

extend('ItMustBeAPasswordSecure', {

  // before: $@$!%*?&#^)(
  // !”#$%&’)(*+,-./:;<=>?@]\[^_`}{|~

  validate: (value) => {
    //const PATTERN_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!”#$%&’)(*+,-./:;<=>?@]\[^_`}{|~])([A-Za-z\d!”#$%&’)(*+,-./:;<=>?@]\[^_`}{|~]|[^ ]){8,15}$/
    //const PATTERN_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#^=_/<>)(])([A-Za-z\d$@$!%*?&#^=_/<>)(]|[^ ]){8,15}$/

    // eslint-disable-next-line
    const PATTERN_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[;,:.-_\/\\!\?@#$%&^*()\[\]{}<>=]).{8,15}$/

    //const PATTERN_REGEX = /^(?=.[A-Z])(?=.[a-z])(?=.\d)(?=.[@$!%#?&])[A-Za-z\d@$!%#?&]{8,15}$/

    return PATTERN_REGEX.test(value)
  },
  message: 'Proporciona una contraseña segura que cumpla los requerimientos'
})
