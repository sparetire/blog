import Vue from 'vue';

Vue.filter('pageurl', function (template, page) {
	let reg = /:(page)/g;
	return template.replace(reg, () => page);
});