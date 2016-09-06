const util = require('../../common/util');
const ObjectId = require('mongodb')
	.ObjectId;
const Promise = require('bluebird');
/* global DBs */
let instance = null,
	flag = true,
	articles = null,
	tags = null,
	archive = null;

setTimeout(() => {
	articles = DBs.blog.collection('articles');
	archive = DBs.blog.collection('archive');
	tags = DBs.blog.collection('tags');
}, 5000);

// 又一个非常乱的

function ArticleService() {
	if (flag) {
		throw new Error(
			'Use ArticleService.getInstance to get an instance of ArticleService.');
	}
	let self = this instanceof ArticleService ? this : Object.create(
		ArticleService.prototype);

	if (!util.isFunction(self.getArticleById)) {
		ArticleService.prototype.getArticleById = function (id) {
			try {
				let query = {
					_id: new ObjectId(id)
				};
				return articles.findOne(query);
			} catch (err) {
				return Promise.resolve(false);
			}
		};
	}

	if (!util.isFunction(self.upsert)) {
		ArticleService.prototype.upsert = function (article) {
			// article.views = 0;
			let upsertArticle = null,
				findArchive = null,
				findTags = null,
				upsertArchive = null,
				upsertTag = null;
			// 不用upsert是因为查询条件是_id会自动插一个null的_id
			if (!article.id) {
				let date = new Date();
				article.timeStamp = date.getTime();
				article.year = date.getFullYear();
				article.month = date.getMonth() + 1;
				article.day = date.getDate();
				upsertArticle = articles.insertOne(article);
				let queryArchive = {
					year: article.year,
					month: article.month
				};
				findArchive = archive.findOne(queryArchive);
				findTags = new Promise(function (resolve, reject) {
					tags.find()
						.toArray((err, rst) => {
							let addItems = [],
								updateItems = [],
								all = rst;
							if (rst.length) {
								article.tags.forEach((item, index) => {
									let flag = true;
									for (let key in rst) {
										if (rst[key].name === item) {
											flag = false;
											updateItems.push({
												name: item,
												titles: rst[key].titles
											});
										}
									}
									if (flag) {
										addItems.push(item);
									}
								});
							} else {
								addItems = article.tags;
							}

							resolve({
								all,
								addItems,
								updateItems
							});
						});
				});
				return Promise.all([upsertArticle, findArchive, findTags])
					.then(function ([rst0, rst1, rst2]) {
						if (!rst0.insertedCount) {
							return 0;
						}
						if (!rst1) {
							upsertArchive = archive.insertOne({
									year: article.year,
									month: article.month,
									posts: [{
										title: article.title,
										id: rst0.insertedId
									}]
								})
								.then(rst => rst.insertedCount);
						} else {
							let query = {
								_id: rst1._id
							};
							let posts = rst1.posts;
							posts.push({
								title: article.title,
								id: rst0.insertedId
							});
							upsertArchive = archive.updateOne(query, {
									$set: {
										posts
									}
								})
								.then(rst => rst.modifiedCount);
						}

						let bulk = tags.initializeOrderedBulkOp();
						let data = {
							title: article.title,
							id: rst0.insertedId
						};
						for (let key in rst2.updateItems) {
							rst2.updateItems[key].titles.push({
								title: article.title,
								id: rst0.insertedId
							});
							bulk.find({
									name: rst2.updateItems[key].name
								})
								.updateOne({
									$set: {
										titles: rst2.updateItems[key].titles
									}
								});
						}
						for (let key in rst2.addItems) {
							bulk.insert({
								name: rst2.addItems[key],
								titles: [{
									title: article.title,
									id: rst0.insertedId
								}]
							});
						}
						upsertTag = new Promise((resolve, reject) => {
							bulk.execute(function (err, rst) {
								if (err) {
									reject(0);
								} else {
									resolve(1);
								}
							});
						});
						return Promise.all([upsertArchive, upsertTag])
							.then(([count0, count1]) => count0 & count1);
					});
			} else {
				try {
					let id = new ObjectId(article.id);
					let queryArticle = {
						_id: id
					};
					upsertArticle = articles.updateOne(queryArticle, {
							$set: article
						})
						.then(rst => rst.matchedCount);

					upsertArchive = new Promise(function (resolve, reject) {
						archive.find({
								'posts.id': id
							})
							.toArray(function (err, data) {
								// 一篇文章只应该同时存在于一个月份之中
								if (data.length != 1) {
									resolve(0);
									return;
								}
								let posts = data[0].posts;
								for (let key in posts) {
									if (posts[key].id.toString() === article.id) {
										posts[key].title = article.title;
										break;
									}
								}
								let query = {
									year: data[0].year,
									month: data[0].month
								};
								let temp = archive.updateOne(query, {
										$set: data[0]
									})
									.then(rst => rst.matchedCount);
								resolve(temp);
							});
					});

					let addOrUpdateTag = new Promise(function (resolve, reject) {
						tags.find()
							.toArray(function (err, data) {
								let bulk = tags.initializeOrderedBulkOp();
								let mtags = article.tags;
								let hasOperation = false;

								for (let k in mtags) {
									let addNewTag = true;
									for (let kk in data) {
										let item = data[kk];
										let titles = item.titles;
										if (mtags[k] === item.name) {
											let hasArticle = false;
											addNewTag = false;
											for (let kkk in titles) {
												if (titles[kkk].id.toString() === article.id) {
													hasArticle = true;
												}
											}
											if (!hasArticle) {
												titles.push({
													title: article.title,
													id: id
												});
												hasOperation = true;
												bulk.find({
														name: item.name
													})
													.updateOne({
														$set: item
													});
											}
										}
									}
									if (addNewTag) {
										hasOperation = true;
										bulk.insert({
											name: mtags[k],
											titles: [{
												title: article.title,
												id: id
											}]
										});
									}
								}

								if (hasOperation) {
									bulk.execute(function (err, rst) {
										if (err) {
											reject(0);
										} else {
											resolve(1);
										}
									});
								} else {
									resolve(1);
								}

							});
					});

					let rmOrUpdateTag = new Promise(function (resolve, reject) {
						tags.find({
								'titles.id': id
							})
							.toArray(function (err, data) {
								let bulk = tags.initializeOrderedBulkOp();
								let mtags = article.tags;
								let hasOperation = false;

								for (let k in data) {
									let item = data[k];
									let isRmArticle = true;
									for (let kk in mtags) {
										if (mtags[kk] === item.name) {
											let titles = item.titles;
											isRmArticle = false;
											for (var kkk in titles) {
												if (titles[kkk].id.toString() === article.id) {
													titles[kkk].title = article.title;
												}
											}
											hasOperation = true;
											bulk.find({
													name: item.name
												})
												.updateOne({
													$set: item
												});
										}
									}
									if (isRmArticle) {
										let titles = item.titles;
										if (titles.length === 1) {
											hasOperation = true;
											bulk.find({
													name: item.name
												})
												.remove();
										} else {
											let index = null;
											for (let key in titles) {
												if (titles[key].id.toString() === article.id) {
													index = key;
												}
											}
											titles.splice(index, 1);
											bulk.find({
													name: item.name
												})
												.updateOne({
													$set: item
												});
										}
									}
								}
								if (hasOperation) {
									bulk.execute(function (err, data) {
										if (err) {
											reject(0);
										} else {
											resolve(1);
										}
									});
								} else {
									resolve(1);
								}

							});
					});
					return Promise.all([upsertArticle, upsertArchive, addOrUpdateTag,
							rmOrUpdateTag
						])
						.then(function ([rst0, rst1, rst2, rst3]) {
							console.log(rst0);
							return rst0 & rst1 & rst2 & rst3;
						});
				} catch (err) {
					upsertArticle = Promise.resolve(2);
				}
			}

			// upsertArchive = archive.findOne(queryArchive)
			// 	.then(rst => {
			// 		if (!rst) {
			// 			archive.insertOne({

			// 			});
			// 		}
			// 	});

		};
	}

	if (!util.isFunction(self.removeArticleById)) {
		ArticleService.prototype.removeArticleById = function (idStr) {
			try {
				let id = new ObjectId(idStr);
				let query = {
					_id: id
				};
				let rmArticle = articles.remove(query)
					.then(rst => rst.result.ok);
				let updateArchive = archive.findOne({
						'posts.id': id
					})
					.then(data => {
						let posts = data.posts;
						if (posts.length === 1) {
							return archive.remove({
									year: data.year,
									month: data.month
								})
								.then(rst => rst.result.ok);
						}
						for (let key in posts) {
							if (posts[key].id.toString() === idStr) {
								posts.splice(key, 1);
								break;
							}
						}
						return archive.updateOne({
								'posts.id': id
							}, {
								$set: data
							})
							.then(rst => rst.matchedCount);
					});

				let updateTags = new Promise(function (resolve, reject) {
					tags.find({
							'titles.id': id
						})
						.toArray(function (err, data) {
							let bulk = tags.initializeOrderedBulkOp();
							let hasOperation = false;
							for (let key in data) {
								let titles = data[key].titles;
								if (titles.length === 1) {
									hasOperation = true;
									bulk.find({
											name: data[key].name
										})
										.deleteOne();
								} else {
									for (let k in titles) {
										if (titles[k].id.toString() === idStr) {
											titles.splice(k, 1);
											break;
										}
									}
									hasOperation = true;
									bulk.find({
											name: data[key].name
										})
										.updateOne({
											$set: data[key]
										});
								}
							}
							if (hasOperation) {
								bulk.execute(function (err, rst) {
									if (err) {
										resolve(0);
									} else {
										resolve(1);
									}
								});
							} else {
								resolve(1);
							}
						});
				});
				return Promise.all([rmArticle, updateArchive, updateTags])
					.then(([rst0, rst1, rst2]) => {
						return rst0 & rst1 & rst2;
					});
			} catch (err) {
				return Promise.resolve(0);
			}
		};
	}
	flag = false;
	return self;
}

ArticleService.getInstance = function () {
	if (!instance) {
		flag = false;
		instance = new ArticleService();
	}
	return instance;
};

module.exports = ArticleService;