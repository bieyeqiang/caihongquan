<template>
  <view class="photo_full">
    <view class="add">
      <span @click="addShow()" v-if="adminShow">+新建相册分类</span>
    </view>
    <view class="add_list" v-if="PhotoList">
      <view v-for="(item, index) of PhotoList" :key="index" @click="photoBtn(item._id)">
        <image style="width: 100%; background: #f5f5f5" mode="aspectFill" lazy-load :src="item.photoList[0].imgPath"></image>
        <view class="imgTitle"> 相册：{{ item.title }}</view>
        <span class="iconfont addBtn" v-if="adminShow" @click.stop="editShow(item)">&#xe644;</span>
        <span class="iconfont delBtn" v-if="adminShow" @click.stop="delBtn(item._id)">&#xe654;</span>
        <span class="showBtn">{{ item.state == 1 ? '公开' : '不公开' }}</span>
      </view>
    </view>
    <not-list v-if="PhotoList && PhotoList.length == 0" :text="'暂无相册数据'"></not-list>

    <!--弹窗-->
    <lvv-popup position="bottom" ref="lvvPopup">
      <view class="popClass">
        <view class="uni-form-item uni-column">
          <view class="title">相册标题</view>
          <view class="with-fun">
            <input class="uni-input" placeholder="请输入相册标题" v-model="titleVal" />
          </view>
        </view>
        <view class="uni-form-item uni-column">
          <view class="title">相册描述</view>
          <view class="with-fun">
            <input class="uni-input" v-model="descriptionVal" placeholder="请输入相册描述" />
          </view>
        </view>
        <view class="uni-form-item uni-column">
          <view class="title">是否公开显示</view>
          <view class="with-fun" style="text-align: center; margin-top: 30rpx">
            <radio-group class="radio-group" @change="radioChange">
              <label class="radio" v-for="(item, index) in items" :key="index"> <radio :value="item.value" :checked="item.checked" />{{ item.name }} </label>
            </radio-group>
          </view>
        </view>
        <view class="add" style="text-align: center" v-if="show == 1">
          <span @click="addBtn()">添加相册分类</span>
        </view>
        <view class="add" style="text-align: center" v-if="show == 2">
          <span @click="editBtn()">修改相册分类</span>
        </view>
      </view>
    </lvv-popup>
  </view>
</template>

<script>
import lvvPopup from '@/components/lvv-popup/lvv-popup.vue'
import notList from '@/components/notList'

export default {
  components: {
    lvvPopup,
    notList
  },
  data() {
    return {
      adminShow: false,
      show: 1,
      showCode: '',
      titleVal: '',
      descriptionVal: '我的相册',
      stateVal: 0,
      PhotoList: '',
      items: [
        {
          name: '公开',
          value: '1',
          checked: 'false'
        },
        {
          name: '不公开',
          value: '0',
          checked: 'false'
        }
      ],
      optionData: ''
    }
  },
  methods: {
    editShow(item) {
      this.$refs.lvvPopup.show()
      this.show = 2
      this.showCode = item._id
      this.titleVal = item.title
      this.descriptionVal = item.description
      this.stateVal = item.state
      if (item.state == 0) {
        this.items[0].checked = false
        this.items[1].checked = true
      }
      if (item.state == 1) {
        this.items[0].checked = true
        this.items[1].checked = false
      }
    },
    async editBtn(code) {
      let vm = this

      if (vm.titleVal == '') {
        uni.showToast({
          title: '请填写相册标题',
          icon: 'none',
          duration: 3000
        })
        return
      }
      if (vm.descriptionVal == '') {
        uni.showToast({
          title: '请填写相册描述',
          icon: 'none',
          duration: 3000
        })
        return
      }
      const res = await this.$request('home', 'editPhotoAlbum', {
        photoAlbumId: vm.showCode,
        title: vm.titleVal,
        description: vm.descriptionVal,
        state: vm.stateVal
      })

      if (res) {
        vm.getList()
        vm.$refs.lvvPopup.close()
        uni.showToast({
          title: '修改成功',
          icon: 'none',
          duration: 3000
        })
      }
    },
    delBtn(code) {
      let vm = this
      uni.showModal({
        title: '提示',
        content: '确定要删除该相册分类吗？（分类下照片也会全部被删除）',
        success: async (res) => {
          if (res.confirm) {
            const res = await this.$request('home', 'delPhotoAlbum', {
              photoAlbumId: code
            })

            if (res) {
              vm.getList()
              vm.$refs.lvvPopup.close()
              uni.showToast({
                title: '删除相册分类成功',
                icon: 'none',
                duration: 3000
              })
            }
          }
        }
      })
    },
    async addBtn() {
      let vm = this
      if (vm.titleVal == '') {
        uni.showToast({
          title: '请填写相册标题',
          icon: 'none',
          duration: 3000
        })
        return
      }
      if (vm.descriptionVal == '') {
        uni.showToast({
          title: '请填写相册描述',
          icon: 'none',
          duration: 3000
        })
        return
      }

      const res = await this.$request('home', 'addPhotoAlbum', {
        title: vm.titleVal,
        description: vm.descriptionVal,
        state: vm.stateVal
      })
      if (res) {
        vm.getList()
        vm.$refs.lvvPopup.close()
        uni.showToast({
          title: '相册创建成功',
          icon: 'none',
          duration: 3000
        })
      }
    },
    radioChange: function (e) {
      //console.log("radio发生change事件，携带value值为：" + e.detail.value);
      this.stateVal = e.detail.value
    },
    addShow() {
      this.$refs.lvvPopup.show()
      this.show = 1
      this.titleVal = ''
      this.descriptionVal = '我的自拍照片'
      this.stateVal = 1

      this.items[0].checked = true
      this.items[1].checked = false
    },
    photoBtn(code) {
      uni.navigateTo({
        url: '/pagesA/myhome/photoList/photoList?code=' + code + '&admin=' + this.optionData.admin
      })
    },
    setImgBook() {
      this.titleVal = '我的相册'
      this.descriptionVal = '我的自拍照'
      this.stateVal = 1

      this.addBtn()
    },
    async getList() {
      // 获取列表
      const res = await this.$request('home', 'getPhotoAlbumList', {
        uid: this.optionData.code
      })
      if (res) {
        this.PhotoList = res.data
      }

      // 没有相册 自动创建
      if (res.data.length == 0) {
        if (this.adminShow) this.setImgBook()
      }
    }
  },
  onLoad(option) {
    this.optionData = option
    if (option.admin == 'admin') {
      this.adminShow = true
    } else {
      this.adminShow = false
    }
    this.getList()
  }
}
</script>

<style lang="scss" scoped>
.addBtn {
  position: absolute;
  right: 30%;
  top: 30rpx;
  color: #6665f6;
  font-weight: bold;
  padding: 10rpx;
  background: #fff;
  border-radius: 50%;
}
.delBtn {
  position: absolute;
  right: 10%;
  top: 30rpx;
  color: #6665f6;
  font-weight: bold;
  padding: 10rpx;
  background: #fff;
  border-radius: 50%;
}
.showBtn {
  padding: 10rpx;
  position: absolute;
  right: 15px;
  bottom: 40px;
  color: #755fe0;
  font-weight: bold;
  font-size: 10px;
  border: 1px solid #755fe0;
  border-radius: 15px;
  padding: 1px 7px;
}
.add_list > view {
  position: relative;
}
textarea {
  padding: 10px;
  font-size: 15px;
  width: 100%;
  height: 80px;
}
input,
textarea {
  border: 1px solid #ddd;
  border-radius: 8rpx;
  height: 80rpx;
  line-height: 80rpx;
  width: 100%;
  padding: 0 20rpx;
}
.popClass {
  width: 100%;
  height: 50%;
  background: #fff;
  position: absolute;
  bottom: 0;
  padding: 10px;
  box-sizing: border-box;
  box-shadow: 3px -5px 19px #666666;
}
.add_list {
  width: 100%;
}
.add_list > view {
  width: 50%;
  float: left;
  box-sizing: border-box;
  padding: 10px;
}
.add_list image {
  width: 100%;
  height: 100px;
  border-radius: 15rpx;
}
.imgTitle {
  width: 100%;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 30rpx;
  margin-top: 10rpx;
}
.add {
  text-align: right;
  padding: 10px;
  margin-top: 20rpx;
}
.add span {
  border-radius: 5px;
  padding: 5px 13px;
  color: #fff;
  background: $fontColorB;
}
</style>
