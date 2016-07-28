import Vue from 'vue';
import $ from 'jquery';
import navBar from './components/navBar/nav-bar';
import logo from './components/logo/logo';
import info from './components/info/info';
import navList from './components/navList/nav-list';
import snsList from './components/snsList/sns-list';
import avatar from './components/avatar/avatar';
import mainContent from './components/mainContent/main-content';
import articleList from './components/articleList/article-list';
import config from './config/webapp.conf';
import ArticleService from './services/ArticleService';
import APIConfig from './config/api.conf';
import API from '../common/APIs';
import RequestWrapper from './lib/RequestWrapper';
import co from 'co';
import NProgress from 'nprogress/nprogress';
import './style/app.scss';
import 'nprogress/nprogress.css';

/** init */
let APIs = new API(APIConfig, RequestWrapper);
ArticleService.apiConfig({
	getArticles: APIs.getArticles
});
let articleService = ArticleService.getInstance();


$(() => {
	let articles = [];
	new Vue({
		el: 'body',
		data: function () {
			return {
				currentLogo: config.defaultLogo,
				navInfo: {
					name: config.blogName,
					intro: config.blogIntro
				},
				navItems: config.navList,
				articles: articles
			};
		},
		components: {
			navBar,
			logo,
			info,
			navList,
			snsList,
			avatar,
			mainContent,
			articleList
		},
		events: {
			navItemClick: function (msg) {
				if (msg.content === 'About') {
					this.currentLogo = 'avatar';
					//route
				} else {
					this.currentLogo = 'logo';
					//route
				}
			}
		}
	});
	co(function* () {
		NProgress.start();
		let remoteArticles = yield articleService.getArticles(1, config.pageLimit);
		remoteArticles.forEach(function (item, index, array) {
			articles.push(item);
		});
		NProgress.inc(0.2);
		NProgress.done();
	});
});