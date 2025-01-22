<template>
  <view class="content">
  </view>
</template>

<script>
export default {
  onShareAppMessage (res) {
    if (res.from === 'button') {// 来自页面内分享按钮
      console.log(res.target)
    }
    return {
      title: '自定义分享标题',
      path: '/pages/test/test?id=123'
    }
  },
  props: {
    shareData: {},
    shareShow: false,
  },
  data () {
    return {
      title: '',
      nvMask: {},
      nvImageMenu: {},
    }
  },
  watch: {
    shareShow () {
      this.nvMask.show()
      this.nvImageMenu.show()
    }
  },
  created () {
    let vm = this
    // console.log(vm.shareData,'88888888888888')
    // console.log(vm.shareData.Path)
    // console.log(JSON.parse(vm.shareData).Path)

    // #ifdef APP-PLUS
    // 如下为分享内容定义，可根据业务需求自行定义
    var strShareUrl = vm.shareData.Url
    var strShareTitle = vm.shareData.Title
    var strShareSummary = vm.shareData.Text
    var strShareImageUrl = vm.shareData.TitleImg
    var strSharePath = vm.shareData.Path
    var strShareId = vm.shareData.Id

    //以下为计算菜单的nview绘制布局，为固定算法，使用者无关关心
    // var screenWidth = plus.screen.resolutionWidth
    var screenWidth = ''
    //以360px宽度屏幕为例，上下左右边距及2排按钮边距留25像素，图标宽度55像素，同行图标间的间距在360宽的屏幕是30px，但需要动态计算，以此原则计算4列图标分别的left位置
    //图标下的按钮文字距离图标5像素，文字大小12像素
    //底部取消按钮高度固定为44px
    //TODO 未处理横屏和pad，这些情况6个图标应该一排即可
    var margin = 25,
      iconWidth = 55,
      icontextSpace = 5,
      textHeight = 12
    var left1 = margin / 360 * screenWidth
    var iconSpace = (screenWidth - (left1 * 2) - (iconWidth * 4)) / 3 //屏幕宽度减去左右留白间距，再减去4个图标的宽度，就是3个同行图标的间距
    if (iconSpace <= 5) { //屏幕过窄时，缩小边距和图标大小，再算一次
      margin = 15
      iconWidth = 40
      left1 = margin / 360 * screenWidth
      iconSpace = (screenWidth - (left1 * 2) - (iconWidth * 4)) / 3 //屏幕宽度减去左右留白间距，再减去4个图标的宽度，就是3个同行图标的间距
    }
    var left2 = left1 + iconWidth + iconSpace
    var left3 = left1 + (iconWidth + iconSpace) * 2
    var left4 = left1 + (iconWidth + iconSpace) * 3
    var top1 = left1
    var top2 = top1 + iconWidth + icontextSpace + textHeight + left1
    // 	console.log("screenWidth: " + screenWidth + " ;height: " + plus.screen.resolutionHeight);
    // 	console.log("left1: " + left1);
    // 	console.log("iconSpace: " + iconSpace);
    vm.nvMask = new plus.nativeObj.View("nvMask", { //先创建遮罩层
      top: '0px',
      left: '0px',
      height: '100%',
      width: '100%',
      backgroundColor: 'rgba(0,0,0,0.2)'
    });
    vm.nvMask.addEventListener("click", function () { //处理遮罩层点击
      vm.nvMask.hide();
      vm.nvImageMenu.hide();
    })
    vm.nvImageMenu = new plus.nativeObj.View("nvImageMenu", { //创建底部图标菜单
      bottom: '0px',
      left: '0px',
      height: '264px',
      width: '100%',
      backgroundColor: 'rgb(255,255,255)'
    });
    //绘制底部图标菜单的内容
    vm.nvImageMenu.draw([
      {
        tag: 'rect',//菜单顶部的分割灰线
        color: '#e7e7e7',
        position: {
          top: '0px',
          height: '1px'
        }
      },
      {
        tag: 'font',
        id: 'sharecancel',//底部取消按钮的文字
        text: '取消分享',
        textStyles: {
          size: '14px'
        },
        position: {
          bottom: '0px',
          height: '44px'
        }
      },
      {
        tag: 'rect',//底部取消按钮的顶部边线
        color: '#e7e7e7',
        position: {
          bottom: '45px',
          height: '1px'
        }
      },
      {
        tag: 'img',
        id: 'imgwechatfriend',
        src: 'https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/static/img/sharemenu/wechatfriend.png',
        position: {
          top: top1,
          left: left1,
          width: iconWidth,
          height: iconWidth
        }
      },
      {
        tag: 'font',
        id: 'fontwechatfriend',
        text: '微信好友',
        textStyles: {
          size: textHeight
        },
        position: {
          top: top1 + iconWidth + icontextSpace,
          left: left1,
          width: iconWidth,
          height: textHeight
        }
      },
      {
        tag: 'img',
        id: 'imgwechatmoments',
        src: 'https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/static/img/sharemenu/wechatmoments.png',
        position: {
          top: top1,
          left: left2,
          width: iconWidth,
          height: iconWidth
        }
      },
      {
        tag: 'font',
        id: 'fontwechatmoments',
        text: '微信朋友圈',
        textStyles: {
          size: textHeight
        },
        position: {
          top: top1 + iconWidth + icontextSpace,
          left: left2 - 2.5,
          width: iconWidth + 5,
          height: textHeight
        }
      },
      // {
      //   tag: 'img',
      //   id: 'imgweibo',
      //   src: 'https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/static/img/sharemenu/weibo.png',
      //   position: {
      //     top: top1,
      //     left: left3,
      //     width: iconWidth,
      //     height: iconWidth
      //   }
      // },
      // {
      //   tag: 'font',
      //   id: 'fontweibo',
      //   text: '微博',
      //   textStyles: {
      //     size: textHeight
      //   },
      //   position: {
      //     top: top1 + iconWidth + icontextSpace,
      //     left: left3,
      //     width: iconWidth,
      //     height: textHeight
      //   }
      // },
      // {
      //   tag: 'img',
      //   id: 'imgqq',
      //   src: 'https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/static/img/sharemenu/qq.png',
      //   position: {
      //     top: top1,
      //     left: left4,
      //     width: iconWidth,
      //     height: iconWidth
      //   }
      // },
      // {
      //   tag: 'font',
      //   id: 'fontqq',
      //   text: 'QQ',
      //   textStyles: {
      //     size: textHeight
      //   },
      //   position: {
      //     top: top1 + iconWidth + icontextSpace,
      //     left: left4,
      //     width: iconWidth,
      //     height: textHeight
      //   }
      // },
      // {
      //   tag: 'img',
      //   id: 'imgcopyurl',
      //   src: 'https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/static/img/sharemenu/copyurl.png',
      //   position: {
      //     top: top2,
      //     left: left1,
      //     width: iconWidth,
      //     height: iconWidth
      //   }
      // },
      // {
      //   tag: 'font',
      //   id: 'fontcopyurl',
      //   text: '复制',
      //   textStyles: {
      //     size: textHeight
      //   },
      //   position: {
      //     top: top2 + iconWidth + icontextSpace,
      //     left: left1,
      //     width: iconWidth,
      //     height: textHeight
      //   }
      // },
      // {
      //   tag: 'img',
      //   id: 'imgmore',
      //   src: 'https://pbw-uploadfile.oss-cn-beijing.aliyuncs.com/static/img/sharemenu/more.png',
      //   position: {
      //     top: top2,
      //     left: left2,
      //     width: iconWidth,
      //     height: iconWidth
      //   }
      // },
      // {
      //   tag: 'font',
      //   id: 'fontmore',
      //   text: '更多',
      //   textStyles: {
      //     size: textHeight
      //   },
      //   position: {
      //     top: top2 + iconWidth + icontextSpace,
      //     left: left2,
      //     width: iconWidth,
      //     height: textHeight
      //   }
      // },
      //如果想要增加更多按钮，请在这里继续添加，第二列还有2个空位
    ])
    vm.nvImageMenu.addEventListener("click", function (e) { //处理底部图标菜单的点击事件，根据点击位置触发不同的逻辑
      // console.log("click menu"+JSON.stringify(e));
      if (e.screenY > plus.screen.resolutionHeight - 44) { //点击了底部取消按钮
        console.log("quxiao")
        vm.nvMask.hide();
        vm.nvImageMenu.hide();
      } else if (e.clientX < 5 || e.clientX > screenWidth - 5 || e.clientY < 5) {
        //屏幕左右边缘5像素及菜单顶部5像素不处理点击
      } else { //点击了图标按钮
        var iClickIndex = -1 //点击的图标按钮序号，第一个图标按钮的index为0
        var iRow = e.clientY < (top2 - (left1 / 2)) ? 0 : 1
        var iCol = -1
        if (e.clientX < (left2 - (iconSpace / 2))) {
          iCol = 0
        } else if (e.clientX < (left3 - (iconSpace / 2))) {
          iCol = 1
        } else if (e.clientX < (left4 - (iconSpace / 2))) {
          iCol = 2
        } else {
          iCol = 3
        }
        if (iRow == 0) {
          iClickIndex = iCol
        } else {
          iClickIndex = iCol + 4
        }
        console.log("点击按钮的序号: " + iClickIndex);
        if (iClickIndex >= 0 && iClickIndex <= 5) { //处理具体的点击逻辑，此处也可以自行定义逻辑。如果增减了按钮，此处也需要跟着修改
          var strProvider = "", strScene = ""
          switch (iClickIndex) {
            case 0:
              strProvider = "weixin"
              strScene = "WXSceneSession"
              break;
            case 1:
              strProvider = "weixin"
              strScene = "WXSenceTimeline"
              break;
            // case 2:
            //   strProvider = "sinaweibo"
            //   break;
            // case 3:
            //   strProvider = "qq"
            //   break;
            // case 4:
            //   uni.setClipboardData({
            //     data: strShareUrl,
            //     complete() {
            //       uni.showToast({
            //         title: "已复制到剪贴板"
            //       })
            //     }
            //   })
            //   break;
            // case 5:
            //   plus.share.sendWithSystem({
            //     content: strShareUrl,
            //   })
            //   break;
          }
          // console.log(iClickIndex,"dianji")
          // 分享到微信小程序
          if (iClickIndex == 0) {

            uni.share({
              provider: 'weixin',
              scene: "WXSceneSession",
              type: 5,
              imageUrl: strShareImageUrl,
              title: strShareTitle,
              miniProgram: {
                id: 'gh_1101f9944639',
                path: strSharePath + '?' + strShareId,
                type: 1,
                webUrl: strShareUrl
              },
              success: function (res) {
                uni.hideNavigationBarLoading()
                console.log("success:" + JSON.stringify(res));
              },
              fail: function (err) {
                uni.hideNavigationBarLoading()
                console.log("fail:" + JSON.stringify(err));
                uni.showToast({
                  title: '分享失败，请稍后再试',
                  icon: 'none',
                  duration: 3000
                });
              }
            });
          }
          // // 朋友圈
          if (iClickIndex == 1) {
            uni.setStorageSync('shareData', vm.shareData);
            vm.nvImageMenu.hide()
            vm.nvMask.hide()
            uni.navigateTo({
              url: '/pagesA/canvasdrawer/canvasdrawer'
            });
          }
        }
      }
    })
    /* nvImageMenu.addEventListener("touchstart", function(e) {
      if (e.screenY > (plus.screen.resolutionHeight - 44)) {
        //TODO 这里可以处理按下背景变灰的效果
      }
    })
    nvImageMenu.addEventListener("touchmove", function(e) {
      //TODO 这里可以处理按下背景变灰的效果
      if (e.screenY > plus.screen.resolutionHeight - 44) {}
    })
    nvImageMenu.addEventListener("touchend", function(e) {
      //TODO 这里可以处理释放背景恢复的效果
    })
    */

    // vm.nvMask.show()
    // vm.nvImageMenu.show() //5+应支持从底部向上弹出的动画
    // #endif

  },
  methods: {
  },
  onBackPress () {
    //监听back键，关闭弹出菜单
    if (this.nvImageMenu.isVisible()) {
      this.nvImageMenu.hide()
      this.nvMask.hide()
      return true
    }
  },
  // onNavigationBarButtonTap(e) {
  //   switch (e.type) {
  //     case "share": //点击分享按钮
  //       //TODO 未处理h5，h5应调用qq浏览器等自带的share api，如果浏览器不自带share，那么分享图标不应该显示。或者从简的话，h5整个就不显示分享按钮
  //       // #ifdef APP-PLUS
  //       this.nvMask.show()
  //       this.nvImageMenu.show() //5+应支持从底部向上弹出的动画
  //       // #endif
  //       break;
  //   }
  // }
}
</script>

<style>
</style>
