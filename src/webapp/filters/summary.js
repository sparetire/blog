import Vue from 'vue';
import trimHtml from 'trim-html';

export default {
	config(opts) {
		Vue.filter('summary', function (value) {
			let limit = opts ? opts.summaryLimit : 300;
			return trimHtml(value, limit)
				.html;
		});
	}
};