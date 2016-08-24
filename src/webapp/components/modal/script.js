export default {
	methods: {
		onButtonClick(id) {
			this.$dispatch('onModalBtnClick', id);
			this.show = false;
		}
	},
	props: {
		show: {
			type: Boolean,
			required: true,
			twoWay: true
		},
		header: {
			type: String
		},
		detail: {
			type: String
		},
		buttons: {
			type: Array,
			required: true
		}
	}
};