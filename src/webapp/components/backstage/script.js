import navBar from '../navBar/nav-bar';
import mainContent from '../mainContent/main-content';
import scrollTop from '../scrollTop/scroll-top';
import config from '../../config/webapp.backstage.conf';
import routerMap from '../../config/routerMap.backstage';
import router from '../../config/router.backstage';
import $ from 'jquery';
import '../../style/app.scss';




export default {
	ready() {
			$(window)
				.scroll(event => {
					let currentScrollTop = $(window)
						.scrollTop();
					if (!this.scrollTopShow && currentScrollTop > 200) {
						this.scrollTopShow = true;
					} else if (this.scrollTopShow && currentScrollTop < 200) {
						this.scrollTopShow = false;
					}
				});
		},
		data() {
			return {
				routeName: '',
				defaultLogo: config.defaultLogo,
				navList: config.navList,
				scrollTopShow: false,
				navInfo: {
					name: config.blogName,
					intro: config.blogIntro
				},
				router: router,
				routerMap: routerMap,
				config: config
			};
		},
		methods: {
			changeTitle(vm) {
				document.title = vm.pageTitle;
			}
		},
		components: {
			navBar,
			mainContent,
			scrollTop
		},
		events: {
			//切换应当和路由绑定而不是和点击事件绑定
			onRouteChange(route) {
				this.routeName = route.name;
			}
		}
};