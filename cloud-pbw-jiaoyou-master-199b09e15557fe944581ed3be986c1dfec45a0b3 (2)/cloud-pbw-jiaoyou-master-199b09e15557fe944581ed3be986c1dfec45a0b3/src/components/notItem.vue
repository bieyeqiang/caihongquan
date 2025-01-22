<!--模板-->
<template>
  <div id="notItem">
    <!--123-->
    <div class='ph-infoService-info-contnent'>
      <p style="display: flex;justify-content: center;width: 100%;height: 60px;align-items: center;">
        <span class="iconfont" style="font-size: 50px;color: #c6c6c6">&#xe689;</span>
      <p class='ph-infoService-info-contnent-text' style="font-size: 15px;color: #c6c6c6;text-align: center">{{text}}</p>
      </p>
    </div>
  </div>
</template>


<!--JS-->
<script>
  export default {
    props:['text'],
    data() {
      return {};
    }
  };
</script>


<!--css样式-->
<style lang="scss" scoped>
  .ph-infoService-info-contnent{
    color:#333;
    padding-left:40rpx;
  }
  .ph-infoService-info-contnent-text{
    font-size: 30rpx;
    line-height: 40rpx;
  }
</style>
