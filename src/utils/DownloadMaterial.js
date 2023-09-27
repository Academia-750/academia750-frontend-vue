import axios from 'axios'

const download = async (url, name, type) => {
  try {
    console.log(url, name, type)
    
    const response = await axios.get(url, { responseType: 'blob' })

    console.log(response)
    const blob = new Blob([response.data], {})
    const link = document.createElement('a')

    link.href = URL.createObjectURL(blob)

    link.download = `${name}.${type}`
    link.click()
    URL.revokeObjectURL(link.href)
  } catch (error) {
    console.error(error)
  }
}

export default download
