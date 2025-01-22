<template>
  <view style="border-top: 1rpx solid #f5f5f5">
    <div class="title_rt">
      <span @click="add">发布服务技能</span>
    </div>
    <div class="List_content clear">
      <ul v-if="Serves">
        <li class="li_full clear" v-for="(item, index) of Serves" :key="index" @click="GetBtn(item._id)">
          <span v-if="item.is_sales == 0" class="Del" @click.stop="upBtn(item._id)"><span class="iconfont">&#xe654;</span>上架服务</span>
          <span v-if="item.is_sales == 1" class="Del" @click.stop="delBtn(item._id)"><span class="iconfont">&#xe654;</span>下架服务</span>
          <image mode="aspectFill" :src="item.thumb" />
          <div class="List_title clear">
            <p>{{ item.title }}</p>
            <p class="clear">
              <span>￥{{ item.price }}元/{{ item.priceTypeText }}</span><span>{{ item.typeText }}</span>
            </p>
          </div>
          <!--审核中-->
          <span v-if="item.is_sales == 2" class="status iconfont" style="color: #1cafaf">&#xe779;</span>
          <!--已上架-->
          <span v-if="item.is_sales == 1" class="status iconfont" style="color: #1aad19">&#xe6d8;</span>
          <!--不通过-->
          <span v-if="item.is_sales == 3" class="status iconfont" style="color: #eb5248">&#xe698;</span>
          <!--已下架-->
          <span v-if="item.is_sales == 0" class="status iconfont" style="color: #ddd">&#xe999;</span>
        </li>
      </ul>
      <not-list v-if="Serves && Serves.length == 0" :text="'暂无服务技能'"></not-list>
      <div style="height: 50px"></div>
    </div>
  </view>
</template>

<script>
import notList from "@/components/notList";
import { mapState } from "vuex";
export default {
  components: {
    notList,
  },
  data () {
    return {
      Serves: [],
    };
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  methods: {
    add () {
      uni.navigateTo({
        url: "/pagesA/service/service/service",
      });
    },
    GetBtn (code) {
      uni.navigateTo({
        url: "/pagesA/service/serviceInfo/serviceInfo?type=admin&id=" + code,
      });
    },
    upBtn (id) {
      this.$request("service", "deleteProduct", {
        id: id,
        type: 1,
      }).then((res) => {
        uni.showToast({
          title: "上架服务成功",
          icon: "none",
          duration: 3000,
        });
        this.getList();
      });
    },
    delBtn (id) {
      let vm = this;
      uni.showModal({
        title: "提示",
        content: "下架后将永久下架,确定要下架该服务技能吗？",
        success: function (res) {
          if (res.confirm) {
            // 下架服务
            vm.$request("service", "deleteProduct", {
              id: id,
              type: 2,
            }).then((res) => {
              uni.showToast({
                title: "下架服务成功",
                icon: "none",
                duration: 3000,
              });
              vm.getList();
            });
          } else if (res.cancel) {
            ////console.log('用户点击取消');
          }
        },
      });
    },
    getList () {
      this.$request("service", "serviceList", {
        uid: this.userInfo._id,
      }).then((res) => {
        if (res.data) {
          this.Serves = res.data;
        } else {
          // 提示
          uni.showToast({
            title: "发生错误",
            icon: "none",
            duration: 3000,
          });
        }
      });
    },
  },
  onShow () {
    // 获取列表
    this.getList();
  },
};
</script>

<style scoped lang="scss">
.title_rt {
  text-align: right;
  margin: 20px 0;
}
.title_rt span {
  color: #fff;
  background: $fontLinear;
  padding: 6px 18px;
  border-radius: 6px;
  margin: 20px 10px;
}
.status {
  position: absolute;
  right: 20rpx;
  bottom: 0rpx;
  font-size: 200rpx;
  color: rgba(255, 0, 0, 0.5);
}
.li_full {
  position: relative;
}
.li_full image {
  width: 100%;
  height: 300rpx;
  border-radius: 10rpx 10rpx 0 0;
}
.Del {
  position: absolute;
  right: 20upx;
  top: 20upx;
  font-size: 15px;
  color: #fff;
  background: $fontLinear;
  padding: 0px 5px;
  border-radius: 6px;
  display: inline-block;
  z-index: 999999;
}
.List_title p:first-child {
}
.List_title p {
  font-size: 15px;
  margin-top: 15rpx;
}
.List_title p:last-child span:last-child {
  color: $fontColor;
  border: 1px solid $fontColor;
  padding: 1px 4px;
  border-radius: 5px;
}
.List_title p:last-child span:first-child {
  float: right;
  color: $fontColor;
  font-weight: bold;
}
.List_title {
  padding: 0 10px 10px;
}
.List_content li img {
  width: 100%;
  height: 130px;
  border-radius: 5px 5px 0 0;
}
.List_content {
  padding: 10px;
  height: 100%;
}
.List_content ul {
  height: 100%;
}
.List_content li {
  border-radius: 5px;
  width: 100%;
  margin-bottom: 20px;
  background: #fff;
  box-shadow: 2px 3px 8px #999;
}
</style>
