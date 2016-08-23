export default {
	methods: {
		onExtraClick(itemId, iconId, index) {
			console.log(`${itemId} ${iconId} ${index}`);
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
				return [{
					id: 'aaa',
					className: 'icon-bin'
				}, {
					id: 'bbb',
					className: 'icon-pencil'
				}];
			}
		}
	}
};