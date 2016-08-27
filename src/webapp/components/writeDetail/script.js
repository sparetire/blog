// import mkdEditor from '../markdownEditor/markdown-editor';
import SimpleMDE from '../../lib/simplemde.min';
import MarkdownParseService from '../../services/MarkdownParseService';
import '../../style/simplemde.min.css';
import '../../style/font-awesome.min.css';
import dropdown from '../dropdown/dropdown';
import Promise from 'bluebird';
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

export default {
	components: {
		// mkdEditor,
		dropdown
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
			console.log('data');
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
				});
			} else if (this.$route.name === this.routerMap.modify.name) {
				let getArticle = APIs.getArticle.get({
						id: this.$route.params.id
					})
					.then(resp => resp.json()
						.post);
				this.modifyPromise = Promise.all([getTags, getArticle])
					.then(([tags, post]) => {
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
					});
				return this.modifyPromise;
			}
		}
	},
	data() {
		return {
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
		console.log('attached');
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
	}
};