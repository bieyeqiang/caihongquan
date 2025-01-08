<template>
  <view class="page">
    <view class="uni-card">
      <view class="uni-list">
        <block v-for="(item,index) in lists" :key="index">
          <view class="uni-list-cell uni-collapse">
            <view class="uni-list-cell-navigate uni-navigate-bottom" :class="item.show ? 'uni-active' : ''" @click="trigerCollapse(index)">
              {{item.title}}
            </view>
            <view class="uni-collapse-content" :class="item.show ? 'uni-active' : ''">
              <view class="page-pd">
                <view>
                  <view class="uni-list-cell" hover-class="uni-list-cell-hover">
                    答：{{item.text}}
                  </view>
                </view>
              </view>
            </view>
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
      title: 'accordion',
      lists: [{
        title: "如何发布动态心情？",
        show: false,
        text: '您可以登录后，在显摆里发布动态心情。'
      },
      {
        title: "显摆是什么？",
        text: '显摆是一种表达方式，显摆炫耀下你自己很喜欢的照片。',
        show: false
      },
      {
        title: "可以上传照片吗？",
        text: '你可以自由的在个人中心照片墙，上传自己的照片，让别人更好的了解你。',
        show: false
      }
      ],
    }
  },
  methods: {
    trigerCollapse (e) {
      for (let i = 0, len = this.lists.length; i < len; ++i) {
        if (e === i) {
          this.lists[i].show = !this.lists[i].show;
        } else {
          this.lists[i].show = false;
        }
      }
    }
  }
}
</script>

<style>
.list-collapse {
  padding-left: 36upx;
  box-sizing: border-box;
}

image {
  width: 100%;
}

.page-pd {
  padding: 36upx;
}
</style>
