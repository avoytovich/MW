const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

const fileDep = path.resolve(__dirname, 'dist');

module.exports = (env) => ({
  context: __dirname,
  entry: ['@babel/polyfill', './src/index.jsx'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: env.branch ? `/${env.branch.toLowerCase()}/` : '/',
  },
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
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
    new webpack.DefinePlugin({
      'process.env.BUILT_AT': webpack.DefinePlugin.runtimeValue(Date.now, [fileDep]),
      'process.env.ENV_MODE': JSON.stringify(env.ENV_MODE),
      'process.env.API_SERVER':
        env.ENV_MODE === 'production' ? JSON.stringify('https://api.nexway.build') : JSON.stringify('https://api.staging.nexway.build'),
      'process.env.envObj': JSON.stringify(env),
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
});
