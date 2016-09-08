import writeDetail from '../writeDetail/write-detail';
export default {
	components: {
		writeDetail
	},
	props: {
		config: {
			type: Object,
			required: true
		},
		router: {
			type: Object,
			required: true
		},
		routerMap: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			pageTitle: 'New | TKBOY'
		};
	}
};