import mkdEditor from '../markdownEditor/markdown-editor';
import dropdown from '../dropdown/dropdown';

function init(ctx) {
	ctx.getContent = '';
	ctx.setContent = 'a';
	ctx.currentItem = null;
	ctx.tagsStr = '';
	ctx.author = '';
	ctx.title = '';
	ctx.dropDownItems = [];
	ctx.setContent = '';
	setTimeout(() => {
		ctx.setContent = '';
	}, 1000);
}

export default {
	components: {
		mkdEditor,
		dropdown
	},
	props: {
		router: {
			type: Object,
			required: true
		},
		routerMap: {
			type: Object,
			required: true
		}
	},
	events: {
		onDropdownChange([oldItem, newItem, newItemIndex]) {
			this.tagsStr += `${newItem.key},`;
		}
	},
	route: {
		data(transition) {
			if (this.$route.name === this.routerMap.write.name) {
				init(this);
			}
			transition.next();
		}
	},
	data() {
		return {
			getContent: '',
			setContent: '',
			currentItem: 2,
			tagsStr: '',
			author: '',
			title: '',
			dropDownItems: [{
				key: 'item0',
				value: 0
			}, {
				key: 'item1',
				value: 1
			}, {
				key: 'item2',
				value: 2
			}, {
				key: 'item3',
				value: 1
			}, {
				key: 'item4',
				value: 4
			}]
		};
	}
};