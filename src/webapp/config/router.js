import Vue from 'vue';
import VueRouter from 'vue-router';
import articleAside from '../components/aside/aside';
import article from '../components/article/article';
import routerMap from './routerMap';


Vue.use(VueRouter);
let router = new VueRouter();
router.map({
	'/home/:page': {
		name: routerMap.home.name,
		component: articleAside
	},
	'/achives': {
		name: routerMap.archives.name,
		component: articleAside
	},
	'/tags': {
		name: routerMap.tags.name,
		component: articleAside
	},
	'/about': {
		name: routerMap.about.name,
		component: articleAside
	},
	'/articles/:id': {
		name: routerMap.articles.name,
		component: article
	}
});

router.redirect({
	'*': '/home/1'
});

export default router;