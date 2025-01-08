<template>
  <div class="wrap" v-bind:style="{ height: height + 'rpx', marginTop: margin + 'rpx', marginBottom: margin + 'rpx' }"></div>
</template>

<script>
export default {
  props: ['height', 'margin'],
}
</script>

<style>
.wrap{
	box-sizing: border-box;
	width:100%;
	/*background: #EAEEF7;*/
	background: #F5F5F5;
}

</style>
