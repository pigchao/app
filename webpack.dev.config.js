const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config = require('./config');

const baseConfig = require("./webpack.base");
const devConfig = Object.assign({}, baseConfig);

devConfig.entry.app = [
  path.join(__dirname, 'src/client/app'),
  'webpack-dev-server/client?http://'+config.host+':'+config.port+'/',
  'webpack/hot/dev-server',
];
devConfig.devtool = 'inline-cheap-source-map';
devConfig.output.filename = '[name].js';
devConfig.plugins.push(
  new ExtractTextPlugin({filename: '[name].css'}),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('development'),
    },
  }),
  new webpack.HotModuleReplacementPlugin()
);

module.exports = devConfig;