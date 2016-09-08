import routerMap from './router-map';
export default {
	defaultLogo: 'logo',
	blogName: '掏空男孩',
	blogIntro: '// TKBOY (没有s',
	summaryLimit: 200,
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
		iconClass: 'icon-user',
		content: 'About',
		routeName: routerMap.about.name
	}]
};