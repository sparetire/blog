import $ from 'jquery';
import APIConfig from './config/api.backstage.conf';
import API from '../common/apis';
import RequestWrapper from './lib/request-wrapper';
import './style/login.scss';
/** init */
let APIs = new API(APIConfig, RequestWrapper);
window.APIs = APIs;

/** init */

$(() => {
	$('#captcha-img')
		.click(function () {
			this.src = `${APIs.captcha.url}?id=${(new Date()).getTime()}`;
		});
	// $('#lg-form')
	// 	.submit(function (event) {
	// 		event.preventDefault();
	// 	});
});