const webpack = require('webpack');
const path = require('path');
const md5 = require('md5');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const config = require('./config');
const walk = require('walk');

const baseConfig = {
  entry: {
    'app': path.join(__dirname, 'src/client/app'),
  },
  output: {
    path: path.join(__dirname, 'dist/client'),
    filename: '[name].[chunkhash:8].js',
    chunkFilename: '[name].[chunkhash:8].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: [path.resolve(__dirname, "node_modules")],
        loaders: [
          {
            loader: 'awesome-typescript-loader',
            options: { configFileName: path.resolve(__dirname, './tsconfig.json') },
          }
        ],
      },
      {
        test: /\.(less)$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader?sourceMap',
          use: [
            { loader: 'css-loader' },
            { loader: 'postcss-loader', options: {
                plugins: function () {
                  return [require('postcss-cssnext'), require('postcss-flexbugs-fixes')];
                }
              }
            },
            { loader: 'less-loader'}
          ],
        }),
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|ttf|eot|otf|woff|woff2)$/,
        loader: "url-loader?limit=10000",
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'WEBPACK_VERSION': JSON.stringify(md5(Date.now()).substr(0, 16)),
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./lib/vendor-manifest.json')
    }),
    new AddAssetHtmlPlugin([
      {
        filepath: fetchLibFilePath(/^vendor.*\.js$/),
        includeSourcemap: false
      }
    ]),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      // alwaysWriteToDisk: true,
      filename: 'app.html',
      template: path.join(__dirname,'src/client/app.html'), //取DLL打包之后的文件作为模板
      minify: process.env.NODE_ENV === null || process.env.NODE_ENV === 'development' ? null : {
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true
      },
    }),
  ],
};

function fetchLibFilePath(libNameReg){
  let filePath = "";
  walk.walkSync(path.join(__dirname, './lib'), {
    listeners: {
      file: function (root, fileStats, next) {
        if(libNameReg.test(fileStats.name)){
          filePath = path.resolve(root, fileStats.name);
        }else{
          next();
        }
      }
    }
  });
  return filePath;
}

module.exports = baseConfig;