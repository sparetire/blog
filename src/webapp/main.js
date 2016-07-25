import Vue from 'vue';
import nav from './components/navBar/nav-bar';
import $ from 'jquery';
import ArticleService from './services/ArticleService';
import './style/common.css';
$(() => {
	console.log(ArticleService);
	console.log(ArticleService.getInstance);
	let service = ArticleService.getInstance();
	console.log(service);
	service.getArticles();
	new Vue({
		el: 'body',
		components: {
			navBar: nav
		}
	});
});