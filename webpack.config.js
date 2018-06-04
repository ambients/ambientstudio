const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, './dist')
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.ts$/, loader: 'ts-loader', exclude: /node_modules/, options: {
          compilerOptions: { declaration: false, sourceMap: false }
        }
      }
    ]
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.ts'],
    alias: { vue$: 'vue/dist/vue.esm.js' }
  },
  watch: true,
  mode: 'development',
  stats: {
    colors: true,
    hash: false,
    version: false,
    timings: false,
    assets: false,
    chunks: false,
    modules: false,
    reasons: false,
    children: false,
    source: false,
    errors: true,
    errorDetails: true,
    warnings: false,
    publicPath: false
  }
};