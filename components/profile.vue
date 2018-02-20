<template>
	<div class="component comp">
		<button @click="main.RemoveComp(index)">Close</button>
		<button @click="main.ViewComp('profile')" v-if="index != 0">Move to top</button>
		<div class="profile">
			<div class="profile-header">
				<div class="avatar"></div>
				<h1>{{fullname}}</h1>
				<div>@{{username}}</div>
				<div class="button-group">
					<button @click="main.ViewComp('connections')">Connections</button>
					<button>Followers</button>
				</div>
			</div>
			<div class="profile-nav">
				<div class="item" 
					:class="{active: profileView == 'posts'}" 
					@click="profileView = 'posts'">
					Posts
				</div>
				<div class="item" 
					:class="{active: profileView == 'notifications'}" 
					@click="profileView = 'notifications'"
					v-if="isMe">
					Notifications
				</div>
			</div>
			<div class="profile-body">
				<div class="feed" v-if="profileView == 'posts'">
					<div class="tile" v-for="post in profilePosts">
							<div class="tile-header">
								<div class="tile-avatar"></div>
								<div class="tile-head-info">
									<div>{{fullname}}</div>
									<div>@{{username}}</div>
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

					<div class="notifications" v-if="profileView == 'notifications'">
						<div class="noti" v-for="n in 10">
							<div class="message">{{n}}</div>
							<div class="action">
								<button>Close</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="profile-footer"></div>
		</div>
			
	</div>
</template>

<script>
	module.exports={
		mixins:[component_mixins, gen_mixins],
		data:function() {
			return {
				username:'theDuwg',
				firstname:'Stephan',
				lastname:'Burger',
				privacy: 'public',
				isMe:true,

				profileView:'posts',
			}
		},
		computed:{
			profileKey:function() {
				return main.compKey.profile
			},
			fullname:function() {
				return this.firstname + ' ' + this.lastname
			}
		},
		watch:{
			profileKey:function() {
				alert('voker verander!!');
				main.ViewComp('profile');
			}
		},
		methods:{
			
		}
	}
</script>