// var Vue = require('vue');
// var App = require('./App.vue');
import Vue from 'vue';
import App from './App';
import $ from 'jquery';
$(() => {
	new Vue({
		el: 'body',
		components: {
			app: App
		}
	});
});