<!--模板-->
<template>
  <div class="notList">
    <div>
      <image src="https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/image/empty/default.png" />
      <p>{{text}}</p>
    </div>
  </div>
</template>


<!--JS-->
<script>
export default {
  props: ['text'],
  data () {
    return {

    };
  }
};
</script>


<!--css样式-->
<style lang="scss" scoped>
.notList {
  width: 100%;
  height: 100%;
  line-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  // background: #fff;
  position: fixed;
  > div {
    height: 200px;
  }
  image {
    width: 400upx;
    height: 287upx;
  }
  p {
    text-align: center;
    padding: 10px 0;
    color: #c6c6c6;
  }
}
</style>
