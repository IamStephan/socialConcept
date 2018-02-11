<template>
	<div class="topbar">
		<div class="buttons">
			<button @click="main.ViewComp('home')">Home</button>
			<button @click="main.ViewComp('profile')">My Profile</button>
			<button @click="main.ViewComp('newPost')">New Post</button>
			<button @click="main.ViewComp('settings')">Settings</button>
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