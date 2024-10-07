module.exports = {
	devServer: {
		// disableHostCheck: true,
		// watchOptions: {
		// 	ignored: [/node_modules([\\]+|\/)+(?!@wakamai-fondue\/engine)/]
		// }
	},
	transpileDependencies: ["@wakamai-fondue/engine", "lib-font"],
	configureWebpack: {
		resolve: {
			fallback: {
                assert: require.resolve("assert/"),
                fs: false,
                stream: require.resolve("stream-browserify"),
                util: require.resolve("util/"),
                zlib: require.resolve("browserify-zlib")
            },
			symlinks: false // npm link
		}
	}
	// Temporary beta build stuff:
	// publicPath: "/beta"
};
