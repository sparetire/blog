import tagFilter from '../tagFilter/tag-filter';
import tagFilterBar from '../tagFilterBar/tag-filter-bar';
import routerMap from '../../config/routerMap';
import NProgress from 'nprogress/nprogress';
import 'nprogress/nprogress.css';

// 标题数组去重
function titleUnique(array) {
	for (let i = 0; i < array.length; ++i) {
		for (let j = i + 1; j < array.length; ++j) {
			if (array[i].title === array[j].title)
				array.splice(j--, 1);
		}
	}
	return array;
}

// 合并标题数组
function mergeTitleList(list) {
	return list.reduce((prev, cur) => prev.concat(cur.titles), []);
}

function getItemByName(array, name) {
	for (let i = 0; i < array.length; ++i) {
		if (array[i].name === name) {
			return array[i];
		}
	}
}

export default {
	components: {
		tagFilter,
		tagFilterBar
		// tagList
	},
	methods: {
		changeTitle(vm) {
			document.title = this.pageTitle = vm.pageTitle ? vm.pageTitle : this.pageTitle;
		}
	},
	computed: {
		tagList() {
			return this.rawData.tagList;
		}
	},
	// events: {
	// 	tagMatched(item) {
	// 		if (item) {
	// 			let temp = getItemByName(this.tagList, item.name);
	// 			if (temp) {
	// 				this.tagItem.name = temp.name;
	// 				this.tagItem.titles = temp.titles;
	// 			} else {
	// 				this.tagItem.name = 'Something wrong.';
	// 				this.tagItem.titles = [];
	// 			}
	// 		} else {
	// 			this.tagItem.name = `${this.rawData.total} posts`;
	// 			this.tagItem.titles = titleUnique(mergeTitleList(this.tagList));
	// 		}
	// 	}
	// },
	route: {
		canReuse() {
			this.enter = false;
			return true;
		},
		// 不用canActivate是因为触发canActivate的时候enter还没有被注册/被代理,
		// 即还没有到Vue生命周期的observe data阶段
		activate() {
			this.enter = true;
			return true;
		},
		data(transition) {
			this.$dispatch('onRouteChange', this.$route);
			if (this.enter) {
				NProgress.start();
				NProgress.inc(0.2);
				/* global APIs */
				return APIs.tags.get()
					.then((resp) => {
						return resp.json();
					})
					.then((data) => {
						this.rawData = data;
						if (this.$route.name === routerMap.tags.name) {
							// 不要修改这个tagItem最好，会有副作用
							// 最好这个tagItem是不可变变量，或者深复制也行
							// 总之就是不要修改别人传给你的对象
							this.tagItem.name = `${data.total} posts`;
							this.tagItem.titles = titleUnique(mergeTitleList(data.tagList));
						} else {
							let temp = getItemByName(this.tagList, this.$route.params.tag);
							if (temp) {
								this.tagItem.name = temp.name;
								this.tagItem.titles = temp.titles;
							} else {
								this.tagItem.name = 'Something wrong.';
								this.tagItem.titles = [];
							}
						}
						NProgress.done();
					});
			} else {
				if (this.$route.name === routerMap.tags.name) {
					this.tagItem.name = `${this.rawData.total} posts`;
					this.tagItem.titles = titleUnique(mergeTitleList(this.tagList));
				} else {
					let temp = getItemByName(this.tagList, this.$route.params.tag);
					if (temp) {
						this.tagItem.name = temp.name;
						this.tagItem.titles = temp.titles;
					} else {
						this.tagItem.name = 'Something wrong.';
						this.tagItem.titles = [];
					}
				}
				return true;
			}
		}
	},
	data() {
		return {
			enter: true,
			pageTitle: 'Tag | Sparetire',
			rawData: {
				tagList: []
			},
			tagList: [],
			tagItem: {
				name: '',
				titles: []
			},
			tagRouteName: routerMap.tag.name,
			postRouteName: routerMap.articles.name
		};
	}
};