<template>
  <view  >
    <web-view :webview-styles="webviewStyles" :src="option.url"></web-view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      webviewStyles: {
        progress: false,
      },
      option: "",
    };
  },
  onLoad (option) {
    this.option = option
  }
};
</script>


<style lang="scss"  >
::v-deep .m_container{
  display:none!important;
}
::v-deep  .m_container{
  display:none!important;
}
::v-deep .cm-header{
    display:none!important;
}
</style>
