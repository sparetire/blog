const TokenList = require('../lib/token-list');

function login(opst) {
	return function* (next) {
		let ctx = this;
		let tokenList = TokenList.getInstance();
		let token = ctx.cookies.get('token');
		if (yield tokenList.has(token)) {
			ctx.redirect('/');
		} else {
			yield this.render('login');
		}
		return;
	};
}

module.exports = login;