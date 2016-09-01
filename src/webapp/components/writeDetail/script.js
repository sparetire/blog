// import mkdEditor from '../markdownEditor/markdown-editor';
import SimpleMDE from '../../lib/simplemde.min';
import MarkdownParseService from '../../services/MarkdownParseService';
import '../../style/simplemde.min.css';
import '../../style/font-awesome.min.css';
import dropdown from '../dropdown/dropdown';
import loading from '../loading/loading';
import toast from '../toast/toast';
import Promise from 'bluebird';
import _ from 'lodash';
import NProgress from 'nprogress/nprogress';
import StatusCode from '../../../common/status-code';
import 'nprogress/nprogress.css';
/* global APIs */

// 非常乱。。
function init(ctx) {
	ctx.content = '';
	ctx.currentItem = null;
	ctx.tagsStr = '';
	ctx.author = '';
	ctx.title = '';
	ctx.dropDownItems = [];
}

function getTagsArray(tagsStr) {
	tagsStr = tagsStr.trim();
	tagsStr = tagsStr[0] === ',' ? tagsStr.slice(1) : tagsStr;
	tagsStr = tagsStr[tagsStr.length - 1] === ',' ? tagsStr.slice(0, tagsStr.length -
		1) : tagsStr;
	let array = tagsStr.split(',');
	return _.uniq(array);
}

export default {
	components: {
		// mkdEditor,
		dropdown,
		loading,
		toast
	},
	methods: {
		save() {
			let tags = getTagsArray(this.tagsStr);
			let data = {
				// id: this.$route.params.id
				title: this.title,
				author: this.author,
				tags: tags,
				content: this.content
			};
			this.showLoading = true;
			if (this.$route.name === this.routerMap.modify.name) {
				data.id = this.$route.params.id;
			}
			APIs.addUpdateArticle.post(data)
				.then(resp => resp.json())
				.then((rst) => {
					this.showLoading = false;
					this.toastContent = rst.description;
					this.showToast = true;
				});
		}
	},
	props: {
		router: {
			type: Object,
			required: true
		},
		routerMap: {
			type: Object,
			required: true
		}
	},
	events: {
		onDropdownChange([oldItem, newItem, newItemIndex]) {
			this.tagsStr += `${newItem.key},`;
		}
	},
	route: {
		data(transition) {
			NProgress.start();
			NProgress.inc(0.2);
			let getTags = APIs.allTags.get()
				.then(resp => resp.json()
					.tags);
			if (this.$route.name === this.routerMap.write.name) {
				init(this);
				return getTags.then(tags => {
					this.dropDownItems = tags.map((item, index, array) => {
						return {
							key: item,
							value: 0
						};
					});
					this.currentItem = 0;
					NProgress.inc(0.5);
					NProgress.done();
				});
			} else if (this.$route.name === this.routerMap.modify.name) {
				let getArticle = APIs.getArticle.get({
						id: this.$route.params.id
					})
					.then(resp => resp.json());
				this.modifyPromise = Promise.all([getTags, getArticle])
					.then(([tags, data]) => {
						if (data.status === StatusCode.OK) {
							let post = data.post;
							this.dropDownItems = tags.map((item, index, array) => {
								return {
									key: item,
									value: 0
								};
							});
							this.currentItem = 0;
							this.content = post.content;
							this.title = post.title;
							this.author = post.author;
							this.tagsStr = post.tags.join(',') + ',';
						} else {
							this.toastContent = data.description;
							this.showToast = true;
						}
						NProgress.inc(0.5);
						NProgress.done();
					});
				return this.modifyPromise;
			}
		}
	},
	data() {
		return {
			showLoading: false,
			showToast: false,
			toastContent: '',
			currentItem: null,
			modifyPromise: null,
			tagsStr: '',
			author: '',
			title: '',
			simplemde: null,
			handler: null,
			mkdParser: null,
			renderedContent: '',
			content: '',
			timeout: 300,
			dropDownItems: []
		};
	},
	attached() {
		if (!this.simplemde) {
			let simplemde = this.simplemde = new SimpleMDE({
				element: document.getElementById('simplemde-editor'),
				autoDownloadFontAwesome: false,
				spellChecker: false
			});
			this.mkdParser = MarkdownParseService.getInstance();
			simplemde.codemirror.on('change', () => {
				this.content = simplemde.value();
				clearTimeout(this.handler);
				setTimeout(() => {
					this.mkdParser.parse(this.content)
						.then(data => {
							this.renderedContent = data;
						});
				}, this.timeout);
			});
		}
		if (this.$route.name === this.routerMap.write.name) {
			this.simplemde.value('');
		} else if (this.$route.name === this.routerMap.modify.name) {
			this.modifyPromise.then(() => {
				this.simplemde.value(this.content);
			});
		}
	},
	detached() {
		this.showLoading = false;
	}
};