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
import MarkdownParseService from '../../services/MarkdownParseService';
import router from '../../config/router';
import co from 'co';
import NProgress from 'nprogress/nprogress';
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

function loadArticleAside(ctx, route) {
	let articleService = ArticleService.getInstance();
	let markdownParser = MarkdownParseService.getInstance();
	// co会绑定this，所以在这里先把this.article取一下
	let articles = ctx.articles = [];
	co(function* () {
		NProgress.start();
		// 高亮当前页
		ctx.curPage = parseInt(route.params.page);
		if (ctx.curPage < 1 || ctx.curPage > ctx.total) {
			ctx.curPage = 1;
			router.go({
				name: 'home',
				params: {
					page: 1
				}
			});
			return;
		}
		let remoteArticles = yield articleService.getArticles(ctx.curPage, config.perPageLimit);
		NProgress.inc(0.2);
		for (let i in remoteArticles) {
			remoteArticles[i].content = yield markdownParser.parse(remoteArticles[i]
				.content);
			articles.push(remoteArticles[i]);
		}
		NProgress.inc(0.3);
		NProgress.done();
	});
}

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
			navItems: config.navList,
			articles: [],
			curPage: 2,
			total: 43,
			pageCount: config.pageCount,
			urlTemplate: '/home/{pageNum}'
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
			switch (route.name) {
				case 'home':
					loadArticleAside(this, route);
					break;
				case 'achives':
					loadArticleAside(this, route);
					break;
				case 'tags':
					loadArticleAside(this, route);
					break;
				case 'about':
					loadArticleAside(this, route);
					break;
				default:
					break;
			}

			// 高亮当前导航栏
			let path = route.path;
			this.navItems.forEach(function (item, i, array) {
				!path.indexOf(item.url) ? item.active = true : item.active = false;
			});
			// logo 切换
			if (path === '/about') {
				this.currentLogo = 'avatar';
			} else {
				this.currentLogo = 'logo';
			}
		}
	}
};