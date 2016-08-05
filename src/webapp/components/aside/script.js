import articleList from '../articleList/article-list';
import pagination from '../pagination/pagination';
export default {
	props: {
		articles: {
			type: Array,
			default: []
		},
		curPage: {
			default: 1
		},
		pageCount: {
			default: 10
		},
		total: {
			default: 0
		},
		urlTemplate: {
			default: '/'
		}
	},
	components: {
		articleList,
		pagination
	},
	route: {
		data: function (transition) {
			this.$dispatch('onRouteChange', this.$route);
			transition.next();
		}
	}
};