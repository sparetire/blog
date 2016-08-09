import articleList from '../articleList/article-list';
import pagination from '../pagination/pagination';
import config from '../../config/webapp.conf';
import routerMap from '../../config/routerMap';
import MarkdownParseService from '../../services/MarkdownParseService';
import ArticleService from '../../services/ArticleService';
import router from '../../config/router';
import co from 'co';
import NProgress from 'nprogress/nprogress';
import Promise from 'bluebird';
import 'nprogress/nprogress.css';




export default {
	data() {
			return {
				articles: [],
				curPage: 1,
				pageCount: config.pageCount,
				total: 1,
				urlTemplate: routerMap.home.path
			};
		},
		components: {
			articleList,
			pagination
		},
		route: {
			data(transition) {
				let ctx = this;
				this.$dispatch('onRouteChange', this.$route);
				return new Promise(function (resolve, reject) {
					let articleService = ArticleService.getInstance();
					let markdownParser = MarkdownParseService.getInstance();
					// co会绑定this，所以在这里先把this.article取一下
					let articles = ctx.articles = [];
					co(function* () {
						NProgress.start();
						ctx.curPage = parseInt(ctx.$route.params.page, 10);
						ctx.total = Math.ceil((yield articleService.getTotal()) / config.perPageLimit);
						NProgress.inc(0.3);
						if (ctx.curPage < 1 || ctx.curPage > ctx.total) {
							ctx.curPage = 1;
							resolve();
							NProgress.done();
							router.go({
								name: routerMap.home.name,
								params: {
									page: 1
								}
							});
							return;
						}
						let remoteArticles = yield articleService.getArticles(ctx.curPage,
							config.perPageLimit);
						NProgress.inc(0.3);
						for (let i in remoteArticles) {
							remoteArticles[i].content = yield markdownParser.parse(
								remoteArticles[i]
								.content);
							articles.push(remoteArticles[i]);
						}
						articleService.setCachedArticles(articles);
						resolve(articles);
						NProgress.inc(0.2);
						NProgress.done();
					});
				});
			}
		}
};