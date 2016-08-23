import $ from 'jquery';
import APIConfig from './config/api.backstage.conf';
import API from '../common/APIs';
import RequestWrapper from './lib/RequestWrapper';
import app from './components/backstage/backstage';
import router from './config/router.backstage';
import ArticleService from './services/ArticleService';
/** init */
let APIs = new API(APIConfig, RequestWrapper);
window.APIs = APIs;
ArticleService.apiConfig({
	getArticles: APIs.getArticles,
	getArticle: APIs.getArticle,
	getTotal: {
		get: function (opts) {
			return Promise.resolve(43);
		}
	}
});
// MarkdownParseService.config({
// 	renderer: new marked.Renderer(),
// 	gfm: true,
// 	tables: true,
// 	breaks: false,
// 	pedantic: false,
// 	sanitize: true,
// 	smartLists: true,
// 	smartypants: false
// });
/** init */

$(() => {
	router.start(app, 'app');
});