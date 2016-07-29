import co from 'co';
import NProgress from 'nprogress/nprogress';
import navBar from '../navBar/nav-bar';
import logo from '../logo/logo';
import info from '../info/info';
import navList from '../navList/nav-list';
import snsList from '../snsList/sns-list';
import avatar from '../avatar/avatar';
import mainContent from '../mainContent/main-content';
import ArticleService from '../../services/ArticleService';
import MarkdownParseService from '../../services/MarkdownParseService';
import config from '../../config/webapp.conf';
import APIConfig from '../../config/api.conf';
import API from '../../../common/APIs';
import RequestWrapper from '../../lib/RequestWrapper';
import '../../style/app.scss';
import 'nprogress/nprogress.css';

/** init */
let APIs = new API(APIConfig, RequestWrapper);
ArticleService.apiConfig({
	getArticles: APIs.getArticles
});
let articleService = ArticleService.getInstance();
// MarkdownParseService.config({
// 	renderer: new marked.Renderer(),
// 	gfm: true,
// 	tables: true,
// 	breaks: false,
// 	pedantic: false,
// 	sanitize: true,
// 	smartLists: true,
// 	smartypants: false
// });
let markdownParser = MarkdownParseService.getInstance();
let articles = [];
co(function* () {
	NProgress.start();
	let remoteArticles = yield articleService.getArticles(1, config.pageLimit);
	NProgress.inc(0.2);
	for (let i in remoteArticles) {
		remoteArticles[i].content = yield markdownParser.parse(remoteArticles[i]
			.content);
		articles.push(remoteArticles[i]);
	}
	NProgress.inc(0.3);
	NProgress.done();
});

export default {
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
		mainContent
	},
	events: {
		//切换应当和路由绑定而不是和点击事件绑定
		onRouteChange: function (route) {
			let path = route.path;
			this.navItems.forEach(function (item, i, array) {
				item.url === path ? item.active = true : item.active = false;
			});
			if (path === '/about') {
				this.currentLogo = 'avatar';
			} else {
				this.currentLogo = 'logo';
			}
		}
	}
};