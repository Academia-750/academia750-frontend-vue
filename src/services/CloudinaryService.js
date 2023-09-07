import axios from 'axios'

const cloudinary_preset = process.env.VUE_APP_CLOUDINARY_PRESET || 'academy750'

const cloudinary_id = process.env.VUE_APP_CLOUDINARY_ID || ''

export default {
  async upload(files, folderName) {
    const form = new FormData()

    form.append('file', files)
    form.append('upload_preset', cloudinary_preset)
    form.append('public_id', `${folderName}/${files.name}`)

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudinary_id}/upload`,
      form
    )

    if (res.status !== 200) {
      ResourceService.warning({})

      return false
    }

    return res.data
  }
}
