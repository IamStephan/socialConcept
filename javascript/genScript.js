$(document).ready(function() {
	init();
});

var main, bus;

var profilePosts=[
	{id:1, type:'text', body:'Going to the park...', likes:30}
];

var feedPosts=[
	{id:1, fullname:'Sannie Kak', username:'poopMain', type:'text', body:'You know when you fart and you just cant even', likes:30},
	{id:2, fullname:'Kak Sannie', username:'doggyManner', type:'text', body:'When you do it with yo dog it aint so bad...', likes:4},
	{id:3, fullname:'Tyler Swift', username:'Tailies', type:'image', body:'Ugh, cant believe im living here', url:'http://localhost/social/1.jpg', likes:72},
	{id:4, fullname:'Leo Da vinci', username:'Oscar', type:'text', body:'Still waiting bitches', likes:45},
	{id:5, fullname:'Bradley Cooper', username:'iqMate', type:'text', body:'Just one more, i promise.....', likes:45},
	{id:6, fullname:'Lucifer Something', username:'666', type:'text', body:'HI there, :) ......', likes:45},
	{id:7, fullname:'Katnis Mouw', username:'6plus9equels15', type:'text', body:'Ima be a pop star', likes:-9999},
	{id:8, fullname:'katty pink', username:'PinkP', type:'text', body:'I like pink', likes:45},
	{id:9, fullname:'Fullname', username:'Username', type:'text', body:'This is a post', likes:45},
	{id:10, fullname:'Dustin Cant', username:'catEven', type:'text', body:'I cant even', likes:45}
];

var component_mixins = {
	props:['index'],
	mounted:function() {
		this.$nextTick(function() {
			bus.$emit('load')
		})
	}
};

var gen_mixins={
	mounted:function() {
		
	}
};

function init() {
	bus = new Vue();

	main = new Vue({
		el:'#main',
		data:{
			viewList:[],

			sidebar:true,

			compKey:{
				profile:1,
				group:null,
				post:null
			},

			loadingComps:true,

			//Global settings
			maxViews:null,
			initialViews:[]
		},
		methods:{
			ViewComp:function(comp) {
				
				$('body').scrollTop(0);
				for (var i = this.viewList.length - 1; i >= 0; i--) {
					if (this.viewList[i] == comp) {
						var listItem = this.viewList[i];
						this.viewList.splice(i, 1);
						this.viewList.unshift(listItem);
						return;
					}
				}

				this.loadingComps = true;
				if (this.viewList.length >= this.maxViews) {
					this.viewList.pop();
					this.viewList.unshift(comp);
					this.loading = true;
				} else {
					this.viewList.unshift(comp);
					this.loading = true;
				}
			},
			RemoveComp:function(index, newView) {
				
				if (this.viewList.length == 1) {
					if (newView != null) {
						this.ViewComp(newView);
					}
				} else {
					this.viewList.splice(index, 1);
					if (newView != null) {
						this.ViewComp(newView);
					}
				}
				
			},
			Sidebar:function() {
				if (window.innerWidth >= 1060) {
					return true;
					alert(window.innerWidth)
				} else {
					return false;
					alert(window.innerWidth)
				}
			}
		},
		components:{
			/*
				planned Components
				===================
					-->profile
					-->feed
					-->groups
					-->login/reg
					-->New post (just text)
			*/
			sidebar:httpVueLoader('./components/sidebar.vue'),
			topbar:httpVueLoader('./components/topbar.vue'),

			//internal components
			home:httpVueLoader('./components/home.vue'),
			profile:httpVueLoader('./components/profile.vue'),
			group:httpVueLoader('./components/group.vue'),
			newPost:httpVueLoader('./components/newPost.vue'),
			viewPost:httpVueLoader('./components/viewPost.vue'),
			settings:httpVueLoader('./components/settings.vue')

		},
		mounted:function() {
			var _this = this;
			//initial views

			if (getCookie('settingInitViews') == "404") {
				//default
				this.initialViews.push('home')
			} else {
				var cookie = getCookie('settingInitViews');
				if (cookie.search(',') != -1) {
					var data = cookie.split(',');
					
					data.forEach(function(item) {
						_this.initialViews.unshift(item);
					})
				} else {
					this.ViewComp(cookie);
				}
			}

			//maxViews
			if (getCookie('settingMaxViews') == '404') {
				//default
				this.maxViews = 3;
			} else {
				this.maxViews = getCookie('settingMaxViews');
			}
			
			this.initialViews.forEach(function(item) {
				_this.ViewComp(item);
			});

			bus.$on('load', function() {
				_this.$nextTick(function() {
					if (_this.viewList.length <= $('.comp').length) {
						_this.loadingComps = false;
					}
				})
			});
			
		}
	})
}

function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1);
		if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
	}
	return "404";
}

function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays*24*60*60*1000));
	var expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
}