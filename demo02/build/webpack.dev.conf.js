var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var utils = require('./utils')
var path = require('path')
var fs = require('fs');
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var OpenBrowserPlugin = require('open-browser-webpack-plugin')

var webpackConfig = merge(baseWebpackConfig, {
    module: {
        loaders: utils.styleLoaders({
            sourceMap: config.dev.cssSourceMap
        })
    },
    // eval-source-map is faster for development
    devtool: '#eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.dev.env
        }),
        new OpenBrowserPlugin({ url: `http://localhost:${config.dev.port}/login.html` }),
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.optimize.OccurenceOrderPlugin(),
        /*new webpack.HotModuleReplacementPlugin(),*/
        new webpack.NoErrorsPlugin(),
        // https://github.com/ampedandwired/html-webpack-plugin
        /*new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            favicon: 'favicon.ico',
            inject: true
        })*/
    ]
})


// add hot-reload related code to entry chunks
var files = fs.readdirSync('./src/html');
files.forEach(function (item){
    if (item.match('.html') != null) {
        var name = item.split('.')[0];
        webpackConfig.plugins.push(new HtmlWebpackPlugin({
            filename: name + '.html',
            template: path.resolve(__dirname, '../src/html/' + name + '.html'),
            inject: true,
            chunks: [name, 'common']
        }));
    };
});

/*

Object.keys(webpackConfig.entry).forEach(function(name) {
   // baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
    if (name != 'common') {
        webpackConfig.plugins.push(new HtmlWebpackPlugin({
            filename: name + '.html',
            template: path.resolve(__dirname, '../src/html/' + name + '.html'),
            inject: true,
            chunks: [name, 'common']
        }));
    };

})
*/

module.exports = webpackConfig;