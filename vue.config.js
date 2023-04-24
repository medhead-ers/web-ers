const path = require('path')

module.exports = {
  devServer: {
    port: '3000'
  },
  chainWebpack: config => {
    config.resolve.alias.set(
      'vue$',
      path.resolve(__dirname, 'node_modules/vue/dist/vue.runtime.esm.js')
    )
  },
  lintOnSave: true,
}
