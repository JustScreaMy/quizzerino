const path = require('path')

module.exports = {
	entry: './src/index.ts',
	mode: 'production',
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
	},

	output: {
		filename: 'index.min.js',
		path: path.resolve(__dirname, 'dist'),
		library: {
			name: 'Quizzerino',
			type: 'var',
			export: 'default',
		},
	},
}
