const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const utils = require('./utils')
const config = require('./config')
const vueLoaderConfig = require('./vue-loader.config')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const resolve = dir => path.join(__dirname, '..', dir)
// 读取外部 env 配置文件信息
let envConfig = {};
if(process.argv[2] && fs.existsSync(process.argv[2])) {
  envConfig = require(process.argv[2]);
} else {
  envConfig = require('../config/config');
}
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  entry: {
    app: './src/client.entry.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: isProd
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    },
    modules: [resolve('src'), resolve('node_modules')]
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'), resolve('/static/plyr/js')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 100,
          name: utils.assetsPath('img/[name].[hash:7].[ext]'),
          publicPath: isProd
            ? envConfig.resouceDomain + config.build.assetsPublicPath
            : config.dev.assetsPublicPath
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 100,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  performance: {
    maxEntrypointSize: 300000,
    hints: isProd ? 'warning' : false
  },
  plugins: isProd
  ? [
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
    // minify css after extract
    new OptimizeCSSPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        discardComments: { removeAll: true },
        // 避免 cssnano 重新计算 z-index
        safe: true
      },
      canPrint: false
    }),
    // minify JS
    new webpack.optimize.UglifyJsPlugin({
      workers: require('os').cpus().length,
      mangle: true,
      compress: {
        warnings: false,
        drop_console: true
      },
      sourceMap: true
    }),
    // keep module.id stable when vender modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // Scope Hositing
    new webpack.optimize.ModuleConcatenationPlugin(),
  ]
  : [new FriendlyErrorsPlugin()]
}
