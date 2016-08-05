import $ from 'jquery';
import app from './components/app/app';
import router from './config/router';

$(() => {
	router.start(app, 'app');
});