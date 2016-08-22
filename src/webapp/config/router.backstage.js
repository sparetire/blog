import Vue from 'vue';
import VueRouter from 'vue-router';
import articleAside from '../components/aside/aside';
import article from '../components/article/article';
import archive from '../components/archive/archive';
import tags from '../components/tags/tags';
import tagList from '../components/tagList/tag-list';
import about from '../components/about/about';
import routerMap from './routerMap';


Vue.use(VueRouter);
let router = new VueRouter();
router.map({
	'/home/:page': {
		name: routerMap.home.name,
		component: articleAside
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
	// '/tags/:tag': {
	// 	name: routerMap.tag.name,
	// 	component: tags
	// },
	'/about': {
		name: routerMap.about.name,
		component: about
	},
	'/post/:id': {
		name: routerMap.articles.name,
		component: article
	}
});

router.redirect({
	'/archives': '/archives/1',
	'*': '/home/1'
});

export default router;