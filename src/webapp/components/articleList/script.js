import articlePreview from '../articlePreview/article-preview';
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
			let that = this;
			return new Promise((resolve, reject) => {
				that.$dispatch('onRouteChange', this.$route);
			});
		}
	}
};