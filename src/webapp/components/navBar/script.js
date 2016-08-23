import logo from '../logo/logo';
import info from '../info/info';
import navList from '../navList/nav-list';
import snsList from '../snsList/sns-list';
import avatar from '../avatar/avatar';

export default {
	components: {
		logo,
		info,
		navList,
		snsList,
		avatar,
	},
	props: {
		routeName: {
			type: String,
			required: true
		},
		currentLogo: {
			type: String,
			default: 'logo'
		},
		navItems: {
			type: Array,
			default: []
		},
		navInfo: {
			type: Object,
			required: true
		}
	},
	watch: {
		routeName(newVal, oldVal) {
			let routeName = newVal;
			// logo 切换
			if (routeName === 'about') {
				this.currentLogo = 'avatar';
			} else {
				this.currentLogo = 'logo';
			}
		}
	}
};