import ResourceService from '@/services/ResourceService'

export default {
  checkToken(config = {}) {
    return ResourceService.get('verify/token/header-authorization', config)
  },
  sendInformationContactUsForm(data, config = {}) {
    return ResourceService.post('/guest/user/contact-us', data, config)
  }
}
