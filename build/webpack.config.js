const webpack = require('webpack');
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const dotenv = require('dotenv');
const package = require('../package.json');

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

const projectRootDir = path.resolve(__dirname, '..');

module.exports = {
    name: 'build',
    devtool: isProduction ? 'hidden-source-map' : 'eval',
    mode: isProduction ? 'production' : 'development',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    entry: {
        app: path.join(path.resolve(__dirname, '..'), 'src', 'index'),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            plugins: [
                                !isProduction && 'react-refresh/babel',
                            ].filter(Boolean),
                        },
                    },
                ].filter(Boolean),
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
            },
        ],
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({ dev: !isProduction }),
        new webpack.DefinePlugin({
            process: {
                env: {
                    GAID: JSON.stringify(process.env.GAID),
                    VERSION: JSON.stringify(package.version),
                    TITLE: JSON.stringify(package.displayName),
                    DESCRIPTION: JSON.stringify(package.description),
                    NODE_ENV: JSON.stringify(process.env.NODE_ENV),
                },
            },
        }),
        new HtmlWebPackPlugin({
            template: 'src/index.ejs',
            filename: '../index.html',
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.join(projectRootDir, 'public'),
                    to: '../',
                },
            ],
        }),
        new WorkboxPlugin.GenerateSW({
            // these options encourage the ServiceWorkers to get in there fast
            // and not allow any straggling "old" SWs to hang around
            clientsClaim: true,
            skipWaiting: true,
            swDest: '../service-worker.js',
            // directoryIndex: 'index.html',
            // modifyURLPrefix: '/',
        }),
    ],
    output: {
        filename: '[name].js',
        path: path.join(path.resolve(__dirname, '..'), 'out', 'dist'),
        publicPath: '/dist/',
    },
};
