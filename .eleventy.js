const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const sitemap = require("@quasibit/eleventy-plugin-sitemap");

const site = require("./src/_data/site.js");

module.exports = function (eleventyConfig) {

  // require them here to access eleventyConfig
  const filters = require('./utils/filters.js')(eleventyConfig);
  const transforms = require('./utils/transforms.js')(eleventyConfig);
  const collections = require('./utils/collections.js')(eleventyConfig);

  // add navigation plugin
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // add sitemap plugin
  eleventyConfig.addPlugin(sitemap, {
    sitemap: {
      hostname: site.host,
    },
  });

  // enable deep merge for data
  eleventyConfig.setDataDeepMerge(true);

  let production = process.env.ELEVENTY_ENV === "production";

  if (production) {
    eleventyConfig.addPassthroughCopy("src/assets/!(img|bundles)/**");
  } else {

    // only ignore bundles
    eleventyConfig.addPassthroughCopy("src/assets/!(bundles)/**");

    // watch bundles
    eleventyConfig.addWatchTarget("./src/assets/bundles/");
  }



  // Filters
  Object.keys(filters).forEach((filterName) => {
    eleventyConfig.addFilter(filterName, filters[filterName]);
  });

  // Transforms
  Object.keys(transforms).forEach((transformName) => {
    eleventyConfig.addTransform(transformName, transforms[transformName]);
  });

  // Collections
  Object.keys(collections).forEach((collectionName) => {
    eleventyConfig.addCollection(collectionName, collections[collectionName]);
  });


  return {
    dir: {
      input: "src",
      output: "dist",
    },
    htmlTemplateEngine: "njk",

    // 1.1 Enable eleventy to pass dirs specified above
    passthroughFileCopy: true,
  };
};          