import config from '@/configs'

export default {
  head: {
    title: function () {
      return {
        inner: this.titleView ?? ''
      }
    },
    link: [
      // adds config/icons into the html head tag
      ...config.icons.map((href) => ({ rel: 'stylesheet', href }))
    ]
  }
}
