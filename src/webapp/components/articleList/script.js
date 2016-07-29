import articlePreview from '../articlePreview/article-preview';
export default {
	props: {
		articles: {
			type: Array,
			default: []
		}
	},
	components: {
		articlePreview
	},
	route: {
		data: function (transition) {
			this.$dispatch('onRouteChange', this.$route);
			transition.next();
		}
	}
};