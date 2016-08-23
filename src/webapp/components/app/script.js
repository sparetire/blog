import navBar from '../navBar/nav-bar';
import mainContent from '../mainContent/main-content';
import scrollTop from '../scrollTop/scroll-top';
import config from '../../config/webapp.conf';
import routerMap from '../../config/routerMap';
import router from '../../config/router';
import $ from 'jquery';
import '../../style/app.scss';



// 个人觉得在这里取文章列表比较好，因为此时还没渲染组件，先发起请求反正是异步，
// 等组件渲染好数据差不多也到了，而在组件中取数据则是等大部分组件渲染好后才发请求，
// 稍慢一点，但在组件中取数据让路由更方便点


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