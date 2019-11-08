/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * @emails react-core
 */

'use strict';

const {resolve} = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = ({stage, actions, getConfig}) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [
        resolve(__dirname, '../src'),
        resolve(__dirname, '../node_modules'),
      ],
    },
    // See https://github.com/FormidableLabs/react-live/issues/5
    plugins: [new webpack.IgnorePlugin(/^(xor|props)$/)],
  });

  if (stage === `build-javascript`) {
    const config = getConfig();
    const cssExtractIndex = config.plugins.findIndex(
      pl => pl instanceof MiniCssExtractPlugin,
    );

    config.plugins[cssExtractIndex] = new MiniCssExtractPlugin({
      filename: `[name].css`,
      chunkFilename: `[name].css`,
    });

    config.output = {
      filename: `[name].js`,
      chunkFilename: `[name].js`,
      path: config.output.path,
      publicPath: config.output.publicPath,
    };
  }
};
