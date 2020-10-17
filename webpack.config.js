var webpack = require('webpack');

module.exports = {
	devtool: "source-map",
	mode: 'development',
    entry: './src/index.js',

    output: {
        path: __dirname + '/public/',
        filename: 'bundle.js'
    },

    devServer: {
        hot: true,
        inline: true,
		disableHostCheck:true,
        host: '0.0.0.0',
        port: 3000,
        contentBase: __dirname + '/public/',
		writeToDisk:false		// 번들된 파일를 실제 디스크에도 저장 할 것인가?(false:기본값 : 메모리에서 저장)
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env', 
							'@babel/preset-react'
						],
						plugins: [
							'@babel/plugin-proposal-class-properties',
							'react-hot-loader/babel'
						]
					}
				},
                exclude: /node_modules/
            },
			{
				test: /\.css$/,
				use : ['style-loader', 'css-loader']
			}
        ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
} 