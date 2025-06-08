/**
 * Copyright NGR Softlab
 */

const path = require('path')

const dotenv = require('dotenv')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const common = require('./webpack.common.config')

dotenv.config({ path: path.resolve(__dirname, '.env') })

module.exports = merge(common, {
	mode: 'development',
	devtool: 'eval-source-map',
	target: 'web',
	devServer: {
		port: process.env.DEV_PORT,
		static: [path.join(__dirname, 'public')],
		proxy: [
			{
				context: [
					'/api'
				],
				target: process.env.PROXY,
				secure: false,
				changeOrigin: true
			}
		],
		historyApiFallback: {
			index: '/',
			disableDotRule: true
		},
		hot: true
	},
	module: {
		rules: [
			{
				test: /\.mjs$/,
				include: /node_modules/,
				type: 'javascript/auto',
				resolve: {
					fullySpecified: false
				}
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': JSON.stringify(process.env)
		}),
		new ReactRefreshWebpackPlugin({})
	]
})
