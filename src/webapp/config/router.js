import Vue from 'vue';
import VueRouter from 'vue-router';
import articleAside from '../components/aside/aside';
Vue.use(VueRouter);
let router = new VueRouter();
router.map({
	'/home/:page': {
		name: 'home',
		component: articleAside
	},
	'/achives': {
		name: 'achives',
		component: articleAside
	},
	'/tags': {
		name: 'tags',
		component: articleAside
	},
	'/about': {
		name: 'about',
		component: articleAside
	}
});

router.redirect({
	'*': '/home/1'
});

export default router;