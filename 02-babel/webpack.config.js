module.exports = {
  entry: {
    app: './app.js'
  },

  output: {
    filename: '[name].[hash:8].js'
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
