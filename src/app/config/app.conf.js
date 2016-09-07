module.exports = {
	appKeys: ['wTf852,./'],
	sessionTimeout: 300000,
	tokenSecret: 'sparetire',
	username: 'admin',
	password: '123',
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