import { defineStore } from "pinia";
import { reactive } from "vue";
import { getMusicList } from "@/api";
import type { MusicListType } from "@/mock/index.static";
export interface state {
  musicList: MusicListType[];
  musicIndex: number;
  loading: boolean;
  value: number;
  bofangFlag: boolean;
  start: number;
  totalPage: number;
  total: number;
  search: string;
  sum: number;
  isActive: number | null;
  musicDetail: MusicListType | null;
  musicEveryList: boolean[];
  startTime: string;
  endTime: string;
  minTime: number;
  maxTime: number;
  PlaybackMode: number;
}
export default defineStore("MusicPlayback", () => {
  const state = reactive<state>({
    musicList: [],
    musicIndex: 0,
    loading: true,
    value: 0,
    bofangFlag: false,
    start: 1,
    totalPage: 10,
    total: 0,
    search: "",
    sum: 0,
    isActive: null,
    musicDetail: null,
    musicEveryList: [],
    startTime: "00:00",
    endTime: "00:00",
    minTime: 0,
    maxTime: 0,
    PlaybackMode: 1,
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

  const init = async (props?: { search?: string }) => {
    state.loading = true;
    try {
      const res = await getMusicList({
        search: props?.search ? props.search : state.search,
      });
      // state.musicDetail = { ...resDetail.data.data, ind: resDetail.data.ind };
      state.loading = false;
      state.musicList = res.data.data;
      // state.isActive = resDetail.data.ind;
    } catch (e) {
      console.log("error", e);
    }
  };

  const onClickMusic = async (index: number) => {
    state.musicIndex = index;
    await init();
  };

  const changeTime = (time: number) => {
    if (!time) return "00:00";
    let fen = Math.floor(time / 60).toString();
    let miao = Math.floor(time % 60).toString();
    fen = Number(fen) < 10 ? "0" + fen : fen;
    miao = Number(miao) < 10 ? "0" + miao : miao;
    return fen + ":" + miao;
  };

  const onChangeMusicSlider = () => {};

  const formatTooltip = (value: number) => {
    return changeTime(value);
  };

  const onMusicTimer = (str?: string) => {
    if (state.PlaybackMode === 1) {
      if (str) {
        if (str === "next") {
          if (state.musicList.length > state.musicIndex + 1) {
            state.bofangFlag = true;
            state.musicIndex = state.musicIndex + 1;
          } else {
            state.bofangFlag = true;
            state.musicIndex = 0;
          }
        } else {
          if (0 <= state.musicIndex - 1) {
            state.bofangFlag = true;
            state.musicIndex = state.musicIndex - 1;
          } else {
            state.bofangFlag = true;
            state.musicIndex = state.musicList.length - 1;
          }
        }
      } else {
        if (state.musicList.length > state.musicIndex + 1) {
          state.bofangFlag = true;
          state.musicIndex = state.musicIndex + 1;
        } else {
          state.bofangFlag = true;
          state.musicIndex = 0;
        }
      }
    } else if (state.PlaybackMode === 2) {
      state.bofangFlag = true;
      state.musicIndex = Math.floor(Math.random() * state.musicList.length);
    } else if (state.PlaybackMode === 3) {
      if (str) {
        if (str === "next") {
          if (state.musicList.length > state.musicIndex + 1) {
            state.bofangFlag = true;
            state.musicIndex = state.musicIndex + 1;
          } else {
            state.bofangFlag = true;
            state.musicIndex = 0;
          }
        } else {
          if (0 <= state.musicIndex - 1) {
            state.bofangFlag = true;
            state.musicIndex = state.musicIndex - 1;
          } else {
            state.bofangFlag = true;
            state.musicIndex = state.musicList.length - 1;
          }
        }
      }
    }
  };

  const setPlaybackMode = () => {
    if (state.PlaybackMode >= 3) {
      state.PlaybackMode = 1;
    } else {
      state.PlaybackMode = state.PlaybackMode + 1;
    }
  };

  return {
    state,
    svg,
    onClickMusic,
    init,
    changeTime,
    onChangeMusicSlider,
    formatTooltip,
    onMusicTimer,
    setPlaybackMode,
  };
});
