import routerMap from './routerMap';
export default {
	defaultLogo: 'logo',
	blogName: '0x45E0',
	blogIntro: '//无可奉告',
	summaryLimit: 200,
	perPageLimit: 5,
	pageCount: 10,
	navList: [{
		iconClass: 'icon-home',
		content: 'Home',
		routeName: routerMap.home.name
	}, {
		iconClass: 'icon-folder-open',
		content: 'Archives',
		routeName: routerMap.archives.name
	}, {
		iconClass: 'icon-price-tag',
		content: 'Tags',
		routeName: routerMap.tags.name
	}, {
		iconClass: 'icon-user',
		content: 'About',
		routeName: routerMap.about.name
	}]
};