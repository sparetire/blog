import '../../filters/summary';
import '../../filters/postdate';
import '../../style/fonticon.css';
export default {
	props: {
		article: {
			type: Object,
			required: true
		},
		routeName: {
			type: String,
			required: true
		}
	}
};