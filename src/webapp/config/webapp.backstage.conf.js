import routerMap from './routerMap.backstage';
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
		routeName: routerMap.home.name,
		params: {
			page: 1
		}
	}, {
		iconClass: 'icon-folder-open',
		content: 'Archives',
		routeName: routerMap.archives.name,
		params: {
			page: 1
		}
	}, {
		iconClass: 'icon-price-tag',
		content: 'Tags',
		routeName: routerMap.tags.name
	}, {
		iconClass: 'icon-equalizer',
		content: 'Dashboard',
		routeName: routerMap.dashboard.name,
		params: {
			page: 1
		}
	}, {
		iconClass: 'icon-user',
		content: 'About',
		routeName: routerMap.about.name
	}]
};