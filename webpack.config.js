const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const fileDep = path.resolve(__dirname, 'dist');

module.exports = (env) => ({
  context: __dirname,
  entry: ['@babel/polyfill', './src/index.jsx'],
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        tinymceVendor: {
          test: /[\\/]node_modules[\\/](tinymce)[\\/](.*js|.*skin.css)|[\\/]plugins[\\/]/,
          name: 'tinymce',
        },
      },
    },
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: (env.ENV_MODE === 'staging' && env.branch && env.branch !== 'master') ? `/${env.branch}/` : '/',
  },
  devServer: {
    historyApiFallback: {
      index: 'dist/index.html',
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
      },
      {
        test: /skin\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(s[ac]ss|css)$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|svg|gif)?$/,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      filename: 'index.html',
    }),
    new FaviconsWebpackPlugin({
      logo: './src/assets/favicon.png',
      devMode: 'webapp',
      favicons: {
        appName: 'My Nexway',
        appDescription: 'Nexway Center',
        background: '#fff',
        theme_color: '#fff',
        icons: {
          coast: false,
          yandex: false,
        },
      },
    }),
    new webpack.DefinePlugin({
      'process.env.BUILT_AT': webpack.DefinePlugin.runtimeValue(Date.now, [fileDep]),
      'process.env.ENV_MODE': JSON.stringify(env.ENV_MODE),
      'process.env.API_SERVER':
        // eslint-disable-next-line
        env.ENV_MODE === 'production' ? JSON.stringify('https://api.nexway.store') :
          env.ENV_MODE === 'preproduction' ? JSON.stringify('https://api.preproduction.nexway.build')
            : JSON.stringify('https://api.staging.nexway.build'),
      'process.env.envObj': JSON.stringify(env),
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
});
