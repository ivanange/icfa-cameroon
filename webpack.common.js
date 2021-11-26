/* eslint-disable no-var, strict, prefer-arrow-callback */
"use strict";

var path = require("path");

module.exports = {
  module: {
    rules: [{
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [{
            loader: "babel-loader",
          },
          {
            loader: "ts-loader",
          },
        ],
      },
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: [{
          loader: "babel-loader",
        }, ],
      },
    ],
  },
  plugins: [],
  resolve: {
    alias: {
      '@': path.resolve(__dirname),
    },
    extensions: [".ts", ".tsx", ".js"],
  },
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "dist/assets/bundles"),
  },
};