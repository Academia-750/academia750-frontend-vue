import axios from 'axios'

export default {
  async upload(files, folderName) {
    const form = new FormData()

    console.log('-----folderName', folderName)

    form.append('file', files)
    form.append('upload_preset', 'testcase1')
    form.append('public_id', `${folderName}/${files.name}`)
    console.log('-----form', form)
    
    const res = await axios.post('https://api.cloudinary.com/v1_1/doap4brnx/upload', form)
  
    if (res.status !== 200) {
      ResourceService.warning({
        res
      })

      return false
    }

    return res.data
  }
}