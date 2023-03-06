import { extend } from 'vee-validate'

const validateStructureDniSpain = (value) => {
  const REGEX_THERE_ARE_8_DIGITS = /^\d{8}$/
  const REGEX_THERE_ARE_ONLY_LETTERS = /[a-zA-Z]/

  const lastLetter = value.substr(-1)

  const numbersWithoutLastCharacter = value.substr( 0, (value.length - 1))

  ////console.log(REGEX_THERE_ARE_8_DIGITS.test(numbersWithoutLastCharacter) && REGEX_THERE_ARE_ONLY_LETTERS.test(lastLetter))
  if (REGEX_THERE_ARE_8_DIGITS.test(numbersWithoutLastCharacter) && REGEX_THERE_ARE_ONLY_LETTERS.test(lastLetter)) {
    const lettersAlpha = 'TRWAGMYFPDXBNJZSQVHLCKE'
    const letterValid = lettersAlpha.substr( (numbersWithoutLastCharacter % 23) , 1)

    return (letterValid === lastLetter) && (lastLetter.length === 1) && (numbersWithoutLastCharacter.length === 8)
  }

  return false
}

const validateStructureNieSpain = (value) => {
  const PATTERN_REGEX_NIE = /^[XYZ]\d{7,8}[A-Z]$/

  if (PATTERN_REGEX_NIE.test(value)) {
    const firstLetter = value.substr(0 , 1)

    const numberByFirstLetter = getNumberByFirstLetterNIE(firstLetter)
    const remainingCharacterString = value.substr(1)

    const NIE = `${numberByFirstLetter}${remainingCharacterString}`

    return validateStructureDniSpain(NIE)
  }

  return false
}

const getNumberByFirstLetterNIE = (firstLetterChar) => {
  let letterToNumber = firstLetterChar

  switch (firstLetterChar) {
  case 'X':
    letterToNumber = 0
    break

  case 'Y':
    letterToNumber = 1
    break

  case 'Z':
    letterToNumber = 2
    break
  }

  return letterToNumber
}

extend('ItMustBeADniOrNieFromSpain', {
  validate: (value) => {
    const PATTERN_REGEX = /^\d{8}[a-zA-Z]$/

    if (PATTERN_REGEX.test(value)) {
      return validateStructureDniSpain(value)
    }

    return validateStructureNieSpain(value)
  },
  message: 'Este no es un DNI/NIE válido'
})

extend('ItMustBeADniOrNieFromSpainLogin', {
  validate: (value) => {
    const PATTERN_REGEX = /^\d{8}[a-zA-Z]$/

    if (PATTERN_REGEX.test(value)) {
      return validateStructureDniSpain(value)
    }

    return validateStructureNieSpain(value)
  },
  message: 'Este no es un DNI/NIE válido'
})
