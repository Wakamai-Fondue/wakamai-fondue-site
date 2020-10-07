import Vue from "vue";
import App from "./App.vue";
import "./filters";
import "prismjs";
import "prismjs/themes/prism-tomorrow.css";

Vue.config.productionTip = false;

new Vue({
	render: h => h(App)
}).$mount("#app");
