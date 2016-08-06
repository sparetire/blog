import '../../filters/pageurl';
export default {
	computed: {
		// 起始页页码数
		startPage() {
			if (!(this.curPage % this.pageCount)) {
				// (this.curPage - 1) - (this.curPage - 1) % this.pageCount + 1;
				return this.curPage - (this.curPage - 1) % this.pageCount;
			}
			return this.curPage - this.curPage % this.pageCount + 1;
		},
		// 当前这轮最后一页的页码数
		endPage() {
			let temp = this.startPage + this.pageCount - 1;
			return temp > this.total ? this.total : temp;
		},
		// 当前这轮组件item的个数
		curPageCount() {
			return this.endPage - this.startPage + 1;
		},
		// 当前页或者请求页的索引
		curIndex() {
			return this.curPage - this.startPage;
		}
	},
	props: {
		// 总页数，即最大页码数
		total: {
			type: Number,
			required: true
		},
		// 当前页数，也是请求的页数
		curPage: {
			validator(value) {
				return value > 0;
			}
		},
		// 总栏数，即组件最多有多少格
		pageCount: {
			type: Number,
			required: true
		},
		urlTemplate: {
			type: String
		}
	}

};