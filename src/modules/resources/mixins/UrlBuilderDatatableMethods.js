export default {
  methods: {
    buildQueryParamsRequest () {
      this.queryRequestParams = {}

      this.buildQueryFilter(this.optionsDatatable)

      return this.queryRequestParams
    },
    buildQueryFilter (options) {
      const value = this.searchWord

      if (value) {
        this.queryRequestParams['filter[search]'] = value
      }

      this.builderQuerySort (options)
    },
    builderQuerySort (options) {
      let URLSortParams = ''

      const { sortBy, sortDesc } = options

      if (Array.isArray(sortBy)) {
        sortBy.forEach( (field, index) => {
          const buildField = sortDesc[index] ? `-${field}` : field

          if ((sortBy.length - 1) === index) {

            URLSortParams += `${buildField}`
          } else {

            URLSortParams += `${buildField},`
          }

        })

        if (sortBy.length > 0) {
          this.queryRequestParams['sort'] = URLSortParams
        }
      }

      this.builderQueryPagination(options)
    },
    builderQueryPagination ({ page, itemsPerPage }) {
      this.queryRequestParams['page[size]'] = itemsPerPage
      this.queryRequestParams['page[number]'] = page

      this.buildQueryIncludeRelationships()
    },
    buildQueryIncludeRelationships () {
      if (this.namesRelationshipsIncludeRequest) {
        this.queryRequestParams['include'] = this.namesRelationshipsIncludeRequest
      }
    }
  }
}
