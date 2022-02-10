const webpack = require('webpack');
const path = require('path');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const baseConfig = require('./webpack.config');

/** @type { import('webpack').Configuration } */
module.exports = {
    ...baseConfig,
    mode: 'development',
    devtool: 'eval',
    resolve: {
        ...baseConfig.resolve,
    },
    plugins: [
        ...baseConfig.plugins,
        new webpack.HotModuleReplacementPlugin(),
        new ReactRefreshPlugin(),
    ],
    devServer: {
        port: 3000,
        historyApiFallback: true,
        hot: true,
        liveReload: false,
        devMiddleware: {
            writeToDisk: true,
        },
        static: {
            directory: path.resolve('out'),
        },
    },
};
