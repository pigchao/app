const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const webpackConfig = require('../../webpack.dev.config');

const compiler = webpack(webpackConfig);
const server = new WebpackDevServer(compiler, {
	hot: true,
	inline: true,
	watchContentBase: true,
	historyApiFallback: {
		index: "/app.html",
	},
	watchOptions: {
		ignored: /node_modules/,
	},
	stats: { colors: true },
	disableHostCheck: true,
	compress: true,
});

export default server;