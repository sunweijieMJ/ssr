const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const nodeExternals = require('webpack-node-externals')

module.exports = (env, argv) => {
  return merge(base(env, argv), {
    target: 'node',
    //devtool: '#source-map',
    devtool: false,
    entry: './src/server.entry.js',
    output: {
      filename: 'server.bundle.js',
      libraryTarget: 'commonjs2'
    },
    resolve: {
      alias: {
        'create-api': '../create.api.server.js'
      }
    },
    externals: nodeExternals({
      // do not externalize CSS files in case we need to import it from a dep
      whitelist: /\.css$/
    }),
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
        'process.env.VUE_ENV': '"server"'
      }),
      new VueSSRServerPlugin()
    ]
  })

}