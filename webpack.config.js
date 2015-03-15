module.exports = {
  entry: ['./src/index.jsx'],
  module: {
    loaders: [
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
