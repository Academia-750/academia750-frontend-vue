export default {
  redirectToHomePageAfterLogout: function () {
    window.location.href = process.env.VUE_APP_BASE_URL_HOME
  }
}
