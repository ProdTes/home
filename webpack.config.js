const HtmlWebPackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;

const deps = require("./package.json").dependencies;
module.exports = {

  output: {
    publicPath: "/",
  },  
  performance: {
    maxAssetSize: 500000,
    maxEntrypointSize: 500000,
    hints: false,
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 3000,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-react'],
          }
        }
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "app2",
        library: { type: "umd", name: "app2" },
      filename:"remoteEntry.js",
      exposes: {
        "./Header": "./src/Header",
        "./Footer": "./src/Footer",
      },
      shared: {
        "react":{
          eager: true

      }, "react-dom":{
        eager: true

      },"tailwindcss":{
      }},
   
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
};
