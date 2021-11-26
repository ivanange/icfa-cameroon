module.exports = function (eleventyConfig) {
  return {
    tags: function (collection) {
      return eleventyConfig.getFilter('tags')(collection.getAll());
    }
  }

}