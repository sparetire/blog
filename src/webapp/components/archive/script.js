import archiveList from '../archiveList/archive-list';
import pagination from '../pagination/pagination';
import NProgress from 'nprogress/nprogress';
import 'nprogress/nprogress.css';
export default {
	components: {
		archiveList,
		pagination
	},
	// 最好用compiled而不用ready，ready会在route的data后触发
	compiled() {
		this.pageCount = this.config.pageCount;
		this.postRouteName = this.routerMap.articles.name;
		this.pageRouteName = this.routerMap.archives.name;
		this.router = this.router;
	},
	data() {
		return {
			pageTitle: 'Archives | Sparetire',
			archiveList: [],
			curPage: 1,
			pageCount: 1,
			total: 1,
			postRouteName: '',
			pageRouteName: ''
		};
	},
	props: {
		config: {
			type: Object,
			required: true
		},
		router: {
			type: Object,
			required: true
		},
		routerMap: {
			type: Object,
			required: true
		}
	},
	route: {
		data(transition) {
			this.$dispatch('onRouteChange', this.$route);
			NProgress.start();
			NProgress.inc(0.2);
			this.archiveList = [];
			let curPage = parseInt(this.$route.params.page, 10);
			if (curPage < 1) {
				this.curPage = 1;
				NProgress.done();
				this.router.go({
					name: this.routerMap.archives.name,
					params: {
						page: 1
					}
				});
				return true;
			}
			/* global APIs */
			return APIs.getArchives.get({
					page: curPage,
					limit: this.config.perPageLimit
				})
				.then(data => data.json())
				.then(data => {
					this.total = Math.ceil(data.total / this.config.perPageLimit);
					if (curPage > this.total) {
						this.curPage = 1;
						NProgress.done();
						this.router.go({
							name: this.routerMap.archives.name,
							params: {
								page: 1
							}
						});
						return;
					}
					this.curPage = curPage;
					this.archiveList = data.archiveList;
					NProgress.inc(0.5);
					NProgress.done();
				});
		}
	}
};