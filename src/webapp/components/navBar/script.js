import logo from '../logo/logo';
import info from '../info/info';
import navList from '../navList/nav-list';
import snsList from '../snsList/sns-list';
import config from '../../config/webapp.conf';
export default {
	data: function () {
		return {
			navInfo: {
				name: config.blogName,
				intro: config.blogIntro
			},
			navItems: config.navList
		};
	},
	components: {
		logo,
		info,
		navList,
		snsList
	}
};