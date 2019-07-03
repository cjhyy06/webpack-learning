const webpack = require('webpack')
module.exports = {
  entry: {
    app: './app.js'
  },

  output: {
    filename: '[name].js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: '/node-modules/',
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}
