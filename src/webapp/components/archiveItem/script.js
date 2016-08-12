import '../../filters/month';
export default {
	props: {
		monthItem: {
			type: Object,
			required: true
		},
		routeName: {
			type: String,
			required: true
		}
	}
};