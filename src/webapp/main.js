import Vue from 'vue';
import $ from 'jquery';
import navBar from './components/navBar/nav-bar';
import logo from './components/logo/logo';
import info from './components/info/info';
import navList from './components/navList/nav-list';
import snsList from './components/snsList/sns-list';
import avatar from './components/avatar/avatar';
import config from './config/webapp.conf';
import ArticleService from './services/ArticleService';
import './style/app.scss';

$(() => {
	let service = ArticleService.getInstance();
	service.getArticles();
	new Vue({
		el: 'body',
		data: function () {
			return {
				currentLogo: config.defaultLogo,
				navInfo: {
					name: config.blogName,
					intro: config.blogIntro
				},
				navItems: config.navList
			};
		},
		components: {
			navBar,
			logo,
			info,
			navList,
			snsList,
			avatar
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
});