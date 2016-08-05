import Vue from 'vue';
import VueRouter from 'vue-router';
import articleAside from '../components/aside/aside';
Vue.use(VueRouter);
let router = new VueRouter();
router.HOME = 'home';
router.ACHIVES = 'achives';
router.TAGS = 'tags';
router.ABOUT = 'about';
router.map({
	'/home/:page': {
		name: router.HOME,
		component: articleAside
	},
	'/achives': {
		name: router.ACHIVES,
		component: articleAside
	},
	'/tags': {
		name: router.TAGS,
		component: articleAside
	},
	'/about': {
		name: router.ABOUT,
		component: articleAside
	}
});

router.redirect({
	'*': '/home/1'
});

export default router;