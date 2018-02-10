$(document).ready(function() {
	init();
});

var main;

var component_mixins = {
	props:['index']
};

var gen_mixins={
	mounted:function() {
		main.loading = false;
	}
};

function init() {
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

			loading:false
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
				if (this.viewList.length > 2) {
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
			viewPost:httpVueLoader('./components/viewPost.vue')
		},
		mounted:function() {
			var initView = "newPost"
			this.ViewComp(initView);
		}
	})
}