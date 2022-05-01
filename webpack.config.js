const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const { ESBuildMinifyPlugin } = require('esbuild-loader');
const nodeEnv = process.env.NODE_ENV || 'development';
const config = {
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
        loader: 'esbuild-loader',
        exclude: /node_modules/,
        options: {
          target: 'es2015',
        },
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
        test: /\.(png|jpe?g|gif)$/,
        loader: 'url-loader',
        options: {
          name: '[name].[ext]?[hash]',
          limit: 20000,
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      new ESBuildMinifyPlugin({
        target: 'es2015',
        css: true,
      }),
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
  ],
};
const configWithSmp = new SpeedMeasurePlugin().wrap(config);
configWithSmp.plugins.push(
  new MiniCssExtractPlugin({
    filename: '[name].css',
  })
);
module.exports = configWithSmp;
