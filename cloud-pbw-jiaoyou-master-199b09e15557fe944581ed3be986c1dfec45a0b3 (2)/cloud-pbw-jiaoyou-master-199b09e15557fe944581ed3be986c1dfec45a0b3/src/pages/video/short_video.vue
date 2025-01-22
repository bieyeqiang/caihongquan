<template>
  <view class="container" @touchstart="handleTouchStart" @touchmove="handleTouchMove" @touchend="handleTouchEnd">
    <view class="video-wrapper">
      <!-- 当前视频 -->
      <video
        v-if="currentVideoIndex !== null"
        :key="'current-' + currentVideoIndex"
        :src="videoList[currentVideoIndex]"
        autoplay="true"
        controls="false"
        loop="false"
        show-fullscreen-btn="false"
        show-play-btn="false"
        show-center-play-btn="false"
        enable-progress-gesture="true"
        @play="onPlay"
        @pause="onPause"
        @ended="onEnded"
        :style="currentVideoStyle"
        @click="togglePlayPause($event)"  
      ></video>

      <!-- 下一个视频 -->
      <video
        v-if="nextVideoIndex !== null"
        :key="'next-' + nextVideoIndex"
        :src="videoList[nextVideoIndex]"
        autoplay="true"
        controls="false"
        loop="false"
        show-fullscreen-btn="false"
        show-play-btn="false"
        show-center-play-btn="false"
        enable-progress-gesture="true"
        :style="nextVideoStyle"
      ></video>

      <!-- 上一个视频 -->
      <video
        v-if="prevVideoIndex !== null"
        :key="'prev-' + prevVideoIndex"
        :src="videoList[prevVideoIndex]"
        autoplay="true"
        controls="false"
        loop="false"
        show-fullscreen-btn="false"
        show-play-btn="false"
        show-center-play-btn="false"
        enable-progress-gesture="true"
        :style="prevVideoStyle"
      ></video>
    </view>

    <!-- 播放按钮 -->
    <view v-if="!isPlaying" class="play-button" @click="playVideo">
      <image src="https://your-cdn-url/play-button.png" mode="aspectFit" class="play-icon"/>
    </view>
  </view>

</template>

<script>
export default {
  data() {
    return {
      videoList: [
          "//bpic.588ku.com/video_listen/588ku_preview/24/12/02/16/23/46/video674d6e9252f2f.mp4",
                "//bpic.588ku.com/video_listen/588ku_preview/24/12/02/16/23/51/video674d6e973b992.mp4",
                "//bpic.588ku.com/video_listen/588ku_preview/24/12/02/16/16/34/video674d6ce2ba907.mp4",
        
        "//bpic.588ku.com/video_listen/588ku_preview/24/12/02/16/17/14/video674d6d0a8935f.mp4",
                "https://bpic.588ku.com/video_listen/588ku_video/24/12/02/16/17/16/video674d6d0c986cc.mp4",
                "//bpic.588ku.com/video_listen/588ku_preview/24/12/02/16/23/32/video674d6e847289f.mp4",
      ],
      currentVideoIndex: 0, // 当前播放视频的索引
      nextVideoIndex: 1,    // 下一个播放视频的索引
      prevVideoIndex: null, // 上一个视频的索引
      isPlaying: false,     // 播放状态
      videoStyle: {
        width: "100vw",
        height: "100vh",
      },
      currentVideoStyle: {
        position: "absolute",
        top: 0,
        left: 0,
        transition: "transform 0.3s ease", // 为当前视频添加平滑过渡
      },
      nextVideoStyle: {
        position: "absolute",
        top: "100%", // 初始位置在屏幕下方
        left: 0,
        transition: "transform 0.3s ease", // 为下一个视频添加过渡动画
      },
      prevVideoStyle: {
        position: "absolute",
        top: "-100%", // 初始位置在屏幕上方
        left: 0,
        transition: "transform 0.3s ease", // 为上一个视频添加过渡动画
      },
      startY: 0, // 触摸起始位置
      endY: 0,   // 触摸结束位置
      isSwiping: false, // 是否正在滑动
    };
  },
  methods: {
    // 播放视频
    playVideo() {
      const videoContext = uni.createVideoContext("videoPlayer", this);
      videoContext.play();
      this.isPlaying = true;
    },
    // 切换播放视频
    changeVideo(direction) {
      if (direction === 'up' && this.currentVideoIndex < this.videoList.length - 1) {
        // 向上滑动，切换到下一个视频
        this.prevVideoIndex = this.currentVideoIndex; // 当前视频变成上一个视频
        this.currentVideoIndex++;
        this.nextVideoIndex = this.currentVideoIndex + 1 < this.videoList.length ? this.currentVideoIndex + 1 : null;
      } else if (direction === 'down' && this.currentVideoIndex > 0) {
        // 向下滑动，切换到上一个视频
        this.nextVideoIndex = this.currentVideoIndex; // 当前视频变成下一个视频
        this.currentVideoIndex--;
        this.prevVideoIndex = this.currentVideoIndex - 1 >= 0 ? this.currentVideoIndex - 1 : null;
      } else if (this.currentVideoIndex === 0 && direction === 'down') {
        // 第一个视频向下滑动时刷新视频列表
        this.loadNewVideos();
      }
    },
    // 加载新的视频列表
    loadNewVideos() {
      this.videoList = [
        "https://www.w3schools.com/html/movie.mp4",
        "https://www.w3schools.com/html/horse.mp4",
        "https://www.w3schools.com/html/mov_bbb.mp4",
      ];
      this.currentVideoIndex = 0;
      this.nextVideoIndex = 1;
      this.prevVideoIndex = null;
    },
    // 监听滑动开始位置
    handleTouchStart(event) {
      this.startY = event.touches[0].clientY;
      this.isSwiping = true;
      this.updateVideoStyles(0); // 重置动画
    },
    // 监听滑动过程中位置
    handleTouchMove(event) {
      this.endY = event.touches[0].clientY;
      const distance = this.endY - this.startY; // 改变为手指滑动的实际距离

      // 控制当前视频和上下视频的滑动
      if (this.isSwiping) {
        this.updateVideoStyles(distance);
      }
    },
    // 监听滑动结束
    handleTouchEnd() {
      const distance = this.endY - this.startY;
      if (Math.abs(distance) > 50) {
        // 滑动超过50px，切换视频
        if (distance < 0) {
          // 向上滑动，切换到下一个视频
          this.changeVideo('up');
        } else {
          // 向下滑动，切换到上一个视频
          this.changeVideo('down');
        }
      }

      // 滑动结束后，确保继续平滑动画
      this.updateVideoStyles(0); // 重置位置
      this.isSwiping = false;
    },
    // 更新当前视频和上下视频的位置
    updateVideoStyles(distance) {
		console.log(distance)
      if (this.isSwiping) {
        // 当前视频滑动
        this.currentVideoStyle.transition = "transform 0s"; // 不加过渡
        this.nextVideoStyle.transition = "transform 0.3s ease"; // 加过渡
        this.prevVideoStyle.transition = "transform 0.3s ease"; // 加过渡

        // 当前视频滑动
        this.currentVideoStyle.transform = `translateY(${distance}px)`;

        // 上一个视频
        this.prevVideoStyle.transform = `translateY(${distance - 100}px)`;

        // 下一个视频
        this.nextVideoStyle.transform = `translateY(${100 + distance}px)`;
      }
    },
    // 播放事件
    onPlay() {
      this.isPlaying = true;
    },
    // 暂停事件
    onPause() {
      this.isPlaying = false;
    },
    // 结束事件
    onEnded() {
      this.isPlaying = false;
      // 在视频播放结束后，触发视频滑动逻辑
      const distance = 100; // 视频完全滑动的距离，可以根据需求调整
      this.updateVideoStyles(distance);
      setTimeout(() => {
        this.changeVideo('up'); // 这里默认触发上滑事件切换到下一个视频
        this.updateVideoStyles(0); // 完成滑动后恢复位置
      }, 300); // 设定延迟，确保动画完成
    },
    // 切换播放暂停
    togglePlayPause(event) {
      event.stopPropagation(); // 阻止事件传播，防止触发滑动
      const videoContext = uni.createVideoContext("videoPlayer", this);
      if (this.isPlaying) {
        videoContext.pause();
        this.isPlaying = false;
      } else {
        videoContext.play();
        this.isPlaying = true;
      }
    },
  },
};
</script>

<style>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: black;
  position: relative;
  overflow: hidden; /* 防止多余的滚动条 */
}

.video-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

video {
  width: 100%;
  height: 100%;
  position: absolute;
}

.play-button {
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  cursor: pointer;
}

.play-icon {
  width: 100%;
  height: 100%;
}
.content_bottom{
	width:92%;
	background:#fff;
	position:absolute;
	bottom: 0px;
	z-index:10000;
	height:100px;
	left: 16px;
	
}
	
.content_top{
	
}
.avatar{
	width:32px;
	height:32px;
	border-radius:32px;
	/* overflow: hidden; */
}
.avatar image{
	width: 100%;
	height:100%;
}
</style>
