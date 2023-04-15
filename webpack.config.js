const path = require("path");
const webpack = require("webpack");

module.exports = {
  resolve: {
    alias: {
      url: path.resolve(__dirname, "node_modules/url"),
    },
  },
};
