import { defineStore } from "pinia";
import { reactive } from "vue";
import { getMusicList } from "@/api";

export default defineStore("MusicPlayback", () => {
  const state = reactive({
    musicList: [],
    musicIndex: 0,
    loading: true,
    value: 0,
    bofangFlag:false,
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
      const res = await getMusicList();
      state.loading = false;
      state.musicList = res.data.data;
    } catch (e) {
      console.log("error", e);
    }
  };

  const onClickMusic = async (index: number) => {
    state.musicIndex = index;
    await init();
  };

  const onChangeMusicIndex = async (start: number, end: number) => {
    if (start >= end) {
      if (state.musicList.length <= state.musicIndex + 1) {
        state.musicIndex = 0;
      } else {
        state.musicIndex = state.musicIndex + 1;
      }
      await init();
    }
  };


  return {
    state,
    svg,
    onClickMusic,
    onChangeMusicIndex,
    init,
  };
});
