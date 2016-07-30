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
	}
};