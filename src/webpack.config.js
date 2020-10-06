const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const getWebpackEntries = require("./util/getWebpackEntries");

module.exports = function(config) {
  const { scripts } = config;
  const webpackPlugins = [];

  const isDev = config.env !== 'production'
  if (isDev) {
    webpackPlugins.push(new webpack.HotModuleReplacementPlugin());
  }

  return {
    entry: getWebpackEntries(config.src, scripts.path, scripts.bundles),
    mode: isDev ? "development" : "production",
    devtool: isDev ? "eval-cheap-source-map" : false,
    output: {
      filename: "[name].js",
      path: path.resolve(config.dest, scripts.path),
      publicPath: "/dist"
    },
    optimization: {
      minimize: !isDev,
      minimizer: [
        new TerserPlugin({
          sourceMap: false,
          terserOptions: {
            compress: {
              drop_console: true
            },
            output: {
              comments: false
            }
          },
          extractComments: false
        })
      ],
      removeEmptyChunks: !isDev,
      splitChunks: {
        chunks: "all"
      }
    },
    module: {
      rules: [
        {
          enforce: "pre",
          test: /\.m?js$/,
          exclude: /node_modules/,
          loader: "eslint-loader"
        },

        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                ["@babel/preset-env", { useBuiltIns: "entry", corejs: 3 }]
              ],
              plugins: [
                require.resolve("@babel/plugin-transform-runtime"),
                require.resolve("@babel/plugin-proposal-class-properties")
              ]
            }
          }
        }
      ]
    },
    plugins: webpackPlugins
  };
};
