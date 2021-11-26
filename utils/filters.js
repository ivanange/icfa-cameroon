const {
  DateTime
} = require('luxon');

module.exports = function (eleventyConfig) {
  return {
    // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    htmlDateString: (dateObj) => {
      return DateTime.fromJSDate(dateObj, {
        zone: 'utc'
      }).toFormat('yyyy-LL-dd');
    },

    tags: function (collection) {
      let tags = [];
      collection.forEach(function (item) {
        if ("tags" in item.data) {
          tags = tags.concat(item.data.tags);
        }
      });

      // returning an array in addCollection works in Eleventy 0.5.3
      return [...(new Set(tags))].filter(tag => tag !== 'article' && tag !== 'opportunité' && tag !== 'featured').sort();
    },

    readableDate: dateObj => {
      return DateTime.fromJSDate(dateObj, {
        zone: 'utc'
      }).toFormat("dd LLL yyyy");
    }
  }

}