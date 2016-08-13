import tagFilter from '../tagFilter/tag-filter';
import tagFilterBar from '../tagFilterBar/tag-filter-bar';
import tagList from '../tagList/tag-list';
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
		return array;
	}
}

// 合并标题数组
function mergeTitleList(list) {
	return list.reduce((prev, cur) => prev.concat(cur.titles), []);
}

export default {
	components: {
		tagFilter,
		tagFilterBar,
		tagList
	},
	route: {
		data(transition) {
			this.$dispatch('onRouteChange', this.$route);
			NProgress.start();
			NProgress.inc(0.2);
			/* global APIs */
			return APIs.tags.get()
				.then((resp) => {
					return resp.json();
				})
				.then((data) => {
					this.tagList = data.tagList;
					if (this.$route.name === routerMap.tags.name) {
						this.tagItem.name = `${data.total} posts`;
						this.tagItem.titles = titleUnique(mergeTitleList(data.tagList));
					} else {
						this.tagItem = data.tagList[0];
					}
					NProgress.done();
				});
		}
	},
	data() {
		return {
			pageTitle: 'Tags | Sparetire',
			tagList: [],
			tagItem: {
				name: '',
				titles: []
			},
			tagRouteName: routerMap.tags.name,
			postRouteName: routerMap.articles.name
		};
	}
};