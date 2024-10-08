/*
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Vue from "vue";
import App from "./App.vue";
import linkify from "vue-linkify";
import "prismjs";
import "prismjs/themes/prism-tomorrow.css";

Vue.directive("linkified", linkify);

Vue.config.productionTip = false;
Vue.config.globalProperties.$filters = {
	listify(array, emptyWord) {
		if (array.length === 0) return emptyWord;
		if (array.length === 1) return array[0];
		const last = array[array.length - 1];
		return array.slice(0, array.length - 1).join(", ") + " and " + last;
	},

	pluralize(value, word) {
		return `${word}${value !== 1 ? "s" : ""}`;
	},

	capitalize(value) {
		if (!value) return "";
		value = value.toString();
		return value.charAt(0).toUpperCase() + value.slice(1);
	},

	inlinestyle(value) {
		return value.replace(/\n/g, "");
	},
};

new Vue({
	render: (h) => h(App),
}).$mount("#app");
