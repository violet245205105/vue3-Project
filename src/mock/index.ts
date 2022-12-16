import Mock from "mockjs";
import {
  getUserList,
  login,
  register,
  getUser,
  changeAvatarEl,
  getUserData,
  onEditUser,
  delUser
} from "./user/user";
import { getAvatar } from "./avatar/avatar";
import { getVideoList } from "./video/video";
import { getMusicList } from "./music/music";
import { base_url } from "./index.static";
Mock.setup({
  timeout: "300-600",
});
const httpMock = (url: string, method: string, fn: any) => {
  return Mock.mock(RegExp(base_url + url + ".*"), method, fn);
};
httpMock("getlist", "get", getUserList);
httpMock("login", "post", login);
httpMock("register", "post", register);
httpMock("getUser", "post", getUser);
httpMock("changeAvatar", "post", changeAvatarEl);
httpMock("getUserData", "get", getUserData);
httpMock("getAvatar", "get", getAvatar);
httpMock("onEditUser", "put", onEditUser);
httpMock("delUser", "delete", delUser);
httpMock("getVideoList", "get", getVideoList);
httpMock("getMusicList", "get", getMusicList);
export default Mock;
