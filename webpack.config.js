module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: 'eval',
  module: {
    loaders: [
      {
        test: /.html$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]'
        }
      },
      {
        test: /.jsx$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/
      },
    ]
  }
};