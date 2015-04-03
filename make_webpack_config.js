/*
Open Chord Charts -- Database of free chord charts
By: Christophe Benz <contact@openchordcharts.org>

Copyright (C) 2012, 2013, 2014, 2015 Christophe Benz
https://github.com/openchordcharts/

This file is part of Open Chord Charts.

Open Chord Charts is free software; you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

Open Chord Charts is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/


var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlPlugin = require('html-webpack-plugin');
var path = require('path');
var webpack = require('webpack');
var ErrorNotificationPlugin = require('webpack-error-notification');

var packageJSON = require('./package.json');


module.exports = function(options) {
  var plugins = [
    new ExtractTextPlugin('[name].[contenthash].css'),
    new HtmlPlugin({template: './index.tmpl.html'}),
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
      new ErrorNotificationPlugin(process.platform === 'linux' && function(msg) {
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
    entry: {
      app: './src/index.js',
      normalize: 'normalize.css',
    },
    module: {
      loaders: [
        {
          // loaders: ['file?name=[name].[hash].css', 'css'],
          loaders: [ExtractTextPlugin.extract('style-loader', 'css-loader'), 'css?minimize'],
          test: /\.css$/,
        },
        {
          loader: 'html',
          test:/\.html$/,
        },
        {
          include: path.join(__dirname, 'src'),
          loaders: ['react-hot', 'babel'],
          test: /\.jsx?$/,
        },
      ],
    },
    output: {
      filename: 'app.[hash].js',
      path: './dist',
    },
    plugins: plugins,
    resolve: {
      extensions: ['', '.js', '.jsx'],
      fallback: path.join(__dirname, 'node_modules'),
    },
    resolveLoader: {
      fallback: path.join(__dirname, 'node_modules'),
    },
  };
};
