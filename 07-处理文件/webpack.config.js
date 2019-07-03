let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let CleanWebpackPlugin = require('clean-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
let SpritesmithPlugin = require('webpack-spritesmith')
let ImageminPlugin = require('imagemin-webpack-plugin').default

let extractCss = new MiniCssExtractPlugin({
  filename: 'css/[name].bundle.css'
})

module.exports = {
  mode: 'production',
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
          // {
          //   loader: 'postcss-loader',
          //   options: {
          //     ident: 'postcss',
          //     plugins: [
          //         require('postcss-sprites')({
          //         retina: true,
          //         verbose: true,
          //         stylesheetPath: './dist/css/',
          //         spritePath: './dist/images/'
          //       })
          //     ]
          //   }
          // }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1999000,
              name: '[name].[ext]',
              outputPath: 'images',
              publicPath: '../images'
            }
          },
          // {
          //   loader: 'img-loader',
          //   options: {
          //     plugins: [
          //       require('imagemin-mozjpeg')({
          //         progressive: true,
          //         arithmetic: false
          //       })
          //     ]
          //   }
          // }
         ]
      },
      {
        test: /\.(woff2?|ttf|eot|svg)(\?[\s\S])?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'fonts',
              name: '[name]-[hash:8].[ext]',
              publicPath: '../fonts'
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

    new SpritesmithPlugin({
      src: {
        cwd: path.resolve(__dirname, 'src/assets/images'),
        glob: '*.jpg'
      },
      target: {
        image: path.resolve(__dirname, 'src/assets/images/sprite.png'),
        css: path.resolve(__dirname, 'src/css/sprite.css')
      },
      apiOptions: {
        cssImageRef: '../assets/images/sprite.png' //cssImageRef为必选项
      }
    }),

    new ImageminPlugin({
      test: /\.(png|jpg|jpeg|svg)$/,
      pngquant: '65-80',
      plugins: [
        require('imagemin-mozjpeg')({
          progressive: true,
          arithmetic: false
        })
      ]
    }),

    new CleanWebpackPlugin()
  ]
}
