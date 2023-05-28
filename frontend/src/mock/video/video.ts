import Mock from "mockjs";
import VideoList from "./video.static";

export const getVideoList = () => {
  return {
    code: 200,
    data: VideoList,
  };
};
