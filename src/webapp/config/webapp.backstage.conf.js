import routerMap from './router-map.backstage';
export default {
	defaultLogo: 'logo',
	blogName: '掏空男孩',
	blogIntro: '// TKBOY (没有s',
	summaryLimit: 300,
	perPageLimit: 10,
	archivePageLimit: 5,
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