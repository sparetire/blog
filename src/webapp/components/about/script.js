import aboutDetail from '../aboutDetail/about-detail';
import MarkdownParseService from '../../services/MarkdownParseService';
import NProgress from 'nprogress/nprogress';
import 'nprogress/nprogress.css';
export default {
	components: {
		aboutDetail
	},
	route: {
		data() {
			NProgress.start();
			NProgress.inc(0.2);
			this.$dispatch('onRouteChange', this.$route);
			/* global APIs */
			return APIs.about.get()
				.then(resp => {
					NProgress.inc(0.2);
					return resp.json();
				})
				.then(data => {
					let markdownParser = MarkdownParseService.getInstance();
					NProgress.inc(0.2);
					return markdownParser.parse(data.content)
						.then(content => {
							NProgress.done();
							this.userInfo = content;
						});
				});
		}
	},
	data() {
		return {
			userInfo: 'Hello',
			pageTitle: 'About | Sparetire'
		};
	}
};