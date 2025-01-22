<template>
  <div class="evaluate-wrapper">
    <image  :src='nameData.userInfo.headImg' class='evaluate-photo' />
    <div class='evaluate-content'>
      <div class='evaluate-content-top'>
        <span>{{nameData.userInfo.name}}</span>
        <p class='evaluate-content-top-star' v-if='showStar'>
          <star :score='nameData.remake1' :fontSize='32'></star>
        </p>
      </div>
      <div class="evaluate-content-middle">
        <p class="evaluate-content-middle-text">{{nameData.text}}</p>
      </div>
      <div class="evaluate-content-comments" v-if='false'>
        <div class='evaluate-content-comment'>
          <div>
            <p class='evaluate-content-comment-item'><span class='evaluate-content-comment-label'>妮儿：</span><span class='evaluate-content-comment-text'>你不是一个人</span></p>
            <p class='evaluate-content-comment-item'><span class='evaluate-content-comment-label'>biubiu：</span><span class='evaluate-content-comment-text'>赞同，赞同！</span></p>
          </div>
          <p v-if="!show" class='evaluate-content-comment-showAll evaluate-content-comment-item' @click='showAll'>查看全部3条回复&nbsp;&gt;</p>
          <div v-else="show">
            <p class='evaluate-content-comment-item'><span class='evaluate-content-comment-label'>妮儿：</span><span class='evaluate-content-comment-text'>你不是一个人</span></p>
            <p class='evaluate-content-comment-item'><span class='evaluate-content-comment-label'>biubiu：</span><span class='evaluate-content-comment-text'>赞同，赞同！</span></p>
            <p class='evaluate-content-comment-item'><span class='evaluate-content-comment-label'>biubiu：</span><span class='evaluate-content-comment-text'>赞同，赞同！</span></p>
          </div>
        </div>
      </div>
      <div class="evaluate-content-bottom"  >
        <span class='valuate-content-bottom-time'></span>
        <span class='valuate-content-bottom-zan'><span class='iconfont icon-zan'></span>{{timeGet(nameData.createTime)}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import star from '@/components/star'
  export default {
    props: {
      showComments: '',
      showStar: '',
      nameData: ''
    },
    data() {
      return {
        show: false
      }
    },
    methods: {
         timeGet: function(value) {
        var time = new Date(value);
        function add0(m) {
          return m < 10 ? '0' + m : m
        }
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        var timeResult = y + '/' + add0(m) + '/' + add0(d) + ' ' + add0(h) + ':' + add0(mm);
        if (timeResult == '1970-01-01' || timeResult == '1970-01-02') {
          return '--'
        } else {
          return timeResult
        }
      },
      showAll() {
        this.show = true
      }
    },
    components: {
      star
    }
  }
</script>

<style>
  .evaluate-wrapper {
    width: 100%;
    display: flex;
  }
  .evaluate-photo {
    flex: 0 80rpx;
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
    border: 1px solid #f6f6f6;
  }
  .evaluate-content {
    flex: 1;
    padding-left: 10rpx;
    position: relative;
    margin-bottom: 20rpx;
  }
  .evaluate-content-top {
    font-size: 28rpx;
    height: 40tpx;
    line-height: 40rpx;
    margin: 10rpx 0;
    color: #333;
  }
  .evaluate-content-top-star {
    position: absolute;
    right: 0;
    top: 0;
  }
  .evaluate-content-middle {
    font-size: 30rpx;
    color: #999;
  }
  .evaluate-content-bottom {
    font-size: 28rpx;
    color: #9B9B9B;
    margin: 20rpx 0 0;
  }
  .valuate-content-bottom-zan {
    float: right;
    font-size: 26rpx;
  }
  .valuate-content-bottom-zan .iconfont {
    padding-right: 6rpx;
  }
  .evaluate-content-comment {
    margin: 10rpx 0;
    padding: 10rpx;
    background: #F9FCFF
  }
  .evaluate-content-comment-item {
    font-size: 28rpx;
    height: 40rpx;
    line-height: 40rpx;
  }
  .evaluate-content-comment-label {
    color: #9B9B9B;
  }
  .evaluate-content-comment-showAll {
    color: #318AF8;
    margin-top: 4rpx;
  }
</style>
