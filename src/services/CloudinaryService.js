// https://api.cloudinary.com/v1_1/<cloud name>/image/upload
import axios from 'axios'

export default {
async upload(files) {
  const form = new FormData()

  form.append('file', files)
  form.append('upload_preset', 'testcase1')
  form.append('public_id', files.name)
  const res = await axios.post('https://api.cloudinary.com/v1_1/doap4brnx/upload', form)
  
  if (res.status !== 200) {
    ResourceService.warning({
      res
    })

    return false
  }

  return res.data
  },
  async deleteCloudinaryFile(publicId) {
    const apiKey = '919131853643771'
    const apiSecret = 'Arr12gLoJ-7qPWga5R325VO_jSU'
    const cloudName = 'doap4brnx'
  
    const timestamp = Math.floor(Date.now() / 1000)
    const params = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`

    const signature = await axios.get(`https://api.cloudinary.com/v1_1/${cloudName}/resources/image/upload`, {
      params: {
        public_id: publicId,
        timestamp: timestamp,
        signature: sha1(params)
      },
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    })

    console.log('signature', signature)
    
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/image/upload/${publicId}`
    
    console.log('url', url)
    
    const headers = {
      'X-Requested-With': 'XMLHttpRequest',
      'X-CLOUDINARY-API-KEY': apiKey,
      'X-CLOUDINARY-API-SECRET': apiSecret,
      'X-CLOUDINARY-TIMESTAMP': timestamp,
      'X-CLOUDINARY-SIGNATURE': signature
    }
  
    try {
      const response = await axios.delete(url, { headers })

      if (response.status === 200) {
        console.log('File deleted successfully:', response.data)

        return true // File deleted successfully
      } else {
        console.error('Failed to delete file:', response.data)

        return false // File deletion failed
      }
    } catch (error) {
      console.error('An error occurred while deleting the file:', error)

      return false // Error during file deletion
    }
  }
  
}