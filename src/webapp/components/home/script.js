import articleList from '../articleList/article-list';
import pagination from '../pagination/pagination';
import MarkdownParseService from '../../services/markdown-parse-service';
import ArticleService from '../../services/article-service';
import co from 'co';
import NProgress from 'nprogress/nprogress';
import Promise from 'bluebird';
import 'nprogress/nprogress.css';




export default {
	data() {
			return {
				pageTitle: 'Home | Sparetire',
				articles: [],
				curPage: 1,
				pageCount: 1,
				total: 1,
				postRouteName: '',
				pageRouteName: ''
			};
		},
		components: {
			articleList,
			pagination
		},
		// 用compiled而不用ready是因为路由的data会先于ready触发
		compiled() {
			this.pageCount = this.config.pageCount;
			this.postRouteName = this.routerMap.articles.name;
			this.pageRouteName = this.routerMap.home.name;
		},
		props: {
			config: {
				type: Object,
				required: true
			},
			router: {
				type: Object,
				required: true
			},
			routerMap: {
				type: Object,
				required: true
			}
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
						NProgress.inc(0.3);
						let curPage = parseInt(ctx.$route.params.page, 10);
						if (curPage < 1) {
							ctx.curPage = 1;
							resolve();
							NProgress.done();
							ctx.router.go({
								name: ctx.routerMap.home.name,
								params: {
									page: 1
								}
							});
							return;
						}

						let perPageLimit = ctx.config.perPageLimit;
						let data = yield articleService.getArticles(curPage, perPageLimit);
						ctx.total = Math.ceil((data.total / perPageLimit));
						if (curPage > ctx.total) {
							ctx.curPage = 1;
							resolve();
							NProgress.done();
							ctx.router.go({
								name: ctx.routerMap.home.name,
								params: {
									page: 1
								}
							});
							return;
						}

						ctx.curPage = curPage;
						let remoteArticles = data.articleList;
						NProgress.inc(0.3);
						for (let i in remoteArticles) {
							remoteArticles[i].content = yield markdownParser.parse(
								remoteArticles[i]
								.content);
							articles.push(remoteArticles[i]);
						}
						articleService.setCachedArticles(articles);
						resolve(articles);
						NProgress
							.inc(0.2);
						NProgress.done();
					});
				});
			}
		}
};