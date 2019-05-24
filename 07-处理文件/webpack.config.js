let HtmlWebpackPlugin = require('html-webpack-plugin')
let CleanWebpackPlugin = require('clean-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')

let extractCss = new MiniCssExtractPlugin({
  filename: 'css/[name].bundle.css'
})

module.exports = {
  entry: {
    app: './src/app.js'
  },
  output: {
    filename: '[name].bundle.js',
    publicPath: ''
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              singleton: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              import: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                  require('postcss-sprites')({
                  retina: true,
                  verbose: true,
                  stylesheetPath: './dist/css/',
                  spritePath: './dist/images/'
                })
              ]
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 9000,
              name: '[name].[ext]',
              outputPath: 'images'
            }
          },
          {
            loader: 'img-loader',
            options: {
              plugins: [
                require('imagemin-mozjpeg')({
                  progressive: true,
                  arithmetic: false
                })
              ]
            }
          }
         ]
      }
    ]
  },
  plugins: [
    extractCss,
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: false
      }
    }),
    new CleanWebpackPlugin()
  ]
}
