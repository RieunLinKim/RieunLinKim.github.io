const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",  // Use "production" for production builds
  entry: "./src/index.js",  // Entry point of your app
  output: {
    filename: 'bundle.js',  // Output JS bundle file
    path: path.resolve(__dirname, "dist"),  // Output directory for build files
    clean: true,  // Clean the output directory before each build
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
        { from: './src/assets/', to: './assets/' },  // Copy assets from src/assets to dist/assets
      ],
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",  // Use index.html as the base HTML template
      inject: true,
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css',  // Always output CSS to main.css (no hash)
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,  // Transpile JS/JSX files using Babel
        exclude: /node_modules/,  // Exclude node_modules
        use: "babel-loader",
      },
      {
        test: /\.s[ac]ss$/i,  // SCSS loader
        use: [
          MiniCssExtractPlugin.loader,  // Extract CSS into separate file
          "css-loader",  // Translates CSS into CommonJS
          "postcss-loader",  // Apply PostCSS transformations (e.g., autoprefixer)
          "sass-loader",  // Compile SCSS to CSS
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,  // Handle fonts and images
        type: "asset",  // Use Webpack asset module for fonts/images
      },
      {
        test: /\.html$/i,  // Load and process HTML files
        loader: "html-loader",  // Process HTML files for Webpack
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],  // Resolve these extensions automatically
  },
};