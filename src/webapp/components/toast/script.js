export default {
	watch: {
		show(newVal, oldVal) {
			if (newVal) {
				setTimeout(() => {
					this.show = false;
				}, this.timeout);
			}
		}
	},
	props: {
		content: {
			type: String,
			required: true
		},
		show: {
			type: Boolean,
			required: true,
			twoWay: true
		},
		timeout: {
			type: Number,
			default: 1500
		}
	}
};