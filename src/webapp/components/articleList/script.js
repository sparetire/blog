import articlePreview from '../articlePreview/article-preview';
import MarkdownParseService from '../../services/MarkdownParseService';
import ArticleService from '../../services/ArticleService';
import config from '../../config/webapp.conf';
import co from 'co';
import NProgress from 'nprogress/nprogress';
export default {
	props: {
		articles: {
			type: Array,
			default: function () {
				return [];
			}
		}
	},
	components: {
		articlePreview
	},
	route: {
		data: function (transition) {
			this.$dispatch('onRouteChange', this.$route);
			let articleService = ArticleService.getInstance();
			let markdownParser = MarkdownParseService.getInstance();
			// co会绑定this，所以在这里先把this.article取一下
			let articles = this.articles;
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
				transition.next();
			});
		}
	}
};