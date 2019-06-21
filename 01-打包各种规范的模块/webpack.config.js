let cleanWebpackPlugin = require('clean-webpack-plugin')
module.exports = {
  entry: {
    index: ['./non-module.js', './app.js']
  },
  output: {
    filename: '[name].min.js',
    // libraryTarget: 'umd'
  },
  plugins: [

    new cleanWebpackPlugin() // 清除webpack打包目录

  ]
}
