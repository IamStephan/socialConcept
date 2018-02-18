<template>
	<div class="component comp">
		<button @click="main.RemoveComp(index)">Close</button>
		<button @click="main.ViewComp('newPost')" v-if="index != 0">Move to top</button>
		<h1>New Post</h1>

		<div class="post">
			<div class="new post">
				<textarea class="input" placeholder="What's on your mind?" rows="3"></textarea>
				
			</div>
			<div class="options">
				<button>Video</button>
				<button>Photo</button>	
			</div>
		</div>

		<div class="post buttons">
			<button @click="Post(index)">Post</button>
			<button @click="main.RemoveComp(index,'home')">Post and View</button>
		</div>
	</div>
</template>

<script>
	module.exports={
		mixins:[component_mixins, gen_mixins],
		methods:{
			Post:function(index) {
				if (main.viewList.length < 2) {
					main.RemoveComp(index,'home')
				} else {
					main.RemoveComp(index)
				}
			}
		}
	}
</script>