var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var webpack = require('webpack');
var WebpackErrorNotificationPlugin = require('webpack-error-notification');

var packageJSON = require('./package.json');


module.exports = function(options) {
  var plugins = [
    new ExtractTextPlugin('app.[hash].css'),
    new HtmlWebpackPlugin({template: './index.tmpl.html'}),
  ];
  if (options.production) {
    plugins = plugins.concat([
      new webpack.DefinePlugin({
        API_BASE_URL: JSON.stringify('//api.openchordcharts.org/api/1'),
        'process.env': {
          'NODE_ENV': JSON.stringify('production'), // Removes react debug code.
        },
        VERSION: JSON.stringify(packageJSON.version),
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
        output: {
          comments: false,
        },
      }),
    ]);
  } else {
    plugins = plugins.concat([
      new WebpackErrorNotificationPlugin(process.platform === 'linux' && function(msg) {
        if (!this.lastBuildSucceeded) {
          require('child_process').exec('notify-send --hint=int:transient:1 Webpack ' + msg);
        }
      }),
      new webpack.DefinePlugin({
        API_BASE_URL: JSON.stringify('//localhost:3000/api/1'),
        VERSION: JSON.stringify(packageJSON.version),
      }),
    ]);
  }
  return {
    debug: !options.production,
    devtool: options.production ? null : 'eval',
    entry: [
      './src/index.js',
      './src/index.less',
    ],
    module: {
      loaders: [
        {
          include: path.join(__dirname, 'src'),
          loaders: ['react-hot', 'babel'],
          test: /\.jsx?$/,
        },
        {
          exclude: /node_modules/,
          loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader'),
          test: /\.less$/,
        },
      ],
    },
    output: {
      filename: 'app.[hash].js',
      path: './dist',
      publicPath: '',
    },
    plugins: plugins,
    resolve: {
      extensions: ['', '.js', '.jsx']
    }
  };
};
