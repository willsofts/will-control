
const path = require("path");
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({  
  transpileDependencies: true,
  css: {
    extract: true
  },
  configureWebpack: {
    devtool: "source-map",
    optimization: {
      minimize: false
    },
    resolve: {
      alias: {
        "jquery-ui": "jquery-ui-dist/jquery-ui.js",
        modules: path.join(__dirname, "node_modules")
      }
    },
  }    
})
