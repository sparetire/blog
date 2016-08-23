import titleList from '../titleList/title-list';
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
		},
		tagsRouteName: {
			type: String,
			required: true
		}
	},
	route: {
		data() {
			if (this.$route.name === this.tagsRouteName) {
				this.pageTitle = 'Tags | Sparetire';
			} else {
				this.pageTitle = `${this.$route.params.tag} | Sparetire`;
			}
		}
	},
	watch: {
		// 不用onchagne是因为onchange要在失去焦点才触发
		query(newVal, oldVal) {
			this.titles = this.tagItem.titles.slice();
			this.titles = this.titles.filter((item, index, array) => {
				if (item.title.indexOf(newVal) != -1) {
					return item;
				}
			});
		},
		// 为了不修改原始数据
		'tagItem.titles': function (newVal, oldVal) {
			this.titles = newVal.slice();
		}
	},
	data() {
		return {
			pageTitle: 'Tags | Sparetire',
			query: '',
			titles: []
		};
	}
};