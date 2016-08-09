import Vue from 'vue';

Vue.filter('postdate', function (article) {
	return `${article.year}/${article.month}/${article.day}`;
});