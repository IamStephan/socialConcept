<template>
	<div class="component comp">
		<internavcomp :index='index' comp-name=''></internavcomp>
	</div>
</template>

<script>
	module.exports = {
		mixins:[component_mixins, gen_mixins]
	}
</script>