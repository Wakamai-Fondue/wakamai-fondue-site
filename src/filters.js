import Vue from "vue";

// Turn values of an array into a "comma and list"
// ["wine", "cheese", "fondue"] → "wine, cheese and fondue"
// ["sandwich"] → "sandwich"
Vue.filter("listify", (array, emptyWord) => {
	if (array.length === 0) return emptyWord;
	if (array.length === 1) return array[0];
	const last = array[array.length - 1];
	return array.slice(0, array.length - 1).join(", ") + " and " + last;
});

// Pluralize a word
Vue.filter("pluralize", (value, word) => {
	return `${word}${value !== 1 ? "s" : ""}`;
});

// Capitalize a word
Vue.filter("capitalize", function(value) {
	if (!value) return "";
	value = value.toString();
	return value.charAt(0).toUpperCase() + value.slice(1);
});
