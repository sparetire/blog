import $ from 'jquery';
import APIConfig from './config/api.backstage.conf';
import API from '../common/APIs';
import RequestWrapper from './lib/RequestWrapper';
import './style/login.scss';
/** init */
let APIs = new API(APIConfig, RequestWrapper);
window.APIs = APIs;

/** init */

$(() => {
	console.log('Loading');
});