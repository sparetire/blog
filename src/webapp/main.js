import Vue from 'vue';
import VueRouter from 'vue-router';
import $ from 'jquery';
import app from './components/app/app';
import articleAside from './components/aside/aside';

Vue.use(VueRouter);
let router = new VueRouter();
router.map({
	'/': {
		component: articleAside
	},
	'/achives': {
		component: articleAside
	},
	'/tags': {
		component: articleAside
	},
	'/about': {
		component: articleAside
	}
});

$(() => {
	router.start(app, 'app');
});