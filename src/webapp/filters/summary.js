import Vue from 'vue';
import trimHtml from 'trim-html';
import config from '../config/webapp.conf';

let limit = {
	limit: config.sumaryLimit
};
Vue.filter('summary', function (value) {
	return trimHtml(value, limit)
		.html;
});