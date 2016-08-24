import '../../filters/month';
import titleList from '../titleList/title-list';
export default {
	components: {
		titleList
	},
	props: {
		index: {
			type: Number
		},
		monthItem: {
			type: Object,
			required: true
		},
		routeName: {
			type: String,
			required: true
		},
		options: {
			type: Array,
			default: function () {
				return [];
			}
		}
	},
	events: {
		onExtraClick([postId, postIndex, iconId, iconIndex]) {
			this.$dispatch('onItemMsg', [this.index, postId, postIndex, iconId,
				iconIndex
			]);
		}
	}
};