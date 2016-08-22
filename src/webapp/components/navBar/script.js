import logo from '../logo/logo';
import info from '../info/info';
import navList from '../navList/nav-list';
import snsList from '../snsList/sns-list';
import avatar from '../avatar/avatar';
import config from '../../config/webapp.conf';

export default {
	components: {
		logo,
		info,
		navList,
		snsList,
		avatar,
	},
	data() {
		return {
			currentLogo: config.defaultLogo,
			navInfo: {
				name: config.blogName,
				intro: config.blogIntro
			},
			navItems: config.navList,
		};
	},
	props: {
		path: {
			type: String,
			required: true
		}
	},
	watch: {
		path(newVal, oldVal) {
			let path = newVal;
			// logo 切换
			if (path === '/about') {
				this.currentLogo = 'avatar';
			} else {
				this.currentLogo = 'logo';
			}
		}
	}
};