const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge.smart(common, {
  entry: {
    index: "./src/assets/bundles/js/index.ts",
    article: "./src/assets/bundles/js/article.ts",
    about: "./src/assets/bundles/js/about.ts",
  },
  cache: true,
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
  },
  module: {
    rules: [{
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              url: false,
            },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          {
            loader: "css-loader",
            options: {
              url: false,
            },
          },
          "postcss-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
});