import Vue from 'vue';

Vue.filter('month', function (monthItem) {
	return `${monthItem.year}/${monthItem.month}`;
});