<template>
	<div class="component">
		<button @click="main.RemoveComp(index)">Close</button>
		<button @click="main.ViewComp('<Component Name>')" v-if="index != 0">Move to top</button>
	</div>
</template>

<script>
	module.exports = {
		mixins:[component_mixins, gen_mixins]
	}
</script>