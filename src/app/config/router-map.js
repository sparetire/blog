const post = require('../controller/post');
const removeArticle = require('../controller/remove-article');
const login = require('../controller/login');
const backstage = require('../controller/backstage');
const addUpdateArticle = require('../controller/add-update-article');
const allTags = require('../controller/all-tags');
const authorize = require('../controller/authorize');
const captcha = require('../controller/captcha');
const tags = require('../controller/tags');
const articles = require('../controller/articles');
const archives = require('../controller/archives');
const about = require('../controller/about');
module.exports = {
	articles: {
		name: 'articles',
		path: '/articles',
		controller: articles()
	},
	archives: {
		name: 'archives',
		path: '/archives',
		controller: archives()
	},
	about: {
		name: 'about',
		path: '/about',
		controller: about()
	},
	login: {
		name: 'login',
		path: '/login',
		controller: login()
	},
	backstage: {
		name: 'backstage',
		path: '/backstage',
		controller: backstage()
	},
	allTags: {
		name: 'allTags',
		path: '/alltags',
		controller: allTags()
	},
	captcha: {
		name: 'captcha',
		path: '/captcha',
		controller: captcha()
	},
	authorize: {
		name: 'authorize',
		path: '/authorize',
		controller: authorize()
	},
	post: {
		name: 'post',
		path: '/post/:id',
		method: 'get',
		controller: post()
	},
	addUpdateArticle: {
		name: 'addUpdateArticle',
		path: '/addupdate',
		controller: addUpdateArticle()
	},
	removeArticle: {
		name: 'removeArticle',
		path: '/removearticle',
		controller: removeArticle()
	},
	tags: {
		name: 'tags',
		path: '/tags',
		controller: tags()
	}
};