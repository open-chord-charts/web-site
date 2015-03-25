var webpack = require('webpack');
var WebpackErrorNotificationPlugin = require('webpack-error-notification');


module.exports = function(options) {
  return {
    debug: !options.production,
    devtool: options.production ? null : 'eval',
    entry: './src/index.js',
    module: {
      loaders: [
        {
          loader: "style!css",
          test: /\.css$/,
        },
        {
          exclude: /node_modules/,
          loaders: ['react-hot', 'babel?optional=runtime'],
          test: /\.jsx?$/,
        },
        {
          exclude: /node_modules/,
          loader: 'json',
          test: /\.json$/,
        },
        {
          loader: "file",
          test: /\.eot$/,
        },
        {
          loader: "file",
          test: /\.svg$/,
        },
        {
          loader: "file",
          test: /\.ttf$/,
        },
        {
          loader: "url?limit=10000&minetype=application/font-woff",
          test: /\.woff$/,
        },
        {
          loader: "url?limit=10000&minetype=application/font-woff2",
          test: /\.woff2$/,
        },
      ],
    },
    output: {
      filename: options.production ? 'app.[hash].js' : 'app.js',
      path: options.production ? './dist' : './build',
      publicPath: '',
    },
    plugins: options.production ? [
      new webpack.DefinePlugin({
        API_BASE_URL: JSON.stringify('//api.openchordcharts.org/api/1'),
      }),
      new webpack.DefinePlugin({
        "process.env": {
          "NODE_ENV": JSON.stringify("production"),
        },
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
      }),
    ] : [
      new WebpackErrorNotificationPlugin(process.platform === 'linux' && function(msg) {
        if (!this.lastBuildSucceeded) {
          require('child_process').exec('notify-send --hint=int:transient:1 Webpack ' + msg);
        }
      }),
      new webpack.DefinePlugin({
        API_BASE_URL: JSON.stringify('//localhost:3000/api/1'),
      }),
      new webpack.ProvidePlugin({'jQuery': 'jquery'}),
    ],
    resolve: {
      extensions: ['', '.js', '.jsx']
    }
  };
};
