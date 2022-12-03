export default {
  get_footer_props: function () {
    return {
      ...this.get_items_per_page_options_datatable,
      showFirstLastPage: true,
      firstIcon: 'mdi-arrow-collapse-left',
      lastIcon: 'mdi-arrow-collapse-right',
      prevIcon: 'mdi-minus',
      nextIcon: 'mdi-plus'
    }
  }
}
