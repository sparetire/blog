import articleList from '../articleList/article-list';
export default {
	props: {
		articles: {
			type: Array,
			default: []
		},
		curPage: {
			type: Number,
			default: 1
		}
	},
	components: {
		articleList
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