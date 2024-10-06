const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",  // or "production" for production builds
  entry: "./src/index.js",  // Entry point of your app
  output: {
    filename: 'bundle.[contenthash].js',  // Use contenthash for cache-busting
    path: path.resolve(__dirname, "dist"),  // Output directory
    clean: true,  // Automatically clean the output directory before each build
  },
  devServer: {
    open: true,
    host: "localhost",
    watchFiles: ['src/**/*', 'index.html'],  // Watch for changes in source files
    static: path.resolve(__dirname, "dist"),  // Serve files from the dist folder
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: './src/assets/', to: './assets/' },  // Copy assets
      ],
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",  // Base HTML template
      inject: true,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',  // Use contenthash for CSS cache-busting
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,  // JS and JSX loader for modern JavaScript
        exclude: /node_modules/,  // Exclude node_modules
        use: "babel-loader",  // Use Babel loader
      },
      {
        test: /\.s[ac]ss$/i,  // SCSS loader
        use: [
          MiniCssExtractPlugin.loader,  // Extract CSS to a separate file
          "css-loader",  // Translates CSS into CommonJS
          "postcss-loader",  // Apply PostCSS transformations (autoprefixer, etc.)
          "sass-loader",  // Compiles SCSS to CSS
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,  // Asset handling
        type: "asset",  // Use Webpack asset module
      },
      {
        test: /\.html$/i,  // Handle HTML files
        loader: "html-loader",  // Load HTML for processing
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],  // Resolve JS and JSX extensions
  },
};