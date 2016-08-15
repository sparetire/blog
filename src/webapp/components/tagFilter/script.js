import $ from 'jquery';
export default {
	methods: {
		tagClicked(index) {
			this.$dispatch('tagMatched', this.tagList[index]);
		}
	},
	props: {
		tagList: {
			type: Array,
			required: true
		},
		routeName: {
			type: String,
			required: true
		}
	},
	watch: {
		// 因为tagFilter组件不一定注册路由，为了模拟路由匹配
		// 需要在初次加载数据后和点击后都触发tagMatched事件
		// 不在ready中触发tagMatched是因为ready的时候组件还没有数据
		// 没有数据jq就无法取得dom，所以需要在数据注入组件后再用jq取dom
		tagList(newVal, oldVal) {
			this.$dispatch('tagMatched', this.tagList[$('.tag-item')
				.index($('.active-tag'))]);
		}
	}
};