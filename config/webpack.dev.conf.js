const webpack = require('webpack');
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const path = require('path');
//引入一些基本的配置
var config = require('./webpack.base.conf');
config.output.publicPath = '/';
config.plugins = [
	//添加了三个插件  热加载
	new webpack.optimize.OccurrenceOrderPlugin(),
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NoEmitOnErrorsPlugin(),
	new HtmlWebpackPlugin({
		filename: 'index.html',
		template: path.resolve(__dirname, '../demo/index.html'),
		inject: true
	})
]

var devClient = './config/dev-client.js';

//监听入口文件  热加载
Object.keys(config.entry).forEach(function(name,i) {
	var extras = [devClient];
	config.entry[name] = extras.concat(config.entry[name]);
})
module.exports = config;