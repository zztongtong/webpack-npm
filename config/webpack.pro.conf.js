const merge =require("webpack-merge");
const uglify = require('uglifyjs-webpack-plugin');
var config = require('./webpack.base.conf');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
var proConfig={
    plugins:[
        new uglify(),
        new CleanWebpackPlugin()
	]
}
module.exports=merge(config,proConfig);