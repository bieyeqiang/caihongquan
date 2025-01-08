<template>
	<view class="mescroll-empty" :class="{ 'empty-fixed': option.fixed }" :style="{ 'z-index': option.zIndex, top: option.top }">
		<jw-empty :type="option.type" :backgroundColor="option.backgroundColor"></jw-empty>
	</view>
</template>

<script>
	import mixEmpty from '@/components/jw-empty/jw-empty.vue'
	export default {
		components: {
			mixEmpty
		},
		props: {
			// empty的配置项: 默认为GlobalOption.up.empty
			option: {
				type: Object,
				default() {
					return {};
				}
			}
		}
	};
</script>

<style scoped lang="scss">
	
</style>