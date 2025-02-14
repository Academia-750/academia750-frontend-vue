import axios from 'axios'
import toast from './toast'
import ResourceService from '@/services/ResourceService'

const BASE_API =
  process.env.NODE_ENV === 'development'
    ? process.env.VUE_APP_BASE_URL_API_DEVELOPMENT
    : process.env.VUE_APP_BASE_URL_API_PRODUCTION

export const blobToFileType = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    // Read the first few bytes of the blob
    reader.onloadend = () => {
      const uintArray = new Uint8Array(reader.result)

      // Check the magic number to determine the file type

      if (
        uintArray.length >= 4 &&
        uintArray[0] === 0x25 &&
        uintArray[1] === 0x50 &&
        uintArray[2] === 0x44 &&
        uintArray[3] === 0x46
      ) {
        return resolve({ type: '.pdf', mime: 'application/pdf' })
      }

      if (uintArray.length >= 2) {
        if (uintArray[0] === 0xff && uintArray[1] === 0xd8) {
          return resolve({ type: '.jpg', mime: 'image/jpeg' })
        }
        if (uintArray[0] === 0x89 && uintArray[1] === 0x50) {
          return resolve({ type: '.png', mime: 'image/png' })
        }
        if (uintArray[0] === 0x47 && uintArray[1] === 0x49) {
          return resolve({ type: '.gif', mime: 'image/gif' })
        }
        if (uintArray[0] === 0x42 && uintArray[1] === 0x4d) {
          return resolve({ type: '.bmp', mime: 'image/bmp' })
        }
      }

      return { type: '', mime: 'text/plain' }
    }
    reader.onerror = function (error) {
      reject(error)
    }

    reader.readAsArrayBuffer(blob.slice(0, 4))
  })
}

export const downloadOriginalFile = async (url, name) => {
  try {
    const response = await axios.get(url, {
      responseType: 'blob',
      // For internal files we still use the toke
      headers: {
        Authorization: url.includes(BASE_API)
          ? `Bearer ${ResourceService.defaults.headers.common['Authorization']} `
          : null
      }
    })

    const blob = new Blob([response.data], {})

    const info = await blobToFileType(blob)

    const link = document.createElement('a')

    link.href = URL.createObjectURL(blob)

    link.download = `${name}${info.type}`
    link.click()
    URL.revokeObjectURL(link.href)
  } catch (error) {
    if (error.name === 'AxiosError') {
      toast.error('No se pudo descargar este material', error.message)

      return
    }

    console.error(error)
  }
}

/**
 * This function is used only with downloads from our server
 * @param {*} url
 * @param {*} name
 */
export const downloadFile = async (url, name) => {
  try {
    const response = await axios.get(url, {
      responseType: 'blob',
      withCredentials: url.includes(BASE_API) // Use this only for Internal URLs
    })

    const blob = new Blob([response.data], {})

    const info = await blobToFileType(blob)

    const link = document.createElement('a')

    link.href = URL.createObjectURL(blob)

    link.download = `${name}${info.type}`
    link.click()
    URL.revokeObjectURL(link.href)
  } catch (error) {
    toast.error('No se pudo descargar este material', error.message)
    console.error(error)
  }
}

export const openInTab = async (url) => {
  try {
    const response = await axios.get(url, {
      responseType: 'blob',
      withCredentials: url.includes(BASE_API) // Use this only for Internal URLs
    })

    // Generate blob first to deduce the type
    const blob = new Blob([response.data])
    const fileType = await blobToFileType(blob)

    // Generated with the correct type
    const blobWithType = new Blob([response.data], { type: fileType.mime })

    const objectURL = URL.createObjectURL(blobWithType)

    window.open(objectURL, '_blank')

    URL.revokeObjectURL(objectURL)
  } catch (error) {
    toast.error('No se pudo abrir este material', error.message)
    console.error(error)
  }
}
