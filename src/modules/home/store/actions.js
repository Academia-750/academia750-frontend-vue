import HomeRepository from '../repositories/HomeRepository'

const verifyTokenAuthCookie = async (_ , config) => {
  try {

    const response = await HomeRepository.checkToken(config)

    return Promise.resolve(response)

  } catch (error) {
    console.log(error)

    return Promise.reject(error)
  }
}

const sendInformationContactUSForm = async (_ , options) => {
  try {

    const response = await HomeRepository.sendInformationContactUsForm(options.data, options.config)

    return Promise.resolve(response)

  } catch (error) {
    console.log(error)

    return Promise.reject(error)
  }
}

export default {
  verifyTokenAuthCookie,
  sendInformationContactUSForm
}
