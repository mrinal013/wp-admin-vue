const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const RemovePlugin = require("remove-files-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    "admin/assets/js": "./admin/assets/vue-admin/wp-admin-vue-admin.vue",
    "wp-public/assets/js":
      "./wp-public/assets/vue-admin/wp-admin-vue-public.vue",
    admin: "./admin/assets/scss/wp-admin-vue-admin.scss",
    "wp-public": "./wp-public/assets/scss/wp-admin-vue-public.scss",
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js", // Use the full build
    },
  },
  output: {
    filename: "[name]/wp-admin-vue.build.js",
    path: path.resolve(__dirname),
  },
  plugins: [
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name]/assets/css/wp-admin-vue.build.css",
    }),
    new RemovePlugin({
      after: {
        include: ["./admin/assets/js/assets"],
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\$.vue/,
        loader: "vue-loader",
      },
      {
        test: /.(sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              config: {
                path: "postcss.config.js",
              },
            },
          },
          "sass-loader",
        ],
      },
    ],
  },
};