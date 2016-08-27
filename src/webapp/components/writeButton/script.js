import '../../style/fonticon.css';


export default {
	props: {
		router: {
			type: Object,
			required: true
		},
		routeName: {
			type: String,
			required: true
		}
	},
	methods: {
		onWriteClick() {
			this.router.go({
				name: this.routeName
			});
		}
	}
};