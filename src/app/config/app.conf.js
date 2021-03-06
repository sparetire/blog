module.exports = {
	appKeys: ['wTf852,./'],
	sessionTimeout: 300000,
	tokenSecret: 'sparetire',
	captchaRequestLimit: 15,
	loginRetryLimit: 8,
	username: 'admin',
	password: '123',
	redis: {
		password: '123456',
		port: 9588
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