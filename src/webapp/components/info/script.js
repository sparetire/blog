export default {
	props: {
		content: {
			type: Object,
			default: function () {
				return {
					name: '',
					intro: ''
				};
			}
		}
	}
};