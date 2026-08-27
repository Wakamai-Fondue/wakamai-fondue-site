import js from "@eslint/js";
import pluginVue from "eslint-plugin-vue";
import globals from "globals";

export default [
	{
		ignores: ["src/lib/**"],
	},
	js.configs.recommended,
	...pluginVue.configs["flat/essential"],
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
			ecmaVersion: "latest",
			sourceType: "module",
		},
		rules: {
			"no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
			"no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
		},
	},
];
