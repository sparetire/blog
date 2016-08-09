import articleDetail from '../articleDetail/article-detail';
import ArticleService from '../../services/ArticleService';
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
			articleService.getArticleById(id)
				.then((article) => {
					this.article = article;
					NProgress.done();
					transition.next();
				});
		}
	},
	data() {
		return {
			article: {}
		};
	}
};