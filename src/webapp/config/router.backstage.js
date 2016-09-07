import Vue from 'vue';
import VueRouter from 'vue-router';
import home from '../components/home/home';
import article from '../components/article/article';
import archive from '../components/archive/archive';
import dashboard from '../components/dashboard/dashboard';
import tags from '../components/tags/tags';
import tagList from '../components/tagList/tag-list';
import write from '../components/write/write';
import writeDetail from '../components/writeDetail/write-detail';
import about from '../components/about/about';
import routerMap from './router-map.backstage';


Vue.use(VueRouter);
let router = new VueRouter();
router.map({
	'/home/:page': {
		name: routerMap.home.name,
		component: home
	},
	'/archives/:page': {
		name: routerMap.archives.name,
		component: archive
	},
	'/tags': {
		component: tags,
		subRoutes: {
			'/': {
				name: routerMap.tags.name,
				component: tagList
			},
			'/:tag': {
				name: routerMap.tag.name,
				component: tagList
			}
		}
	},
	'/about': {
		name: routerMap.about.name,
		component: about
	},
	'/post/:id': {
		name: routerMap.articles.name,
		component: article
	},
	'/dashboard/:page': {
		name: routerMap.dashboard.name,
		component: dashboard
	},
	'/write': {
		component: write,
		subRoutes: {
			'/': {
				name: routerMap.write.name,
				component: writeDetail
			},
			'/:id': {
				name: routerMap.modify.name,
				component: writeDetail
			}
		}
	}
});

router.redirect({
	'/archives': '/archives/1',
	'/dashboard': '/dashboard/1',
	'*': '/home/1'
});

export default router;