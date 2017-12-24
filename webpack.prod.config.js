const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin  = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const baseConfig = require("./webpack.base");
const prodConfig = Object.assign({}, baseConfig);
prodConfig.devtool = false;
if(process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'preview'){
  process.env.STATIC_PATH === 'cdn' ? prodConfig.output.publicPath = 'https://static.webull.com/invest/' : null;
  prodConfig.plugins.push(
    // new BundleAnalyzerPlugin({generateStatsFile: true}),
    new CleanPlugin(['./dist/*']),
    new ExtractTextPlugin({filename: '[name].[contenthash:8].css'}),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: false,
      output: {
        comments: false,
      },
      compress: {
        warnings: false,
        drop_debugger: true,
        drop_console: true
      }
    })
  )
} else {
  prodConfig.output.chunkFilename = '[name].js';
  prodConfig.output.filename = '[name].js';
  prodConfig.plugins.push(
    new CleanPlugin(['./dist/*']),
    new ExtractTextPlugin({filename: '[name].css'}),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      },
    })
  )
}
module.exports = prodConfig;