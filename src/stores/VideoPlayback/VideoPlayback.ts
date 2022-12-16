import { defineStore } from "pinia";
import { reactive } from "vue";
import { getVideoList } from "@/api";

export default defineStore("VideoPlayback", () => {
  const state = reactive({
    videoList: [],
    videoIndex: 0,
    loading: true,
  });
  const svg = `
  <path class="path" d="
    M 30 15
    L 28 17
    M 25.61 25.61
    A 15 15, 0, 0, 1, 15 30
    A 15 15, 0, 1, 1, 27.99 7.5
    L 15 15
  " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
`;

  const init = async () => {
    state.loading = true;
    try {
      const res = await getVideoList();
      state.loading = false;
      state.videoList = res.data.data;
    } catch (e) {
      console.log("error", e);
    }
  };

  const onClickVideo = async (index: number) => {
    state.videoIndex = index;
    await init();
  };

  const onChangeVideoIndex = async (start: number, end: number) => {
    if (start >= end) {
      if (state.videoList.length <= state.videoIndex + 1) {
        state.videoIndex = 0;
      } else {
        state.videoIndex = state.videoIndex + 1;
      }
      await init();
    }
  };

  return {
    state,
    svg,
    onClickVideo,
    onChangeVideoIndex,
    init,
  };
});
