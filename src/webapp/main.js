import Vue from 'vue';
import nav from './components/navBar/nav-bar';
import $ from 'jquery';
import ArticleService from './services/ArticleService';
import './style/common.css';
$(() => {
	let service = ArticleService.getInstance();
	service.getArticles();
	new Vue({
		el: 'body',
		components: {
			navBar: nav
		}
	});
});