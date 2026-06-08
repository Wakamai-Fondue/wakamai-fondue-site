# "Try in Wakamai Fondue" Button

Add a button to your site that lets visitors analyze your font in Wakamai Fondue.

## Quick start

```html
<script defer src="https://wakamaifondue.com/try-in-wf.js"></script>

<button class="try-in-wf" data-wf-font="/fonts/myfont.woff2">
	Try in Wakamai Fondue
</button>
```

That's it! The script finds all elements with class `try-in-wf` and handles the rest. Add your own styling as desired.

## Custom preview text

By default, this will make Wakamai Fondue behave as if the font just got dropped in the fondue. But you can configure the fondue to use custom tester texts, via `data` attributes and/or a JavaScript config.

```html
<button
	class="try-in-wf"
	data-wf-font="/fonts/myfont.woff2"
	data-wf-preview-typetester="Custom text for regular type tester"
	data-wf-preview-variablefont="Custom text for variable type tester"
	data-wf-preview-feature-liga="fi fl ffi ffl"
>
	Try in Wakamai Fondue
</button>
```

Or use JavaScript to create a custom config, next to the default one:

```html
<script>
	window.wfConfig = {
		// This default config is used for all buttons
		default: {
			previewText: {
				typeTester: "Custom text for regular type tester",
				variableFont: "Custom text for variable type tester",
				features: {
					liga: "fi fl ffi ffl",
				},
			},
		},
		// This is a custom config that expands on the default config
		myCustomConfig: {
			previewText: {
				typeTester: "A different custom text for regular type tester",
			},
		},
	};
</script>
<script defer src="https://wakamaifondue.com/try-in-wf.js"></script>

<button class="try-in-wf" data-wf-font="/font1.woff2">
	Try in Wakamai Fondue with default config
</button>
<button
	class="try-in-wf"
	data-wf-font="/font2.woff2"
	data-wf-config="myCustomConfig"
>
	Try in Wakamai Fondue with myCustomConfig config
</button>
```

Config priority: `wfConfig.default` → `wfConfig[name]` → data attributes.

## Data attributes

| Attribute                      | Description                                              |
| ------------------------------ | -------------------------------------------------------- |
| `data-wf-font`                 | Font URL (required)                                      |
| `data-wf-config`               | Use custom config from `window.wfConfig`                 |
| `data-wf-preview-default`      | Default preview text for all testers                     |
| `data-wf-preview-typetester`   | Text for generic tester                                  |
| `data-wf-preview-variablefont` | Text for variable tester                                 |
| `data-wf-preview-feature-*`    | Text for features (e.g., `data-wf-preview-feature-liga`) |

## How it works

1. Your page fetches the font (same-origin, no CORS issues)
2. Opens Wakamai Fondue in a new tab
3. Sends the font data via `postMessage`
4. Wakamai Fondue loads and displays the font
