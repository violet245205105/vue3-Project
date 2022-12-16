<template>
  <div class="videoPlay connect" element-loading-text="加载中..." :element-loading-svg="svg" v-loading="loading">
    <template v-if="videoList.length">
      <div class="leftVideo">
        <h1>{{ videoList[videoIndex]?.title }}</h1>
        <video :autoplay="true" ref="videoRef" @timeupdate="onVideoTimer" class="video-class"
          :src="`${'http://127.0.0.1:9000' + videoList[videoIndex]?.src}`" controls></video>
      </div>

      <div class="rightVideo">
        <div class="videoTop">
          <span>接下来播放</span>
          <el-switch class="kaiguan" v-model="switchFlag" size="large" inactive-text="自动连播" />
        </div>
        <el-divider />
        <div class="scroll">
          <div class="video-list" v-for="item, index in videoList" :key="item?.src"
            :class="index === videoIndex ? 'active' : ''" @click="onClickVideo(index)">
            <img :src="item?.poster" alt="">
            <div class="li-child">
              <h5>{{ item?.title }}</h5>
              <p>
                <el-icon>
                  <VideoCamera />
                </el-icon>
                <span>{{ item?.PlayVolume }}万</span>
              </p>
              <p>
                <el-icon>
                  <ChatDotSquare />
                </el-icon>
                <span>{{ item?.comment }}万</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </template>
    <el-empty class="video-empty" v-else description="暂无视频" />
  </div>
</template>

<script lang="ts">
import { toRefs, ref, onMounted } from 'vue'
import { VideoCamera, ChatDotSquare } from "@element-plus/icons-vue";
import { VideoPlayback } from "@/stores";
export default {
  components: {
    VideoCamera, ChatDotSquare
  },
  setup() {
    const {
      state,
      onClickVideo,
      svg,
      onChangeVideoIndex,
      init
    } = VideoPlayback();
    const videoRef = ref<any>();
    const switchFlag = ref(false);
    const onVideoTimer = () => {
      if (switchFlag.value) {
        const startTime = videoRef.value.currentTime;
        const endTime = videoRef.value.duration;
        onChangeVideoIndex(startTime, endTime);
      }
    }

    onMounted(async () => {
      await init();
    });

    return {
      ...toRefs(state),
      videoRef,
      switchFlag,
      onClickVideo,
      onVideoTimer,
      svg,
    }
  }
}
</script>

<style lang="less">
@import "./VideoPlayback.less";
</style>
