import { decode, encode } from "js-base64";
import type { resType, MusicListType } from "../index.static";
import { queryUrlPar } from "../index.static";
import MusicList from "./music.static";
let musicList: MusicListType[] = localStorage.getItem("musicList")
  ? JSON.parse(decode(localStorage.getItem("musicList") as string))
  : MusicList;

export const getMusicList = (res: resType) => {
  if (!localStorage.getItem("musicList")) {
    localStorage.setItem("musicList", encode(JSON.stringify(MusicList)));
  }
  const obj = queryUrlPar(res.url);

  const newArr = musicList.filter(
    (data: { musicName: string }) =>
      !obj.search ||
      data.musicName.toLowerCase().includes(obj.search.toLowerCase())
  );
  const sum = newArr.length;
  return {
    code: 200,
    data: newArr,
    sum,
  };
};