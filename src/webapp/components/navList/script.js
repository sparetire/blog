import '../../style/fonticon.css';
import $ from 'jquery';
export default {
	props: {
		items: {
			type: Array,
			default: []
		}
	},
	methods: {
		notifyNavBar: function (index) {
			this.items.forEach(function (item, i, array) {
				index === i ? item.active = true : item.active = false;
			});
			this.$dispatch('navItemClick', this.items[index]);
		}
	}
};