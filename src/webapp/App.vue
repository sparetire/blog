<template>
  <div id="container" class="app">
		<div id="cube">
			<div class="face" id="back">back</div>
			<div class="face" id="front">front</div>
			<div class="face" id="right">right</div>
			<div class="face" id="left">left</div>
			<div class="face" id="bottom">bottom</div>
			<div class="face" id="top">top</div>
		</div>
	</div>
</template>

<script>
	// import ComponentA from './components/ComponentA';
	// import ComponentB from './components/ComponentB';

	export default {
		// components: {
		// 	ComponentA,
		// 	ComponentB
		// }
	};
</script>

<style>
	.face {
		width: 200px;
		height: 200px;
		text-align: center;
		line-height: 200px;
		font-size: 38px;
		border: 1px solid #000;
		position: absolute;
		/*注意动画总是描述一个元素的一个状态到另一个状态的变化，
	与类名 id无关，也就是说只要两个选择器表示了同一个元素的不同状态，
	我们就可以给他动画，而不是一定要在同一个类名/id下指定两种不同状态才能用动画，
	所以这里我们在face中用了动画而另一个状态用了cube的hover*/
		transition-property: all;
		transition-duration: 3s;
	}
	/*这个container必须有，需要靠它来进行透视恢复正常的Z轴*/
	
	#container {
		width: 100%;
		height: 800px;
		/*透视一定要给到container而不是cube，
	如果要做个立体，我们只应该对最外面的作为参考系的元素做透视*/
		perspective: 1000px;
		transition-property: all;
		transition-duration: 3s;
	}
	
	#cube {
		/*宽高一定要给，因为透视中心旋转中心如果是默认，
  那就是50% 50%，是根据盒子宽高计算的*/
		width: 200px;
		height: 200px;
		margin: auto;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		position: absolute;
		/*参考系中每个需要内部是立体的元素都要给里面3d*/
		transform-style: preserve-3d;
		/*确定旋转中心，注意旋转向量是相对于旋转中心而不是盒子中心，
  所以这里让旋转中心和盒子中心重合*/
		transform-origin: 0 0;
		animation-name: cube;
		animation-duration: 4s;
		/*等六个面动画完了以后再整个开始旋转*/
		animation-delay: 12s;
		/*一直旋转下去*/
		animation-iteration-count: infinite;
		/*匀速旋转*/
		animation-timing-function: linear;
	}
	
	#cube:hover>#top {
		background: rgba(255, 0, 0, 0.5);
	}
	
	#cube:hover>#bottom {
		background: rgba(0, 255, 0, 0.5);
	}
	
	#cube:hover>#left {
		background: rgba(0, 0, 255, 0.5);
	}
	
	#cube:hover>#right {
		background: rgba(128, 128, 0, 0.5);
	}
	
	#cube:hover>#front {
		background: rgba(0, 148, 22, 0.5);
	}
	
	#cube:hover>#back {
		background: rgba(50, 150, 200, 0.5);
	}
	
	#cube:hover>top {
		background: rgba(200, 50, 150, 0.5);
	}
	
	#top {
		transform-origin: 0 0;
		animation-name: top;
		animation-duration: 2s;
		/*停留在动画最后一帧*/
		animation-fill-mode: forwards;
	}
	
	@keyframes top {
		to {
			transform: rotateX(90deg);
		}
	}
	
	#bottom {
		transform-origin: 0 200px;
		animation-name: bottom;
		animation-duration: 2s;
		animation-fill-mode: forwards;
		animation-delay: 2s;
	}
	
	@keyframes bottom {
		to {
			transform: rotateX(-90deg);
		}
	}
	
	#left {
		transform-origin: 0 0;
		animation-name: left;
		animation-duration: 2s;
		animation-fill-mode: forwards;
		animation-delay: 4s;
	}
	
	@keyframes left {
		to {
			transform: rotateY(-90deg);
		}
	}
	
	#right {
		transform-origin: 200px 0;
		animation-name: right;
		animation-duration: 2s;
		animation-fill-mode: forwards;
		animation-delay: 6s;
	}
	
	@keyframes right {
		to {
			transform: rotateY(90deg);
		}
	}
	
	#back {
		animation-name: back;
		animation-duration: 2s;
		animation-fill-mode: forwards;
		animation-delay: 8s;
	}
	
	@keyframes back {
		to {
			transform: rotateY(180deg);
		}
	}
	
	#front {
		animation-name: front;
		animation-duration: 2s;
		animation-fill-mode: forwards;
		animation-delay: 10s;
	}
	
	@keyframes front {
		to {
			transform: translateZ(200px);
		}
	}
	
	@keyframes cube {
		to {
			/*旋转向量111*/
			transform: rotate3d(1, 1, 1, 360deg);
		}
	}
</style>