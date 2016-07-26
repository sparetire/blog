import logo from '../logo/logo';
import info from '../info/info';
import navList from '../navList/nav-list';
import snsList from '../snsList/sns-list';
import config from '../../config/webapp.conf';
export default {
	data: function () {
		return {
			currentLogo: config.defaultLogo,
			navInfo: {
				name: config.blogName,
				intro: config.blogIntro
			},
			navItems: config.navList
		};
	},
	events: {
		navItemClick: function (msg) {
			if (msg.content === 'About') {
				// changeLogo();
				//route
			} else {
				//route
			}
		}
	},
	components: {
		logo,
		info,
		navList,
		snsList
	}
};