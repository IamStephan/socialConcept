<template>
	<div class="component">
		<button @click="main.RemoveComp(index)">Close</button>
		<button @click="main.ViewComp('home')" v-if="index != 0">Move to top</button>
		<h1>Home</h1>
		<div class="feed">
			<div class="tile" v-for="n in 5">
				<div class="tile-header">
					<div class="tile-avatar"></div>
					<div class="tile-head-info">
						<div>Stephan burger</div>
						<div>@tufff</div>
					</div>
				</div>
				<div class="tile-body">
					<div class="tile-body-content">
						<img src="http://localhost/social/1.jpg" style="height:100px;">
						<div>This is the shit</div>
					</div>
				</div>
				<div class="tile-footer">
					<div class="tile-footer-content">
						<button>Like</button>
						<button>Share</button>
						<button @click="main.compKey.post = Math.floor(Math.random() * 100);main.ViewComp('viewPost')">Comments {{Math.floor(Math.random() * 100)}}</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	module.exports={
		mixins:[component_mixins, gen_mixins]
	}
</script>