// API配置文件可以有多份，作为不同业务的API配置
// 配置文件中每一项都是一个扩展的URL对象,多了一个method属性一个restful属性和一个type属性,
// type的值有json和form,大小写随意
// method可以是GET，POST，ALL，大小写随意
// 带查询字符串的，但method为POST的，查询字符串会被忽略
// URL对象见https://nodejs.org/api/url.html#url_url_parse_urlstring_parsequerystring_slashesdenotehost
let APIs = {
	// accessToken: {
	// 	href: '',
	// 	method: 'GET'
	// }
	// defaultHost作为默认主机配置，可选
	// 如果单个配置已有host，则覆盖defaultHost
	// 如果单个配置既有href又有host属性，以拼接完后最长的为准
	// 如果get的api中已带查询字符串，且又有参数，
	// 参数会被作为查询字符串拼接到已有的查询字符串之后
	defaultHost: 'localhost',
	// 请求参数page页数，limit每页个数
	// 返回页数，每页个数，文章总数，状态码
	getArticles: {
		// pathname: '/articles/?page=1&limit=5'
		pathname: '/articles'
	},
	// 根据条件查询一个文档，类似mongodb，post一个json对象作为条件
	getArticle: {
		pathname: '/post/{id}',
		restful: true
	},
	// localhost/archives?page=1&limit=5
	getArchives: {
		pathname: '/archives'
	},
	tags: {
		pathname: '/tags'
	},
	about: {
		pathname: '/about'
	}
};

module.exports = APIs;