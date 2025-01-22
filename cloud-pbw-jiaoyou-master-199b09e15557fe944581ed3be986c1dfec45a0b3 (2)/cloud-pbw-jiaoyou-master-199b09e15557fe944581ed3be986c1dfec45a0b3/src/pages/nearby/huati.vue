<template>
  <view class="topic">
    <!-- swiper中的transfrom会使fixed失效,此时需设置fixed为false,而top会自动使用padding-top -->
    <mescroll-uni style="width: 100%; height: 100%; background: #ffffff;" :fixed="true" bottom="150" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @emptyclick="emptyClick" @init="mescrollInit">
      <view class="cardList" v-for="(item, index) of topicListGuan" :key="index" @click="topicLook(item._id, item.title)">
        <view class="cardTitle">
          <view class="cardNum" style="background: #6665f6; color: #ffffff;">官</view>
          <view class="cardName">
            <text class="name">{{ item.title }}</text>
            <text class="text">官方话题</text>
          </view>
          <view class="frAll" @click="topicLook(item._id, item.title)">
            <text>进入话题</text>
          </view>
        </view>
        <view class="imgList" v-if="item.nearby.length > 0">
          <image mode="aspectFill" lazy-load :src="imgItem.dynamicImg[0]" v-if="imgItem.dynamicImg.length > 0 && is<5" v-for="(imgItem, is) of item.nearby" :key="is" @click.stop="imgBtn(imgItem, imgItem.dynamicImg[0])"></image>
        </view>
      </view>
      <view class="cardList" v-for="(item, indexs) of topicList" :key="indexs" @click="topicLook(item._id, item.title)">
        <view class="cardTitle">
          <view class="cardNum">{{ indexs + 1 }}</view>
          <view class="cardName">
            <text class="name">{{ item.title }}</text>
            <text class="text">24小时人气</text>
          </view>
          <view class="frAll" @click="topicLook(item._id, item.title)">
            <text>进入话题</text>
          </view>
        </view>
        <view class="imgList" v-if="item.nearby.length > 0">
          <image mode="aspectFill" lazy-load :src="imgItem.dynamicImg[0]" v-if="imgItem.dynamicImg.length > 0 && is<5" v-for="(imgItem, is) of item.nearby" :key="is" @click.stop="imgBtn(imgItem, imgItem.dynamicImg[0])"></image>
        </view>
      </view>
    </mescroll-uni>
    <view style="height: 100px;"></view>
  </view>
</template>

<script>
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
export default {
  components: {
    MescrollUni,
  },
  data () {
    return {
      topicList: [],
      topicListGuan: [],
      downOption: {
        auto: false, // 不自动加载
      },
      mescroll: null,
      upOption: {
        auto: false, // 不自动加载
        page: {
          num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
          size: 15, // 每页数据的数量
        },
        noMoreSize: 1, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
        empty: {
          tip: "~ 空空如也 ~", // 提示
          btnText: "去看看",
        },
      },

      isInit: false,
    };
  },
  props: {
    index: "",
  },
  watch: {
    index (index) {
      if (index == 1) {
        if (!this.isInit) {
          this.mescroll.triggerDownScroll();
          this.isInit = true;
        }
      }
    },
  },
  mounted () { },
  methods: {
    imgBtn (imgIndex, list) {
      let imageList = [];
      imageList.push(list);
      uni.previewImage({
        current: imgIndex,
        urls: imageList,
      });
    },
    topicLook (id, title) {
      uni.navigateTo({
        url: "/pagesA/nearby/nearbyText/topicList?code=" + id + "&title=" + title,
      });
    },
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit (mescroll) {
      this.mescroll = mescroll;
    },
    /*下拉刷新的回调 */
    downCallback (mescroll) {
      // 这里加载你想下拉刷新的数据, 比如刷新轮播数据
      // loadSwiper();
      // 下拉刷新的回调,默认重置上拉加载列表为第一页 (自动执行 mescroll.num=1, 再触发upCallback方法 )
      mescroll.resetUpScroll();
    },
    /*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
    async upCallback (mescroll) {
      //  官方话题
      const list = await this.$request("nearby", "topicList", {
        type: "G",
        offset: 0,
        limit: 10,
      });
      this.topicListGuan = list.data;
      // 个人话题
      const res = await this.$request("nearby", "topicList", {
        type: "R",
        offset: (mescroll.num - 1) * mescroll.size,
        limit: mescroll.size,
      });
      if (res.data) {
        if (mescroll.num == 1) this.topicList = []; //第一页清空
        this.topicList = this.topicList.concat(res.data);//追加新数据
        mescroll.endSuccess(res.data.length); //结束加载状态
      } else {
        mescroll.endErr();//失败
      }
    },
    //点击空布局按钮的回调
    emptyClick () {
      uni.showToast({
        title: "点击了按钮,具体逻辑自行实现",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.frAll {
  position: absolute;
  right: 10rpx;
  top: 23rpx;
  text {
    color: #007aff;
    background: #f2f8fe;
    border: 3rpx solid #9acaff;
    padding: 6rpx 36rpx;
    border-radius: 10rpx;
  }
}
.name {
  color: #474766;
  font-weight: 800;
  font-size: 26rpx !important;
}
.text {
  font-weight: 300;
  font-size: 22rpx !important;
}
.topic {
  width: 100%;
  height: 100%;
  background: #ffffff !important;
}
.cardList {
  padding: 20rpx;
  border-bottom: 15rpx solid #f0f0f0;
}
.cardTitle {
  display: flex;
  align-items: center;
  position: relative;
}
.cardNum {
  width: 80rpx;
  height: 80rpx;
  background: #ffd8d4;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 50rpx;
  color: #ea564d;
  margin-right: 15rpx;
}
.cardName {
  display: flex;
  flex-direction: column;
  height: 60rpx;
  justify-content: space-between;
}
.imgList {
  display: flex;
  justify-content: flex-start;
  padding: 20rpx 0;
  image {
    width: 150rpx;
    height: 150rpx;
    margin: 10rpx;
    border-radius: 10rpx;
    background: #f5f5f5;
  }
}
</style>
