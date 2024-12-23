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
				zlib: require.resolve("browserify-zlib"),
			},
			symlinks: false, // npm link
		},
	},
	chainWebpack: (config) => {
		config.plugin("define").tap((definitions) => {
			Object.assign(definitions[0], {
				__VUE_OPTIONS_API__: "true",
				__VUE_PROD_DEVTOOLS__: "false",
				__VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "false",
			});
			return definitions;
		});
	},
	// Temporary beta build stuff:
	// publicPath: "/beta"
};
