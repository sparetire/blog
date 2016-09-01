const post = require('../controller/post');
module.exports = {
	login: {
		name: 'login',
		path: '/login'
	},
	backstage: {
		name: 'backstage',
		path: '/backstage'
	},
	allTags: {
		name: 'allTags',
		path: '/alltags'
	},
	post: {
		name: 'post',
		path: '/post/:id',
		method: 'get',
		controller: post()
	},
	addUpdateArticle: {
		name: 'addUpdateArticle',
		path: '/addupdate'
	}
};