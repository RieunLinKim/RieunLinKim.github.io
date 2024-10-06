const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",  // or "production" for a production build
  entry: "./src/index.js",  // Entry point of your app
  output: {
    filename: 'bundle.js',  // Output bundle file for JS
    path: path.resolve(__dirname, "dist"),  // Output directory for all build files
    clean: true,  // Automatically clean the output directory before each build
  },
  devServer: {
    open: true,
    host: "localhost",
    watchFiles: ['src/**/*', 'index.html'],  // Watch for changes in source files and index.html
    static: path.resolve(__dirname, "dist"),  // Serve files from the dist folder
  },
  plugins: [
    // Copy static assets like images, PDFs, etc.
    new CopyPlugin({
      patterns: [
        { from: './src/assets/', to: './assets/' },  // Copy assets from src/assets to dist/assets
      ],
    }),
    // Generate index.html with injected CSS and JS
    new HtmlWebpackPlugin({
      template: "./index.html",  // Point to your base HTML template
      inject: 'body',
      publicPath: './',  // Ensure relative paths for CSS/JS
    }),
    // Extract CSS into a separate file
    new MiniCssExtractPlugin({
      filename: '[name].css',  // Output CSS file
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,  // JS and JSX loader for modern JavaScript
        exclude: /node_modules/,  // Exclude node_modules from Babel transpiling
        use: "babel-loader",  // Use Babel loader
      },
      {
        test: /\.s[ac]ss$/i,  // SCSS loader
        use: [
          MiniCssExtractPlugin.loader,  // Extract CSS instead of injecting it in the JS
          "css-loader",  // Translates CSS into CommonJS
          "postcss-loader",  // Apply PostCSS transformations (autoprefixer, etc.)
          "sass-loader",  // Compiles SCSS to CSS
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,  // Asset handling (fonts, images)
        type: "asset",  // Use Webpack asset module for all assets
      },
      {
        test: /\.html$/i,  // Handle HTML files
        loader: "html-loader",  // Load HTML files for processing (e.g., including images)
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],  // Automatically resolve certain extensions
  },
};
