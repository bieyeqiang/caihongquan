<template>
  <view class="content">
    <canvas canvas-id="myCanvas" id="myCanvas" :style="{'width': '375px', 'height': '700px'}" />

  </view>
</template>

<script>
import Draw from '@/uni_modules/sakura-canvas/js_sdk/draw'
let draw = null
export default {
  data () {
    return {
      canvasId: 'myCanvas',
      img: '/static/logo.png',
      map: '/static/map.png',
      ggimg: ''
    }
  },

  onLoad () {
    this.created()
  },

  methods: {
    async upImg (filePath) {
      const result = await uniCloud.uploadFile({
        filePath: filePath,
        cloudPath: 'image/' + formatDate(new Date()) + '/' + Date.parse(new Date()) + '.jpg',
        onUploadProgress: e => {
          this.uploadProgress = Math.round(
            (e.loaded * 100) / e.total
          );
        }
      });
      if (!result.fileID) {
        this.$util.msg('头像上传失败');
        return;
      }
      const tempFiles = await uniCloud.getTempFileURL({
        fileList: [result.fileID]
      })
      console.log(tempFiles)
      const tempFile = tempFiles.fileList[0];
      if (tempFile.code === 'SUCCESS') {
        this.headImg = tempFile.download_url

      } else if (tempFile.tempFileURL) {
        this.headImg = tempFile.tempFileURL

      } else {
        this.$util.msg('头像上传失败');
      }
      // 日期
      function formatDate (date) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + m + '-' + d;
      };
    },
    async created () {
      let {
        canvasId,
        img, map
      } = this
      draw = new Draw({
        width: 110, // canvas(海报)的宽度,
        height: 110, // canvas(海报)的高度,
        canvasId, // canvasId 必填

        _this: this, // 传入this实例 必填
        drawDelayTime: 200, // 绘制海报时的延迟时间(单位毫秒),默认200,
        delayTime: 200, // 导出图片时的延迟时间(单位毫秒),默认200,
        fileType: 'png', // 导出图片的类型, 默认png 可选jpg, png
        quality: 1, // 导出图片的质量, 默认1 值范围0~1, 大于一都为1处理
        isCompressImage: true, // 绘制图片是是否进行压缩操作(h5不支持)(绘制图片也能填写该参数。层级大于当前) 默认不压缩
        drawTipsText: '绘制中...', // 绘制时的加载提示, 默认绘制中...
      })
      await draw.preDrawBackground('#red')

      let gg = await draw.createdSharePoster(({
        bgObj
      }) => {
        // 绘制图片
        let imageArray = [{
          type: 'image',
          src: img,
          drawType: 'arc',
          x: 0,
          y: 5,
          w: 100,
          h: 100,
          lineWidth: 10, // 图片边框大小
          color: '#FEA8D5', // 图片边框颜色
          windowAlign: 'center'
        },
        {
          type: 'triangle',
          x: 35,
          y: 125,
          w: 40,
          h: 20,
          color: '#FEA8D5',
          rotate: {
            deg: 180
          }
        }, {
          type: 'arc',
          x: 50,
          y: 135,
          r: 5,
          color: '#ffffff'
        },
        {
          type: 'arc',
          x: 48,
          y: 133,
          r: 7,
          isFill: false,
          color: '#FEA8D5'
        }, {
          type: 'arc',
          x: 46,
          y: 131,
          r: 9,
          isFill: false,
          color: '#FEA8D5'
        },]
        return imageArray
      })
      console.log(gg)
      this.upImg(gg.data)

    },
  }
}
</script>

<style lang="scss" scoped>
</style>
