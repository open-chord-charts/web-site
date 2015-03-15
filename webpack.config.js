module.exports = {
  entry: ['./src/index.jsx'],
  module: {
    loaders: [
      {
        loader: "style-loader!css-loader",
        test: /\.css$/,
      },
      {
        exclude: /node_modules/,
        loaders: ['6to5-loader'],
        test: /\.jsx?$/,
      },
      {
        exclude: /node_modules/,
        loader: 'json-loader',
        test: /\.json$/,
      },
      {
        loader: "file-loader",
        test: /\.eot$/,
      },
      {
        loader: "file-loader",
        test: /\.svg$/,
      },
      {
        loader: "file-loader",
        test: /\.ttf$/,
      },
      {
        loader: "url-loader?limit=10000&minetype=application/font-woff",
        test: /\.woff$/,
      },
      {
        loader: "url-loader?limit=10000&minetype=application/font-woff2",
        test: /\.woff2$/,
      },
    ]
  },
  output: {
    filename: 'bundle.js',
    publicPath: '/build/',
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};
