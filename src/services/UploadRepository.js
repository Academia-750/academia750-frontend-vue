import ResourceService from '@/services/ResourceService'
import CloudinaryService from './CloudinaryService'

export default {
  async uploadFile({ storage, file, folder }) {
    if (storage === 'digitalocean') {
      return await this.uploadToDigitalOcean({ file, folder })
    }
    if (storage === 'cloudinary') {
      const result = await CloudinaryService.upload({ file, folder })

      return result.secure_url
    }

    throw Error('Storage not supported')
  },

  async uploadToDigitalOcean({ file, folder }) {
    const formData = new FormData()

    formData.append('file', file)
    formData.append('folder', folder)

    const response = await ResourceService.post(
      'upload-image/digital-ocean',
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
