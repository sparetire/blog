import '../../style/fonticon.css';
export default {
	props: {
		items: {
			type: Array,
			default: []
		}
	},
	methods: {
		notifyNavBar: function (index) {
			this.$dispatch('navItemClick', this.items[index]);
		}
	}
};