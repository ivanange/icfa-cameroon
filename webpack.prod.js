const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const glob = require("glob-all");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");

var path = require("path");
const PATHS = {
  src: path.join(__dirname, "src"),
};

module.exports = function (entry) {
  let fileName = Object.keys(entry)[0];
  let key = fileName.replace(/.+\/([^\/\\]+)\.[^\.]+$/g, "$1");
  return merge.smart(common, {
    mode: "production",
    entry: {
      [key]: fileName
    },
    output: {
      // filename: "js/[name].[chunkhash].js",
      filename: "js/[name].js",
    },
    optimization: {
      minimizer: [
        new TerserJSPlugin({}),
        new OptimizeCSSAssetsPlugin({
          cssProcessorPluginOptions: {
            preset: [
              "default",
              {
                discardComments: {
                  removeAll: true,
                },
              },
            ],
          },
        }),
      ],
    },
    module: {
      rules: [{
        test: /\.css$/i,
        use: [{
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              url: false,
            },
          },
          "postcss-loader",
        ],
      }, ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        // filename: "css/[name].[contenthash].css",
        filename: "css/[name].css",
        chunkFilename: "[id].css",
      }),

      new PurgecssPlugin({
        paths: glob.sync(Object.values(entry)[0], {
          nodir: true
        }),
        whitelist: [],
        whitelistPatterns: [],
        whitelistPatternsChildren: [],
        keyframes: true,
        fontFace: true,
        rejected: true,
        defaultExtractor: (content) =>
          content.match(/[\w-/:]+(?<!:)/g) || [],
      }),

      // new CompressionPlugin({
      //   filename: "[path].gz[query]",
      //   algorithm: "gzip",
      //   test: /\.js$|\.css$|\.html$/,
      //   minRatio: 1,
      // }),

      // new CompressionPlugin({
      //   filename: "[path].br[query]",
      //   algorithm: "brotliCompress",
      //   test: /\.(js|css|html|svg)$/,
      //   compressionOptions: {
      //     level: 11,
      //   },
      //   minRatio: 1,
      // }),
    ],
  });
};