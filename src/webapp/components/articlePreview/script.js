import '../../filters/markdown';
import '../../filters/summary';
import '../../filters/articleurl';
import '../../style/fonticon.css';
export default {
	props: {
		article: {
			type: Object,
			required: true
		}
	}
};