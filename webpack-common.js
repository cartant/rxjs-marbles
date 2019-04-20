"use strict";

const path = require("path");
const webpack = require("webpack");
const webpackRxjsExternals = require("webpack-rxjs-externals");

module.exports = framework => env => {
  let suffix = framework ? `-${framework}` : "";
  let filename = `rxjs-marbles${suffix}.umd.js`;
  let mode = "development";
  if (env && env.production) {
    filename = "rxjs-marbles${suffix}.min.umd.js";
    mode = "production";
  }
  return {
    context: path.join(__dirname, "./"),
    entry: {
      index: framework ? `./source/${framework}/index.ts` : "./source/index.ts"
    },
    externals: [
      webpackRxjsExternals(),
      (context, request, callback) => {
        if (/^(ava|tape)$/.test(request)) {
          return callback(null, {
            commonjs: request,
            commonjs2: request
          });
        }
        callback();
      }
    ],
    mode,
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: {
            loader: "ts-loader",
            options: {
              compilerOptions: {
                declaration: false
              },
              configFile: "tsconfig-dist-cjs.json"
            }
          }
        }
      ]
    },
    output: {
      filename,
      library: "rxjsMarbles",
      libraryTarget: "umd",
      path: path.resolve(__dirname, "./dist/bundles")
    },
    resolve: {
      extensions: [".ts", ".js"]
    }
  };
};
