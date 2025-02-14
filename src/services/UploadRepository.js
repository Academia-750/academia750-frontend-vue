import ResourceService from '@/services/ResourceService'
import CloudinaryService from './CloudinaryService'

export default {
  async uploadFile({ storage, file, folder, name }) {
    if (storage === 'digitalocean') {
      return await this.uploadToDigitalOcean({ file, folder, name })
    }
    if (storage === 'cloudinary') {
      const result = await CloudinaryService.upload({ file, folder, name })

      return result.secure_url
    }

    throw Error('Storage not supported')
  },

  async uploadToDigitalOcean({ file, folder, name }) {
    const formData = new FormData()

    formData.append('file', file)
    formData.append('folder', folder)
    formData.append('name', name)

    const response = await ResourceService.post(
      'images/digital-ocean',
      formData
    )

    if (response.status !== 201) {
      ResourceService.warning({
        response
      })

      return ''
    }

    return response.data.url
  }
}
