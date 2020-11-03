// eslint-disable-next-line no-unused-vars
const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const config = {
  entry: ["./client/src/index.jsx"],
  output: {
    path: path.resolve(__dirname, "client/dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              plugins: ["@babel/plugin-transform-runtime"],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: "url-loader",
        },
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "client/src/index.html", to: "index.html" }],
    }),
  ],
};

module.exports = config;
