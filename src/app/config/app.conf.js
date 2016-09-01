module.exports = {
	redis: {
		password: '123456'
	},
	mongodb: {
		default: {
			username: 'lusir',
			password: 'xjs406',
			host: 'localhost',
			port: '8588',
			minPollSize: 5,
			maxPollSize: 10
		},
		wechat: {
			dbName: 'wechat'
		},
		blog: {
			dbName: 'blog'
		}
	}
};