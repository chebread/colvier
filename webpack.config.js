const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeEnv = process.env.NODE_ENV || 'development';

module.exports = {
  mode: nodeEnv === 'development' ? 'development' : 'production',
  entry: {
    main: './src/app.js',
  },
  output: {
    path: path.resolve('./dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          nodeEnv === 'development'
            ? 'style-loader'
            : {
                loader: MiniCssExtractPlugin.loader,
              },
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader',
        options: {
          name: '[name].[ext]?[hash]',
          limit: 200000,
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
};
