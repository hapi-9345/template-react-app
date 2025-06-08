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
			},
			{
				context: [
					'/notifications'
				],
				target: process.env.WS_PROXY,
				changeOrigin: true,
				secure: false,
				ws: true
			}
		],
		historyApiFallback: {
			index: '/',
			disableDotRule: true
		},
		hot: true
	},
	module: {
    /* для работы какой-то фигни */
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

    /* Убираем ошибку process is not defined [https://stackoverflow.com/a/66731232/16982966] */
		// new webpack.ProvidePlugin({
		// 	process: 'process/browser'
		// }),

    /* Добавляем HMR */
		new ReactRefreshWebpackPlugin({})
	]
})
