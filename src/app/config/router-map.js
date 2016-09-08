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
		method: 'get',
		controller: articles()
	},
	archives: {
		name: 'archives',
		path: '/archives',
		method: 'get',
		controller: archives()
	},
	about: {
		name: 'about',
		path: '/about',
		method: 'get',
		controller: about()
	},
	login: {
		name: 'login',
		path: '/login',
		method: 'get',
		controller: login()
	},
	backstage: {
		name: 'backstage',
		path: '/backstage',
		method: 'get',
		controller: backstage()
	},
	allTags: {
		name: 'allTags',
		path: '/alltags',
		method: 'get',
		controller: allTags()
	},
	captcha: {
		name: 'captcha',
		path: '/captcha',
		method: 'get',
		controller: captcha()
	},
	authorize: {
		name: 'authorize',
		path: '/authorize',
		method: 'post',
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
		method: 'post',
		controller: addUpdateArticle()
	},
	removeArticle: {
		name: 'removeArticle',
		path: '/removearticle',
		method: 'post',
		controller: removeArticle()
	},
	tags: {
		name: 'tags',
		path: '/tags',
		method: 'get',
		controller: tags()
	}
};