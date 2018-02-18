<template>
	<div class="topbar">
		<div class="buttons">
			<button @click="main.ViewComp('home')" :class="{disabled:main.viewList.includes('home')}">Home</button>
			<button @click="main.ViewComp('profile')" :class="{disabled:main.viewList.includes('profile')}">My Profile</button>
			<button @click="main.ViewComp('newPost')" :class="{disabled:main.viewList.includes('newPost')}">New Post</button>
			<button @click="main.ViewComp('settings')" :class="{disabled:main.viewList.includes('settings')}">Settings</button>
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