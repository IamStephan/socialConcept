<template>
	<div class="topbar">
		<div class="buttons">
			<button @click="main.ViewComp('home')" v-if="!main.viewList.includes('home')">Home</button>
			<button @click="main.ViewComp('profile')" v-if="!main.viewList.includes('profile')">My Profile</button>
			<button @click="main.ViewComp('newPost')" v-if="!main.viewList.includes('newPost')">New Post</button>
			<button @click="main.ViewComp('settings')" v-if="!main.viewList.includes('settings')">Settings</button>
		</div>
	</div>
</template>

<style>
	.topbar{
		border: solid;
		padding: 5px;
		margin-bottom: 10px;
	}
	.buttons{
		display: flex;
		justify-content: space-between;
	}
</style>