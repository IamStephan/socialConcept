<template>
	<div class="component">
		<button @click="main.RemoveComp(index)">Close</button>
		<div class="profile">
			<div class="profile-header">
				<div class="avatar"></div>
				<h1>{{fullname}}</h1>
				<div>@{{username}}</div>
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
				<div class="item" 
					:class="{active: profileView == 'settings'}" 
					@click="profileView = 'settings'"
					v-if="isMe">
					Settings
				</div>
			</div>
			<div class="profile-body">
				<div class="feed" v-if="profileView == 'posts'">
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

				<div class="settings" v-if="profileView == 'settings' && isMe">
					<div class="group">
						<div class="header">Personal</div>
						<div class="setting">
							<label>Privacy</label>
							<div class="button-group">
								<button :class="{active: privacy == 'public'}" @click="privacy = 'public'">Public</button>
								<button :class="{active: privacy == 'private'}" @click="privacy = 'private'">Private</button>
							</div>
						</div>
						
						<div class="setting">
							<label>Details</label>
							<div class="input-group">
								<input type="" v-model="firstname">
								<input type="" v-model="lastname">
								<div class="button-group">
									<button>Save</button>
								</div>
							</div>
						</div>	

						<div class="setting">
							<label>Password</label>
							<div class="button-group">
								<button>Change</button>
							</div>
						</div>
					</div>
					<div class="group">
						<div class="header">Layout Control</div>
						<div class="setting">
							<label>Initial Views</label>
							<div class="select-control">
								<div class="item-list">
									<label>Available</label>
									<div class="item" 
											v-for="(view,index) in availableViews"
											@click="selectedViews.push(view); availableViews.splice(index, 1)">
										{{view.name}}
									</div>
								</div>
								<div class="item-list">
									<label>Selected</label>
									<div class="item" 
											v-for="(view,index) in selectedViews"
											@click="availableViews.push(view); selectedViews.splice(index, 1)">
										{{view.name}}

									</div>
									<div class="item" v-if="selectedViews.length == 0">(Default)</div>
								</div>
								
							</div>
							<div class="button-group">
								<label>Set setting as:</label>
								<button>Global</button>
								<button>Local</button>
							</div>
						</div>

						<div class="setting">
							<label>Max Views</label>
							<input type="number" min="1" :value="main.maxViews" id="mxvws">
							<div class="button-group">
								<label>Set setting as:</label>
								<button>Global</button>
								<button @click="setMaxViews()">Local</button>
							</div>
						</div>
					</div>
					<div class="group">
						<div class="header">Theme</div>
						<div class="setting">
							<label>Main Color</label>
							<div class="button-group">
								<button>Red</button>
								<button>Green</button>
								<button>Blue</button>
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

				//layout Controll
				availableViews:[{id:1,name:'Home (feed)'},{id:2,name:'My profile'},{id:3, name:'New post'}],
				selectedViews:[]
				
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
			setMaxViews:function() {
				var value = $('#mxvws').val();
				if (value < 1) {
					value = 1;
				}
				setCookie('settingMaxViews', value, 365);
				main.maxViews = value;

				this.checkViews();
			},
			checkViews:function() {
				if (main.viewList.length > main.maxViews) {
					main.viewList.pop();
					this.checkViews();
				}
			}
		}
	}
</script>