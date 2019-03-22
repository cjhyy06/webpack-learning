let cleanWebpackPlugin = require('clean-webpack-plugin')
module.exports = {
  entry: {
    index: './app.js'
  },
  output: {
    filename: '[name].min.js'
  },
  plugins: [

    new cleanWebpackPlugin() // 清除webpack打包目录

  ]
}
