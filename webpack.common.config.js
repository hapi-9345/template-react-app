/**
 * Copyright Fedyakov Mikhail 2025
 */

const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: path.resolve(__dirname, 'src/index.tsx'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].[contenthash].js',
		clean: true
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.json', '.js'],
		alias: {
			'~models': path.resolve(__dirname, 'src/models'),
			'~pages': path.resolve(__dirname, 'src/pages'),
			'~components': path.resolve(__dirname, 'src/components'),
			'~hooks': path.resolve(__dirname, 'src/hooks'),
			'~services': path.resolve(__dirname, 'src/services'),
			'~api': path.resolve(__dirname, 'src/api'),
			'~mutations': path.resolve(__dirname, 'src/mutations'),
			'~queries': path.resolve(__dirname, 'src/queries'),
			'~contexts': path.resolve(__dirname, 'src/contexts'),
			'~': path.resolve(__dirname, 'src'),
			process: 'process/browser'
		}
	},
	module: {
		rules: [
			{
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
						cacheCompression: true,
						cacheDirectory: true
          },
        },
      },
			{
				test: /\.(sa|sc|c)ss$/i,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader',
						options: {
							modules: {
								auto: (resources) => Boolean(resources.includes('.module.')),
								namedExport: false,
								exportLocalsConvention: 'as-is',
								localIdentName: '[path][name]__[local]--[hash:base64:5]'
							}
						}
					},
					{
						loader: 'sass-loader'
					}
				]
			},
			{
				test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
				type: 'asset/resource'
			},
			{
				test: /\.(woff(2)?|eot|ttf|otf|svg|)$/i,
				type: 'asset/resource'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'public/index.html'),
			favicon: path.resolve(__dirname, 'public/favicon.ico'),
			publicPath: '/'
		})
	]
}
