import archiveItem from '../archiveItem/archive-item';
import pagination from '../pagination/pagination';
import routerMap from '../../config/routerMap';
import router from '../../config/router';
import config from '../../config/webapp.conf';
import NProgress from 'nprogress/nprogress';
import 'nprogress/nprogress.css';
export default {
	components: {
		archiveItem,
		pagination
	},
	data() {
		return {
			archiveList: [],
			curPage: 1,
			pageCount: config.pageCount,
			total: 1,
			urlTemplate: routerMap.archives.path
		};
	},
	route: {
		data(transition) {
			this.$dispatch('onRouteChange', this.$route);
			NProgress.start();
			NProgress.inc(0.2);
			this.archiveList = [];
			this.curPage = parseInt(this.$route.params.page, 10);
			/* global APIs */
			return APIs.getArchives.get({
					page: this.curPage,
					limit: config.perPageLimit
				})
				.then(data => data.json())
				.then(data => {
					this.total = Math.ceil(data.total / config.perPageLimit);
					if (this.curPage < 1 || this.curPage > this.total) {
						this.curPage = 1;
						NProgress.done();
						router.go({
							name: routerMap.archives.name,
							params: {
								page: 1
							}
						});
						return;
					}
					this.archiveList = data.archiveList;
					NProgress.inc(0.5);
					NProgress.done();
				});
		}
	}
};