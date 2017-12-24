/**
 * Created by lwch on 2017/2/6.
 */
const path = require('path');
const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
  output: {
    path: path.join(__dirname, 'lib'),
    filename: '[name].[chunkhash:8].js',
    library: '[name]_[chunkhash:8]',
  },
  entry: {
    vendor: ['react', 'react-dom'],
  },
  plugins: [
    new CleanPlugin(['./lib/*']),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.DllPlugin({
      path: path.join(__dirname, 'lib', '[name]-manifest.json'),
      name: '[name]_[chunkhash:8]',
      context: __dirname,
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
  ],
};