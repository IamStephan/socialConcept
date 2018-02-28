<template>
	<div class="component comp">
		<internavcomp :index='index' comp-name='connections'></internavcomp>

		<h1>Connections</h1>

		<div class="profiles">
			<div class="tile" v-for="n in 10">
				<div class="tile-header">
					<div class="tile-avatar small-avatar"></div>
					<div class="tile-head-info">
						<div>Stephan Burger</div>
						<div>@ShetNigget</div>
					</div>
				</div>
				<div class="tile-footer">
					<button>Chat</button>
					<button>View</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	module.exports = {
		mixins:[component_mixins, gen_mixins],
		computed:{
			viewKey: function() {
				return main.compKey.connections;
			}
		},
		watch:{
			viewKey:function() {
				alert('voker verander!!');
			}
		}
	}
</script>