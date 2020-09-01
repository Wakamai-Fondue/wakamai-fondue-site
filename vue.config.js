module.exports = {
	devServer: {
		disableHostCheck: true,
		watchOptions: {
			ignored: [/node_modules([\\]+|\/)+(?!fondue)/]
		}
	},
	configureWebpack: {
		resolve: {
			symlinks: false // npm link
		}
	}
};
