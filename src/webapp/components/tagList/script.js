import titleList from '../titleList/title-list';
export default {
	components: {
		titleList
	},
	props: {
		tagItem: {
			type: Object,
			required: true
		},
		routeName: {
			type: String,
			required: true
		}
	}
};