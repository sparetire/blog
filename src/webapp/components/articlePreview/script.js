import summary from '../../filters/summary';
import '../../filters/postdate';
import '../../style/fonticon.css';
summary.config();
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