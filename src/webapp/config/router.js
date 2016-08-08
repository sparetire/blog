import Vue from 'vue';
import VueRouter from 'vue-router';
import articleAside from '../components/aside/aside';
Vue.use(VueRouter);
let router = new VueRouter();
let routerMap = {
	home: {
		name: 'home',
		path: '/home/:page'
	},
	archives: {
		name: 'archives',
		path: '/archives'
	},
	tags: {
		name: 'tags',
		path: '/tags'
	},
	about: {
		name: 'about',
		path: '/about'
	},
};
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
	}
});

router.redirect({
	'*': '/home/1'
});
router.routerMap = routerMap;

export default router;