<template>
	<div class="component comp">
		<button @click="main.RemoveComp(index)">Close</button>
		<button @click="main.ViewComp('settings')" v-if="index != 0">Move to top</button>
		<div class="profile">
			<div class="profile-header">
				<div class="avatar"></div>
				<h1>{{fullname}}</h1>
			</div>
			<div class="profile-body">
				<div class="settings">
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
										{{view.alias}}
									</div>
								</div>
								<div class="item-list">
									<label>Selected</label>
									<div class="item" 
											v-for="(view,index) in selectedViews"
											@click="availableViews.push(view); selectedViews.splice(index, 1)">
										{{view.alias}}

									</div>
									<div class="item" v-if="selectedViews.length == 0">(Default)</div>
								</div>
								
							</div>
							<div class="button-group">
								<label>Set setting as:</label>
								<button>Global</button>
								<button @click="setInitViews()">Local</button>
							</div>
						</div>

						<div class="setting">
							<label>Max Views</label>
							<input type="number" min="1" max="7" :value="main.maxViews" id="mxvws">
							<div class="button-group">
								<label>Set setting as:</label>
								<button>Global</button>
								<button @click="setMaxViews()">Local</button>
							</div>
						</div>
						<div class="setting">
							<label>Component List</label>
							<input type="checkbox" min="1" max="7" :value="main.maxViews" id="mxvws">
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

				//layout Controll
				preset:'Default',
				availableViews:[
					{compName:'home',alias:'Home (feed)'},
					{compName:'profile',alias:'My profile'},
					{compName:'newPost', alias:'New post'}
				],
				selectedViews:[]
				
			}
		},
		computed:{
			fullname:function() {
				return this.firstname + ' ' + this.lastname
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

				this.UpdateViews();
			},
			UpdateViews:function() {
				if (main.viewList.length > main.maxViews) {
					main.viewList.pop();
					this.UpdateViews();
				}
			},
			setInitViews:function() {
				if (this.selectedViews.length < 1) {
					document.cookie = "settingInitViews=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
				} else {
					var initViewsCookie = '';
					for (var i = 0; i <= this.selectedViews.length - 1; i++) {
						if (initViewsCookie != '') {
							initViewsCookie = initViewsCookie + ',' + this.selectedViews[i].compName;
						} else {
							initViewsCookie = this.selectedViews[i].compName;
						}
					}
					setCookie('settingInitViews', initViewsCookie, 365);
				}
			},
			Setup:function() {
				console.log('ready');
				var _this = this;
				if (getCookie('settingInitViews') != "404") {
					var cookie = getCookie('settingInitViews');
					if (cookie.search(',') != -1) {
						var data = cookie.split(',');
						
						data.forEach(function(item) {
							for (var i = _this.availableViews.length - 1; i >= 0; i--) {
								if(_this.availableViews[i].compName == item){
									_this.selectedViews.push(_this.availableViews[i]);
									_this.availableViews.splice(i, 1);
								}
							}
						})
					} else {
						for (var i = this.availableViews.length - 1; i >= 0; i--) {
							if(this.availableViews[i].compName == cookie){
								this.selectedViews.push(this.availableViews[i]);
								this.availableViews.splice(i, 1);
							}
						}
					}
				}
			}
		},
		mounted:function() {
			var _this = this;
			this.$nextTick(function() {
				_this.Setup()
			});
		}
	}
</script>