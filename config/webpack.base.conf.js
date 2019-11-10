const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin  = require("html-webpack-plugin");
module.exports = {
	entry:{
		index:path.resolve(__dirname,"../demo/index.js") ,
	},
	output:{
		filename:"[name].[hash:4].js",
		path:path.resolve(__dirname,'../dist/static'),
		publicPath: 'static/'
	},
	module:{
	  	rules:[
		  	
	      	{
	            test: /\.js$/,
	            loader: "babel-loader?presets=es2015",
	            exclude: /node_modules/
	        },
	      	{
	            test: /\.css$/,
	            loader: "style-loader!css-loader!postcss-loader"
			},

	        {
		        test: /\.(eot|woff|woff2|ttf)([\?]?.*)$/,
		        loader: "file-loader"
      		},
		    {
		        test: /\.(png|jpg|gif|svg|ico)$/,
		        loader: "url-loader",
		        query: {
		          name: "[name].[ext]?[hash]"
		        }
		    },
      	]
	},
	
	plugins:[
	new  HtmlWebpackPlugin({
		filename: '../index.html', //相对于output路径
		template: path.resolve(__dirname,'../demo/index.html')
	})
	]
}