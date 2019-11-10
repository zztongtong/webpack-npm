
//引入的一些依赖模块
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.dev.conf');
const opn = require('opn');
var port = 8888;
uri = 'http://localhost:' + port;


//创建一个express实例
var  app = express();

var compiler = webpack(config);

var devMiddleware = require('webpack-dev-middleware')(compiler,{
	publicPath: config.output.publicPath,
	stats: {
		color: true,
		chunks:false
	}
});

var hotMiddleware = require('webpack-hot-middleware')(compiler);

compiler.plugin('compilation',function(compilation) {
	compilation.plugin('html-webpack-plugin-after-emit',function(data,cb){
		hotMiddleware.publish({action: 'reload'});
		cb();
	})
})

app.use(devMiddleware);
app.use(hotMiddleware);

app.listen(port,
	function(err){
	if(err) {
		console.log(err);
		return;
	}
	console.log('listen at http://localhost:' + port);
	opn(uri);
})
