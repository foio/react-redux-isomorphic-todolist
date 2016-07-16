var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
    devtool: 'inline-source-map',

    entry: {
        todolist: './public/app',
    },

    output: {
        path: 'public',
        filename: '[name].js',
        publicPath: ''
    },

    resolve: {
        extensions: ['', '.js']
    },
    plugins: [new ExtractTextPlugin('[name].css')],
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['react-hot', 'babel'],
            exclude: /node_modules/
        }, {
            test: /\.css?$/,
            loaders: ['style', 'raw']
        }, {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        }]
    }
};
