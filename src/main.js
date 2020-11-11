import Vue from "vue";
import App from "./App.vue";
import linkify from "vue-linkify";
import "./filters";
import "prismjs";
import "prismjs/themes/prism-tomorrow.css";

Vue.directive("linkified", linkify);

Vue.config.productionTip = false;

new Vue({
	render: h => h(App)
}).$mount("#app");
