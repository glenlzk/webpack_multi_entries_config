/**
 * Created by Administrator on 2017/12/6 0006.
 */

/*var path = require('path');

var webpackConfig = require('./webpack.prod.conf');

webpackConfig.devServers = {
    contentBase: '/',     // 指定服务的根目录 path.resolve(__dirname, '../web/')
    inline: true,        // 启动该选项，当文件内容改变时，可以自动刷新浏览器
    historyApiFallback: true,
    inline: true, //开启页面自动刷新
    progress: true, //显示打包的进度
    port: '8088', //设置端口号
    //其实很简单的，只要配置这个参数就可以了
    proxy: {
        '/yzlpms': {
            target: 'http://demo.inzlink.com',
            secure: false
        }
    }
}*/

var express = require('express');
var proxy = require('http-proxy-middleware');

var app = express();


app.use('/yzlpms', proxy({target: 'http://demo.inzlink.com', changeOrigin: true}));

app.use('/web/', express.static('./web'))

app.listen(8888, function () {
    console.log('服务器启动完成....');
});
