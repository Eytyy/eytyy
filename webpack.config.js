const {resolve} = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = env => {
 	return {
 		entry: './scripts/index.js',
 		output: {
 			path: resolve(__dirname, 'dist'),
 			filename: 'bundle.js',
 			publicPath: '/'
 		},
 		context: resolve(__dirname, 'src'),
 		devtool : env.prod ? 'source-map' : 'eval',
 		module: {
 			rules: [
 				{
 					test: /\.jsx?$/,
 					exclude: /(node_modules)/,
 					use: [
 						{
 							loader: 'babel-loader'
 						}
 					],
 				},
				{
 					test: /\.scss?$/,
 					exclude: /(node_modules)/,
 					loader: ExtractTextPlugin.extract({
 						fallbackLoader: 'style-loader',
 						loader: [
 							{ loader: 'css-loader?sourcemap' },
 							{ loader: 'postcss-loader?sourceMap' },
 							{ loader: 'sass-loader?sourceMap' }
 						]
 					})
 				},
				{
          test: /\.(gif|png|jpg|woff|woff2|eot|ttf|otf|svg)(\?.*$|$)/,
          exclude: /node_modules/,
          loader: 'url-loader?importLoaders=1&limit=100000',
        }
 			],
 		},
		plugins: [
			new ExtractTextPlugin({filename: 'styles/[name].css', disable: false, allChunks: true})
		]
 	}
};
