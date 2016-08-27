export default {
	methods: {
		onItemClick(oldItem, newItem, newItemIndex) {
			this.$dispatch('onDropdownChange', [oldItem, newItem, newItemIndex]);
			this.currentItem = newItem;
			this.hideDropdown = true;
			// 为了等Vue异步渲染完dom再去掉这个class
			// 为什么不用v-show通过mouseover和mouseout来做？
			// 因为这样有个很诡异的bug。。
			setTimeout(() => {
				this.hideDropdown = false;
			}, 0);
		}
	},
	props: {
		items: {
			type: Array,
			default: function () {
				return [];
			}
		},
		currentItem: {
			type: [Object, Number],
			default: null
		}
	},
	watch: {
		currentItem(newVal, oldVal) {
			if (typeof newVal === 'number') {
				this.currentItem = this.items[newVal];
			} else if (typeof newVal === 'object') {
				this.currentItem = newVal;
			}
		}
	},
	compiled() {
		if (typeof this.currentItem === 'number') {
			this.currentItem = this.items[this.currentItem];
		}
	},
	data() {
		return {
			hideDropdown: false
		};
	}
};