import '../../filters/month';
import titleList from '../titleList/title-list';
export default {
	components: {
		titleList
	},
	props: {
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
	}
};