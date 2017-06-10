const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 로더 개발자를 위한 로그 제거
process.noDeprecation = true;

const defaultEnv = {
  dev: false,
  production: true
};

module.exports = (env = defaultEnv) => ({
  context: path.join(__dirname),

  entry: [
    ...env.dev ? [
      './src/index.jsx',
      'webpack-dev-server/client?http://0.0.0.0:8080',
      'webpack/hot/only-dev-server',
    ] : ['./src/index.jsx'],
    path.join(__dirname, 'src/index.jsx')
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },


  devtool: env.dev ? 'inline-source-map' : 'cheap-module-source-map',

  devServer: {
    inline: true,
    hot: true,
    filename: 'bundle.js',
    publicPath: '/',
    historyApiFallback: true,
    contentBase: path.join(__dirname, '/dist/'),
  },

  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
        use: [{
          loader: 'babel-loader',
          options: {
            babelrc: true,
            presets: [
              ['es2015', { modules: false }],
              'react',
            ],
            plugins: ['react-hot-loader/babel'],
          }
        }]
      },
      {
        test: /\.(css|sass|scss)$/,
        use: env.dev ?
          [
            'style-loader',
            'css-loader',
            // 'sass-loader',
          ]
          : ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              { loader: 'css-loader', query: { modules: true, sourceMaps: true } },
              { loader: 'sass-loader' },
            ]
          }),
      }
    ]
  },

  plugins: [
    ...env.dev ? [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        minify: {
          collapseWhitespace: true,
          keepClosingSlash: true,
          removeComments: true
        }
      }),
    ] : [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin('styles.css'),
        new webpack.optimize.CommonsChunkPlugin({
          name: 'commons',
          filename: 'commons.js',
          minChunks: Infinity
        }),
        new HtmlWebpackPlugin({
          template: './src/index.html',
          minify: {
            collapseWhitespace: true,
            keepClosingSlash: true,
            removeComments: true
          }
        }),
      ]
  ]
});
