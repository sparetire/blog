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
			let that = this;
			return new Promise((resolve, reject) => {
				that.$dispatch('onRouteChange', this.$route);
			});
		}
	}
};