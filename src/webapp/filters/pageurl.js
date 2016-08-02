import Vue from 'vue';

Vue.filter('pageurl', function (template, page) {
	let reg = /{(pageNum)}/g;
	return template.replace(reg, () => page);
});