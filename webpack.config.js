module.exports = {
  mode: 'development',
  entry: './src/Index.tsx',
  output: {
    filename: './bundle.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {loader: 'ts-loader'}
        ]
      },
      {
        test: /\.css?$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  }
};
