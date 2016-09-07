import articleDetail from '../articleDetail/article-detail';
import ArticleService from '../../services/article-service';
import NProgress from 'nprogress/nprogress';
import 'nprogress/nprogress.css';
export default {
	components: {
		articleDetail
	},
	route: {
		data(transition) {
			let articleService = ArticleService.getInstance();
			let id = this.$route.params.id;
			NProgress.start();
			NProgress.inc(0.2);
			articleService.getArticleById(id)
				.then(article => {
					this.article = article;
					this.pageTitle = `${article.title} | Sparetire`;
					NProgress.done();
					transition.next();
				})
				.catch(err => {
					NProgress.done();
					transition.next();
				});
		}
	},
	data() {
		return {
			article: {},
			pageTitle: ''
		};
	}
};