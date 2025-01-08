<template>
  <view style="border-top: 1px solid #ddd;">
    <view class="uni-uploader-body">
      <view class="uni-uploader__files">
        <view class="uni-uploader__input-box" v-if="adminShow">
          <view class="uni-uploader__input" @tap="addImg"></view>
        </view>
        <block v-for="(image, index) in imageList" :key="index">
          <view class="uni-uploader__file" style="position: relative;">
            <image class="uni-uploader__img" @longpress="edit(image._id)" mode="aspectFill" lazy-load :src="image.imgPath" :data-src="image.imgPath" @tap="previewImage"></image>
            <text class="iconfont del" v-if="adminShow" @click.stop="delBtn(image._id)">&#xe654;</text>
            <view v-if="image.secret" class="title4" @click.stop="edit(image._id)"><text>阅后即焚</text></view>
          </view>
        </block>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      imageList: [],
      option: "",
      adminShow: false,
    };
  },
  methods: {
    edit (id) {
      if (!this.adminShow) return
      uni.showActionSheet({
        itemList: ['普通照片', '阅后即焚'],
        success: async (res) => {
          const list = await this.$request("home", "editPhoto", {
            id: id,
            secret: res.tapIndex == 0 ? false : true
          });
          this.getList();
        },
        fail: (res) => { }
      });
    },
    delBtn (code) {
      uni.showModal({
        title: "提示",
        content: "确定要删除该照片吗？",
        success: async (res) => {
          if (res.confirm) {
            const del = await this.$request("home", "delPhoto", {
              photoId: code,
            });
            //console.log(del);
            if (del) {
              uni.showToast({
                title: "删除成功",
                icon: "success",
                duration: 1000,
              });
              // 获取列表
              this.getList();
            }
          } else if (res.cancel) {
            ////console.log('用户点击取消');
          }
        },
      });
    },
    previewImage: function (e) {
      var current = e.target.dataset.src;
      uni.previewImage({
        current: current,
        urls: this.imageList,
      });
    },
    async addImg () {
      // 上传照片
      let file = await this.cloudUploadFile(9)
      if (file == undefined) {
        return
      } else {
        uni.showLoading({
          title: '上传中...'
        });
      }
      file.fileUrl.forEach(async (item, index) => {
        const getImageLog = await this.$request("security", "imageDetection", {
          image: item
        });
        // console.log(getImageLog,'getImageLog')
        if (getImageLog.state == 0) {
          const add = await this.$request("home", "addPhoto", {
            photoAlbumId: this.option.code,
            imgPath: item,
          });
          uni.showToast({
            title: "上传成功",
            icon: "success",
            duration: 3000,
          });
          // 获取列表
          this.getList();
        } else {
          uni.showToast({
            title: "该图片涉嫌内容不适，请更换一个",
            icon: "none",
            duration: 3000,
          });
        }
      });

      // 获取列表
      this.getList();
    },
    // 获取列表
    async getList () {
      const res = await this.$request("home", "getPhotoList", {
        photoAlbumId: this.option.code,
      });
      //console.log(res);
      if (res) {
        this.imageList = res.data;
      }
    },
  },
  onLoad (option) {
    this.option = option;
    if (option.admin == "admin") {
      this.adminShow = true;
    } else {
      this.adminShow = false;
    }
  },
  onShow () {
    // 获取列表
    this.getList();
  },
};
</script>

<style lang="scss" scoped>
.title4 {
  width: 200rpx;
  height: 140rpx;
  position: absolute;
  top: -8rpx;
  left: -8rpx;
  overflow: hidden;
}
.title4::before {
  position: absolute;
  left: 124rpx;
  border-radius: 8rpx 8rpx 0 0;
  width: 16rpx;
  height: 8rpx;
  background: $grad;
  content: '';
}
.title4::after {
  position: absolute;
  left: 0;
  top: 124rpx;
  border-radius: 0 8px 8px 0;
  width: 8rpx;
  height: 16rpx;
  background: $grad;
  content: '';
}
.title4 text {
  display: inline-block;
  text-align: center;
  width: 200rpx;
  height: 40rpx;
  line-height: 40rpx;
  position: absolute;
  top: 30rpx;
  left: -50rpx;
  z-index: 2;
  overflow: hidden;
  -ms-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
  border: 1rpx dashed #fff;
  box-shadow: 0 0 0 3rpx $cor, 0 14rpx 7rpx -9rpx rgba(0, 0, 0, 0.6);
  background: $grad;
  color: #fff;
}
.del {
  position: absolute;
  right: -10rpx;
  top: -10rpx;
  color: #fe586b;
  font-weight: bold;
  background: #fff;
  border-radius: 50%;
  padding: 10rpx;
}
.uni-uploader__img {
  border-radius: 15rpx;
}
.uni-uploader__files {
  padding: 10rpx 29rpx;
}
.uni-uploader__input-box {
  background: #f5f5f5;
}
</style>
