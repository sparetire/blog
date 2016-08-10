import Vue from 'vue';

Vue.filter('pageurl', function (page, template) {
	let reg = /:(page)/g;
	return template.replace(reg, page);
});