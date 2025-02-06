import axios from 'axios'
import AuthService from './AuthService'

import { deleteUndefined } from '@/helpers/utils'
import ResourceService from '@/services/ResourceService'
import Toast from '@/utils/toast'

export default {
  /**
   * @param {string} name
   * @param {string} date
   * @param {string} start_time
   * @param {string} end_time
   */
  async uploadToDigitalOcean(file) {
    const formData = new FormData()

    formData.append('file', file)
    const response = await ResourceService.post(
      'upload-image/digital-ocean',
      formData
    )

    if (response.status !== 200) {
      ResourceService.warning({
        response
      })

      return false
    }

    return response.data.result
  }
}
