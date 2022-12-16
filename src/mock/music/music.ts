import { decode, encode } from "js-base64";
import MusicList from "./music.static";
let musicList = localStorage.getItem("musicList")
  ? JSON.parse(decode(localStorage.getItem("musicList") as string))
  : MusicList;

export const getMusicList = () => {
  if (!localStorage.getItem("musicList")) {
    localStorage.setItem("musicList", encode(JSON.stringify(MusicList)));
  }

  return {
    code: 200,
    data: musicList,
  };
};

export const musicBoFang = () => {};
