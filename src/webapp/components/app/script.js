import navBar from '../navBar/nav-bar';
import logo from '../logo/logo';
import info from '../info/info';
import navList from '../navList/nav-list';
import snsList from '../snsList/sns-list';
import avatar from '../avatar/avatar';
import mainContent from '../mainContent/main-content';
import ArticleService from '../../services/ArticleService';
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

// 个人觉得在这里取文章列表比较好，因为此时还没渲染组件，先发起请求反正是异步，
// 等组件渲染好数据差不多也到了，而在组件中取数据则是等大部分组件渲染好后才发请求，
// 稍慢一点，但在组件中取数据让路由更方便点

export default {
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