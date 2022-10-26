export function getErrorsMessagesValidation(responseErrorV) {
  const errors = []
  let values_object_errors = []

  values_object_errors = Object.values(responseErrorV)

  values_object_errors.forEach((errorsApiItem) => {
    errorsApiItem.forEach((error) => {
      errors.push(error)
    })
  })

  return errors.length > 0 ? errors : null
}
