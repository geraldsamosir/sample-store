var webpack = require("webpack");

module.exports = {
  entry: './src/js/main',

  output: {
    path: __dirname + '/public/javascripts',
    filename: 'app.js'
  },

  devtool: 'source-map',

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  module: {

    loaders: [
      {
        test: /\.(jsx|js)$/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        }
      }
    ]

  },

  plugins: [

    new webpack.EnvironmentPlugin([
      'NODE_ENV'
    ]),

    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: {
        warnings: false
      }
    })

  ]
};
