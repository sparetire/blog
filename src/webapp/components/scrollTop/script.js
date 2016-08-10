import '../../style/fonticon.css';
import $ from 'jquery';

let isScrollingTop = false;
let lastScrollTop = 0;

$(window)
	.scroll(event => {
		let curScrollTop = $(window)
			.scrollTop();
		if (isScrollingTop && curScrollTop > lastScrollTop) {
			$(document.body)
				.stop();
		}
		lastScrollTop = curScrollTop;
	});


export default {
	props: {
		show: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		scrollToTop() {
			isScrollingTop = true;
			lastScrollTop = $(window)
				.scrollTop();
			$(document.body)
				.animate({
					scrollTop: 0
				}, 400, () => {
					isScrollingTop = false;
				});
		}
	}
};