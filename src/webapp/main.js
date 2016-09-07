import $ from 'jquery';
import APIConfig from './config/api.conf';
import API from '../common/apis';
import RequestWrapper from './lib/request-wrapper';
import app from './components/app/app';
import router from './config/router';
import ArticleService from './services/article-service';
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