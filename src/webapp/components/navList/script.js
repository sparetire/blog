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
			$('.active-item')
				.removeClass('active-item');
			$(`.nav-item:eq(${index})`)
				.addClass('active-item');
			this.$dispatch('navItemClick', this.items[index]);
		}
	}
};