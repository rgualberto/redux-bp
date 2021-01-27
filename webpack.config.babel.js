/*global __dirname */
import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import htmlWebpackTemplate from 'html-webpack-template';
import CopyWebpackPlugin from 'copy-webpack-plugin';

import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

import CompressionPlugin from 'compression-webpack-plugin';
// import HardSourceWebpackPlugin from 'hard-source-webpack-plugin';

module.exports = (env = {}) => {
  const isProd = env.production;
  const NODE_ENV = isProd ? JSON.stringify("production") : JSON.stringify("development");

  console.log(`Building NODE_ENV=${NODE_ENV}`);

  return {
    entry: './index.js',
    context: path.join(__dirname, 'src'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
    },

    optimization: {
      ...isProd && {
        minimizer: [
            new TerserPlugin({
              cache: true,
              parallel: true
            }),
            new OptimizeCSSAssetsPlugin({
              assetNameRegExp: /\.styles\.css$/g,
              cssProcessor: require('cssnano'),
              cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }],
              },
              canPrint: true
            })
        ]
      }
    },

    plugins: [
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV,
          prod: isProd
        }
      }),
      ...isProd ? [
        new MiniCssExtractPlugin({
          filename: `styles.css?v=[hash]`,
          chunkFilename: "[name].css?v=[hash]"
        }),
        new CompressionPlugin({
          filename: "[path][base].gz[query]",
          algorithm: "gzip",
          test: /\.(js|css)(\?.*)?$/
        })
      ]:[],
      new HtmlWebpackPlugin({
        // inject: false, // webpack 5 wants this to be true
        template: require('html-webpack-template'),
        filename: 'index.html',
        title: 'Redux BP',
        appMountIds: ['app'],
        mobile: true
      }),
      // new CopyWebpackPlugin([
      //   {
      //     from: 'assets/**/*.*',
      //     to: '.'
      //   },
      // ]),
    ],

    mode: isProd ? 'production' : 'development',

    devServer: {
      hot: true,
      historyApiFallback: true,
      disableHostCheck: true
    },

    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          test: /\.s?css$/,
          use: !isProd
            ? [
                "style-loader",
                { loader: 'css-loader', options: { sourceMap: true } },
                { loader: 'sass-loader', options: { sourceMap: true } }
              ]
            : [
                {
                  loader: MiniCssExtractPlugin.loader,
                  options: {}
                },
                "css-loader", 'sass-loader'
              ]
        },
        {
           test: /\.(png|svg|jpe?g|gif)$/,
           use: [
             'file-loader',
           ],
         },
      ],
    }
  };
}
