let CleanWebpackPlugin = require('clean-webpack-plugin')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let uglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry:
  {
    app: './app.js'
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   sideEffects: false
      // },
      {
        test: /\.css$/,
        use: {
          loader: 'css-loader'
        }
      }
    ]
  },
  optimization: {
    namedModules: true,
    namedChunks: true,
    nodeEnv: 'development',
    minimize: false,
    sideEffects: false,
    minimizer: [
      new uglifyJsPlugin(
      {
        uglifyOptions: {
          warnings: false,
          parse: {},
          compress: {
            unused: true
          },
          mangle: true, // Note `mangle.properties` is `false` by default.
          output: null,
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_fnames: false,
        },
      })
    ],
    usedExports: false
  },
  mode: 'development',
  plugins: [

    new HtmlWebpackPlugin({
      template: './index.html'
    }),

    new CleanWebpackPlugin() // 清除webpack打包目录
  ]
}
