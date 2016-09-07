import archiveList from '../archiveList/archive-list';
import writeButton from '../writeButton/write-button';
import modal from '../modal/modal';
import loading from '../loading/loading';
import toast from '../toast/toast';
import pagination from '../pagination/pagination';
import NProgress from 'nprogress/nprogress';
import StatusCode from '../../../common/status-code';
import 'nprogress/nprogress.css';

/* global APIs */

let DELETE = 0;
let MODIFY = 1;
let OK = 1;
let CANCEL = 0;
// 锁，防止重复提交以及在一个修改/删除操作未完成时进行其他修改删除操作
let lock = false;

export default {
	components: {
		archiveList,
		pagination,
		writeButton,
		modal,
		loading,
		toast
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
			toastContent: 'Hello',
			showToast: false,
			showLoading: false,
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
			}],
			beDeletePost: {
				itemIndex: null,
				postIndex: null,
				postId: null
			}
		};
	},
	events: {
		onItemMsg([itemIndex, postId, postIndex, iconId, iconIndex]) {
			// 没有锁才响应修改删除操作
			if (!lock) {
				if (iconId === DELETE) {
					this.showModal = true;
					this.beDeletePost.itemIndex = itemIndex;
					this.beDeletePost.postIndex = postIndex;
					this.beDeletePost.postId = postId;
				} else if (iconId === MODIFY) {
					this.router.go({
						name: this.routerMap.modify.name,
						params: {
							id: postId
						}
					});
				}
			}
		},
		onModalBtnClick(id) {
			if (id === OK) {
				this.showLoading = true;
				lock = true;
				APIs.removeArticle.post({
						id: this.beDeletePost.postId
					})
					.then(resp => resp.json())
					.then(data => {
						this.showLoading = false;
						lock = false;
						if (data.status === StatusCode.OK) {
							let beDeletePost = this.beDeletePost;
							this.archiveList[beDeletePost.itemIndex].posts.splice(beDeletePost.postIndex,
								1);
						}
						this.toastContent = data.description;
						this.showToast = true;
					});
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
		deactivate(transition) {
			// 如果有锁则需要等锁释放才可以切换路由
			if (!lock) {
				transition.next();
			} else {
				return transition.abort();
			}
		},
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
					limit: this.config.archivePageLimit
				})
				.then(data => data.json())
				.then(data => {
					this.total = Math.ceil(data.total / this.config.archivePageLimit);
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