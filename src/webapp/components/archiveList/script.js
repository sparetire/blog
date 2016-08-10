import archiveItem from '../archiveItem/archive-item';
export default {
	components: {
		archiveItem
	},
	props: {
		archiveList: {
			type: Array,
			default: function () {
				return [];
			}
		}
	}
};