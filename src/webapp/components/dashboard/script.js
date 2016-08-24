import archiveList from '../archiveList/archive-list';
import writeButton from '../writeButton/write-button';
import modal from '../modal/modal';
import pagination from '../pagination/pagination';
import NProgress from 'nprogress/nprogress';
import 'nprogress/nprogress.css';

let DELETE = 0;
let MODIFY = 1;
let OK = 1;
let CANCEL = 0;

export default {
	components: {
		archiveList,
		pagination,
		writeButton,
		modal
	},
	// 最好用compiled而不用ready，ready会在route的data后触发
	compiled() {
		this.pageCount = this.config.pageCount;
		this.postRouteName = this.routerMap.articles.name;
		this.pageRouteName = this.routerMap.dashboard.name;
		this.router = this.router;
	},
	data() {
		return {
			pageTitle: 'Dashboard | Sparetire',
			archiveList: [],
			curPage: 1,
			pageCount: 1,
			total: 1,
			postRouteName: '',
			pageRouteName: '',
			showModal: false,
			modalHeader: 'Warning',
			modalDetail: '一旦删除日志便无法恢复，是否确认删除该日志?',
			modalButtons: [{
				id: OK,
				content: '确认'
			}, {
				id: CANCEL,
				content: '取消'
			}],
			options: [{
				id: DELETE,
				className: 'icon-bin'
			}, {
				id: MODIFY,
				className: 'icon-pencil'
			}]
		};
	},
	events: {
		onExtraClick([itemId, iconId, index]) {
			if (iconId === DELETE) {
				this.showModal = true;
			}
		},
		onModalBtnClick(id) {
			if (id === OK) {
				console.log('OK');
			} else if (id === CANCEL) {
				console.log('CANCEL');
			}
		}
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
					name: this.routerMap.dashboard.name,
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
							name: this.routerMap.dashboard.name,
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