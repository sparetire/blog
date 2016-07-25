import Vue from 'vue';
import nav from './components/navBar/nav-bar';
import $ from 'jquery';
import './style/common.css';
$(() => {
	new Vue({
		el: 'body',
		components: {
			navBar: nav
		}
	});
});