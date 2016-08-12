import tagFilter from '../tagFilter/tag-filter';
import tagFilterBar from '../tagFilterBar/tag-filter-bar';
import routerMap from '../../config/routerMap';

export default {
	components: {
		tagFilter,
		tagFilterBar
	},
	data() {
		return {
			tagList: [{
				name: 'Linux',
				value: 0
			}, {
				name: 'Security',
				value: 1
			}, {
				name: 'Javascript',
				value: 2
			}, {
				name: 'CSS',
				value: 3
			}, {
				name: 'HTML',
				value: 4
			}, {
				name: 'Linux',
				value: 0
			}, {
				name: 'Security',
				value: 1
			}, {
				name: 'Javascript',
				value: 2
			}, {
				name: 'CSS',
				value: 3
			}, {
				name: 'HTML',
				value: 4
			}, {
				name: 'Linux',
				value: 0
			}, {
				name: 'Security',
				value: 1
			}, {
				name: 'Javascript',
				value: 2
			}, {
				name: 'CSS',
				value: 3
			}, {
				name: 'HTML',
				value: 4
			}, {
				name: 'Linux',
				value: 0
			}, {
				name: 'Security',
				value: 1
			}, {
				name: 'Javascript',
				value: 2
			}, {
				name: 'CSS',
				value: 3
			}, {
				name: 'HTML',
				value: 4
			}],
			routeName: routerMap.tags.name
		};
	}
};