<template>
	<div class="component comp">
		<internavcomp :index='index' comp-name='viewPost'></internavcomp>
		<h1>Post {{main.compKey.post}}</h1>
		<div class="tile">
			<div class="tile-header">
				<div class="tile-avatar"></div>
				<div class="tile-head-info">
					<div>Stephan burger</div>
					<div>@tufff</div>
				</div>
			</div>
			<div class="tile-body">
				<div class="tile-body-content">
						<img src="http://localhost/social/1.jpg" style="height:130px;">
					<div>This is the shit</div>
				</div>
			</div>
			<div class="tile-footer">
				<div class="tile-footer-content">
					<button>Like</button>
					<button>Share</button>
					<button>Reply</button>
				</div>
			</div>
		</div>
		<div class="comments">
			<div class="compact-tile" v-for="n in 10">
				<div class="tile-header">
					<div class="tile-avatar"></div>
					<div class="tile-head-info">
						<div>Stephan burger</div>
						<div>@tufff</div>
					</div>
				</div>
				<div class="tile-body">
					<div class="tile-body-content">
						<div>{{n}}</div>
					</div>
				</div>
				<div class="tile-footer">
					<div class="tile-footer-content">
						<button>Like</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	module.exports={
		mixins:[component_mixins, gen_mixins],
		data:function() {
			return {
				postBody:'awe'
			}
		},
		computed:{
			viewKey:function() {
				return main.compKey.post
			}
		},
		watch:{
			viewKey:function() {
				main.Notify('Change detect','A new key has been selected for the viewPost component');
			}
		}
	}
</script>