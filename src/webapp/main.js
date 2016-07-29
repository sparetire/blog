import Vue from 'vue';
import VueRouter from 'vue-router';
import $ from 'jquery';
import app from './components/app/app';
import articleList from './components/articleList/article-list';

Vue.use(VueRouter);
let router = new VueRouter();
router.map({
	'/': {
		component: articleList
	}
});

$(() => {
	router.start(app, 'app');
	// new Vue({
	// 	el: 'body',
	// 	components: {
	// 		app
	// 	}
	// });
});