<template>
  <div class="star-wrapper">
  	<span v-for="(star,score) in starScore" :key="score" class='globalFontColor star iconfont' v-bind:class="[star === 'on' ? 'icon-five-star' : ( star === 'half' ? 'icon-unie615' : 'icon-xingxing')]" v-bind:style="{ fontSize: fontSize + 'rpx' }">&#xe641;</span>
  </div>
</template>

<script>
const LENGTH = 5
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'
export default {
  props: ['score', 'fontSize'],

  computed: {
    starScore () {
      let result = []
      let score = Math.floor(this.score * 2) / 2
      let hasDecimal = score % 1 !== 0
      let integer = Math.floor(score)
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON)
      }
      if (hasDecimal) {
        result.push(CLS_HALF)
      }
      while (result.length < LENGTH) {
        result.push(CLS_OFF)
      }
      return result
    }
  }
}
</script>

<style>
  .globalFontColor{
    color:#FDD149 ;
  }
.star-wrapper{
	box-sizing: border-box;
	width:280rpx;
	height:46rpx;
	line-height: 46rpx;
	display: inline-block;
	text-align: right;
}
.star-wrapper .star{
	font-size: 40rpx;
	margin:0 6rpx;
}
</style>
