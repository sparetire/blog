export default {
	methods: {
		onExtraClick(itemId, iconId, index) {
			this.$dispatch('onExtraClick', [itemId, iconId, index]);
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