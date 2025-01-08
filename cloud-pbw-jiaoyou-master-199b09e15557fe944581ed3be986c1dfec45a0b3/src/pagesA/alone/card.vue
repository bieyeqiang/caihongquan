<!--
 * @Author: Jin Biao
 * @Date: 2022-10-09 15:50:23
 * @LastEditTime: 2022-10-10 15:33:21
 * @Description: 用户卡片匹配
-->
<template>
  <view>
    <u-navbar title="匹配" leftIconSize="20" bgColor="rgba(0,0,0,0)" :autoBack="true"></u-navbar>
    <McUserCard></McUserCard>
  </view>
</template>

<script>
import McUserCard from './McUserCard/McUserCard.vue'
export default {
  components: {
    McUserCard
  }
}
</script>

<style lang="scss" scoped></style>
