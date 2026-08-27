import path from "node:path";
import { fileURLToPath } from "node:url";

import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

import { dependencies } from "./package.json" with { type: "json" };

const __dirname = path.dirname(fileURLToPath(import.meta.url));

delete dependencies["@wakamai-fondue/engine"];
const vendors = ["vue"];

// Kudos https://sambitsahoo.com/blog/vite-code-splitting-that-works.html
function renderChunks(deps) {
	const chunks = {};
	Object.keys(deps).forEach((key) => {
		if (vendors.includes(key)) {
			return;
		}

		chunks[key] = [key];
	});
	return chunks;
}

const manualChunksConfig = {
	vendor: vendors,
	...renderChunks(dependencies),
};

export default defineConfig({
	base: "/",
	build: {
		assetsDir: "js",
		emptyOutDir: true,
		outDir: "../dist",
		rollupOptions: {
			output: {
				assetFileNames: (assetInfo) => {
					if (assetInfo.name === "index.css") {
						return "css/app.[hash].css";
					}

					if (assetInfo.name.endsWith(".jpg")) {
						return "img/[name].[hash].jpg";
					}

					if (assetInfo.name.endsWith(".svg")) {
						return "img/[name].[hash].svg";
					}

					return assetInfo.name;
				},
				manualChunks(id) {
					for (const [chunkName, modules] of Object.entries(manualChunksConfig)) {
						if (modules.some((mod) => id.includes(`node_modules/${mod}`))) {
							return chunkName;
						}
					}
				},
			},
		},
		sourcemap: false,
	},
	plugins: [vue()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
	},
	root: "./src",
});
