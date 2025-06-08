/**
* Copyright Fedyakov Mikhail 2025
*/

const path = require('path')

const { merge } = require('webpack-merge')
const CopyPlugin = require('copy-webpack-plugin')

const common = require('./webpack.common.config')

module.exports = merge(common, {
	mode: 'production',
	devtool: 'source-map',
	target: 'browserslist',
	plugins: [
		new CopyPlugin({
			patterns: [
				{
					from: 'public',
					globOptions: {
						ignore: [
							path.resolve(__dirname, 'public/index.html')
						]
					}
				}
			]
		})
	]
})
