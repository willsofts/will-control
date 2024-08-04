
const path = require("path");
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({  
  transpileDependencies: true,
  css: {
    extract: false
  },
  configureWebpack: {
    output: {
      libraryExport: 'default'
    },    
    devtool: "source-map",
    optimization: {
      minimize: false
    },
    resolve: {
      alias: {
        // bind to modules;
        modules: path.join(__dirname, "node_modules")
      }
    },
  }    
})
