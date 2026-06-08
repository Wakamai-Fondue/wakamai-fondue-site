(function () {
	"use strict";

	const WF_ORIGIN = "https://wakamaifondue.com";
	const TIMEOUT_MS = 10000;

	const merge = (a, b) => ({
		previewText: {
			...a?.previewText,
			...b?.previewText,
			features: {
				...a?.previewText?.features,
				...b?.previewText?.features,
			},
		},
	});

	const parseDataAttributes = (element) => {
		const options = { previewText: { features: {} } };

		for (const attr of element.attributes) {
			const name = attr.name;

			if (name === "data-wf-preview-default") {
				options.previewText.default = attr.value;
			} else if (name === "data-wf-preview-typetester") {
				options.previewText.typeTester = attr.value;
			} else if (name === "data-wf-preview-variablefont") {
				options.previewText.variableFont = attr.value;
			} else if (name.startsWith("data-wf-preview-feature-")) {
				const featureTag = name.slice(
					"data-wf-preview-feature-".length
				);
				options.previewText.features[featureTag] = attr.value;
			}
		}

		return options;
	};

	const getOptions = (element) => {
		const configs = window.wfConfig || {};
		const baseConfig = configs.default || {};
		const configName = element.dataset.wfConfig;
		const namedConfig = configName ? configs[configName] || {} : {};
		const dataAttrs = parseDataAttributes(element);

		return merge(merge(baseConfig, namedConfig), dataAttrs);
	};

	const getAnchor = (element) => {
		const configs = window.wfConfig || {};
		const configName = element.dataset.wfConfig;
		return (
			element.dataset.wfAnchor ||
			(configName && configs[configName]?.anchor) ||
			configs.default?.anchor ||
			""
		);
	};

	const handleClick = async (event) => {
		const button = event.currentTarget;
		const fontUrl = button.dataset.wfFont;

		if (!fontUrl) {
			console.error("try-in-wf: Missing data-wf-font attribute");
			return;
		}

		button.disabled = true;

		try {
			const response = await fetch(fontUrl);
			if (!response.ok) throw new Error("Font not found");
			const fontData = await response.arrayBuffer();
			const filename = fontUrl.split("/").pop();

			const anchor = getAnchor(button);
			const url = anchor ? `${WF_ORIGIN}#${anchor}` : WF_ORIGIN;
			const wf = window.open(url, "_blank");
			if (!wf) throw new Error("Popup was blocked");

			const cleanup = () => {
				clearTimeout(timeout);
				window.removeEventListener("message", handler);
				button.disabled = false;
			};

			const handler = (e) => {
				if (e.origin === WF_ORIGIN && e.data?.type === "ready") {
					wf.postMessage(
						{
							type: "font",
							data: fontData,
							filename,
							options: getOptions(button),
						},
						WF_ORIGIN
					);
					cleanup();
				}
			};

			const timeout = setTimeout(() => {
				cleanup();
				console.error("try-in-wf: Connection timed out");
			}, TIMEOUT_MS);

			window.addEventListener("message", handler);
		} catch (err) {
			console.error("try-in-wf:", err.message);
			button.disabled = false;
		}
	};

	const init = () => {
		document.querySelectorAll(".try-in-wf").forEach((button) => {
			button.addEventListener("click", handleClick);
		});
	};

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", init);
	} else {
		init();
	}
})();
