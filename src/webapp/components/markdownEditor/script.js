import SimpleMDE from '../../lib/simplemde.min';
import MarkdownParseService from '../../services/MarkdownParseService';
import '../../style/simplemde.min.css';
import '../../style/font-awesome.min.css';
/* global SimpleMDE */

export default {
	props: {
		content: {
			type: String,
			default: ''
		},
		timeout: {
			type: Number,
			default: 300
		}
	},
	data() {
		return {
			simplemde: null,
			handler: null,
			mkdParser: null,
			renderedContent: ''
		};
	},
	ready() {
		let simplemde = this.simplemde = new SimpleMDE({
			element: document.getElementById('simplemde-editor'),
			autoDownloadFontAwesome: false,
			spellChecker: false
		});
		this.mkdParser = MarkdownParseService.getInstance();
		simplemde.value(this.content);
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
};