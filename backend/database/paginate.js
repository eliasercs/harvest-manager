const paginateConfig = ({limit = 5, page = 1}) => ({
    limit: parseInt(limit, 10),
    page: parseInt(page, 10)
})

module.exports = {
    paginateConfig
}