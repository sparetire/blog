export default {
	methods: {
		onExtraClick(itemId, itemIndex, iconId, iconIndex) {
			this.$dispatch('onExtraClick', [itemId, itemIndex, iconId, iconIndex]);
		}
	},
	props: {
		titleList: {
			type: Array,
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
	}
};