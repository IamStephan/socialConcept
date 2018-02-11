$(document).ready(function() {
	init();
});

var main;

var component_mixins = {
	props:['index']
};

var gen_mixins={};

function init() {
	console.log(getCookie('settingInitViews'))
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
				if (this.viewList.length >= this.maxViews) {
					this.viewList.pop();
					this.viewList.unshift(comp);
				} else {
					this.viewList.unshift(comp);
				}
			},
			RemoveComp:function(index, newView) {
				
				if (this.viewList.length == 1) {
					if (newView != null) {
						this.ViewComp(newView);
					}
					return;
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
			})
			
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