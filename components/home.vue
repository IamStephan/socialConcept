<template>
	<div class="component comp">
		<button @click="main.RemoveComp(index)">Close</button>
		<button @click="main.ViewComp('home')" v-if="index != 0">Move to top</button>
		<h1>Home</h1>
		<div class="stream">
			<div class="filter">
				<button>Gab</button>
				<button>Notions</button>
				<button>Video</button>
			</div>
			<div class="tile" v-for="post in feedPosts">
				<div class="tile-header">
					<div class="tile-avatar"></div>
					<div class="tile-head-info">
						<div>{{post.fullname}}</div>
						<div>@{{post.username}}</div>
					</div>
				</div>
				<div class="tile-body">
					<div class="tile-body-content">
						<img :src="post.url" style="height:100px;" v-if="post.type == 'image'">
						<div>{{post.body}}</div>
					</div>
				</div>
				<div class="tile-footer">
					<div class="tile-footer-content">
						<button>Like {{post.likes}}</button>
						<button>Share</button>
						<button @click="main.compKey.post = post.id; main.ViewComp('viewPost')">Comments</button>
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