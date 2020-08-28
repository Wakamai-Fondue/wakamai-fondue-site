import Vue from "vue";

// Turn values of an array into a "comma and list"
// ["wine", "cheese", "fondue"] → "wine, cheese and fondue"
// ["sandwich"] → "sandwich"
Vue.filter("listify", array => {
	if (array.length === 1) return array[0];
	const last = array[array.length - 1];
	return array.slice(0, array.length - 1).join(", ") + " and " + last;
});

// Pluralize a word
Vue.filter("pluralize", (value, word) => {
	return `${word}${value !== 1 ? "s" : ""}`;
});
