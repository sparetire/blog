import navBar from '../navBar/nav-bar';
import mainContent from '../mainContent/main-content';
import scrollTop from '../scrollTop/scroll-top';
import $ from 'jquery';
import '../../style/app.scss';



// 个人觉得在这里取文章列表比较好，因为此时还没渲染组件，先发起请求反正是异步，
// 等组件渲染好数据差不多也到了，而在组件中取数据则是等大部分组件渲染好后才发请求，
// 稍慢一点，但在组件中取数据让路由更方便点


export default {
	ready() {
			$(window)
				.scroll((event) => {
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
				path: '',
				scrollTopShow: false
			};
		},
		components: {
			navBar,
			mainContent,
			scrollTop
		},
		events: {
			//切换应当和路由绑定而不是和点击事件绑定
			onRouteChange(route) {
				// switch (route.name) {
				// 	case routerMap.home.name:
				// 		loadArticleAside(this, route);
				// 		break;
				// 	case routerMap.archives.name:
				// 		loadArticleAside(this, route);
				// 		break;
				// 	case routerMap.tags.name:
				// 		loadArticleAside(this, route);
				// 		break;
				// 	case routerMap.about.name:
				// 		loadArticleAside(this, route);
				// 		break;
				// 	default:
				// 		break;
				// }
				this.path = route.path;

			}
		}
};