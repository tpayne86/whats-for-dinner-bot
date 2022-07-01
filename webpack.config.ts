import path from "path";
import { Configuration } from "webpack";
import { Configuration as DevServerConfiguration } from 'webpack-dev-server';

const devServer: DevServerConfiguration = {
  static: path.join(__dirname, "dist"),
  compress: true,
  port: 4000,
}

const config: Configuration = {
  entry: "./src/index.ts",
  module: {
    rules: [
      {
        test: /\.(ts|js)?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-typescript"],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  devServer,
};

export default config;
