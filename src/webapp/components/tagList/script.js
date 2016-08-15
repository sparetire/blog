import titleList from '../titleList/title-list';
import routerMap from '../../config/routerMap';
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
	},
	route: {
		data() {
			if (this.routeName === routerMap.tags.name) {
				this.pageTitle = 'Tags | Sparetire';
			} else {
				this.pageTitle = `${this.$route.params.tag} | Sparetire`;
			}
		}
	},
	data() {
		return {
			pageTitle: 'Tags | Sparetire'
		};
	}
};