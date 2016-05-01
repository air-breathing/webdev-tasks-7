

const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlagin = require('extract-text-webpack-plugin');


module.exports = {
    context: __dirname,
    entry: {
        index: './bundles/index/index.js',
        images: './images',
        audio: './audio'
    },
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, 'public'),
        filename: '[name].js',
        sourceMapFilename: '[name].map',
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /\.css/,
                loader: ExtractTextPlagin.extract('style-loader', 'css-loader')
            }, {
                test: /\.png$|\.ico$|\.svg$|\.mp3$/,
                loader: 'file-loader'
            }
        ]
    },
    postcss: function () {
        return [autoprefixer];
    },
    plugins: [
        new ExtractTextPlagin("[name].css")
    ]
};