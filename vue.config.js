module.exports = {
	devServer: {
		disableHostCheck: true,
		watchOptions: {
			ignored: [/node_modules([\\]+|\/)+(?!\@wakamai\-fondue\/engine)/]
		}
	},
	configureWebpack: {
		resolve: {
			symlinks: false // npm link
		}
	}
};
