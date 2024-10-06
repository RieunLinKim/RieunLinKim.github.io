const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",  // or "production" for production builds
  entry: "./src/index.js",  // Entry point of your app
  output: {
    filename: 'bundle.[contenthash].js',  // Add content hash for cache busting
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
        { from: './src/assets/*.pdf', to: './assets/' },  // Copy assets from src/assets to dist/assets
      ],
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",  // Use index.html as the base HTML template
      inject: 'body',  // Automatically inject CSS and JS into the HTML
    }),
    new MiniCssExtractPlugin({
      filename: 'main.[contenthash].css',  // Output CSS with content hash
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
          MiniCssExtractPlugin.loader,  // Extract CSS into a separate file
          "css-loader",  // Translates CSS into CommonJS
          "postcss-loader",  // Apply PostCSS transformations (e.g., autoprefixer)
          "sass-loader",  // Compile SCSS to CSS
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,  // Handle fonts and images
        type: "asset/resource",
        generator: {
          filename: "assets/images/[name][ext]",
        },
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {
          sources: {
            list: [
              "...",
              {
                tag: "img",
                attribute: "src",
                type: "src",
              },
              {
                tag: 'source',
                attribute: 'srcset',
                type: 'srcset',
              },
            ],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],  // Resolve these extensions automatically
  },
};