import Vue from 'vue';
import routerMap from '../config/routerMap';

let template = routerMap.articles.path;

Vue.filter('articleurl', function (id) {
	let reg = /:(id)/g;
	return template.replace(reg, () => id);
});