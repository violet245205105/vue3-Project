import axios from "@/utils/axios";
import type { MockUserList } from "@/mock/index.static";
export const getUserList = () => axios.get("/getlist");

export const login = (params: MockUserList) => axios.post("/login", params);

export const register = (params: MockUserList) =>
  axios.post("/register", params);

export const getUser = () => axios.get("/getUser");

export const changeAvatarEl = (body: { userId: string; url: string }) =>
  axios.post("/changeAvatar", body);

export const getUserData = (params?: {
  startPage: number;
  totalPage: number;
  search: string;
}) => axios.get("/getUserData", { params });

export const onEditUser = (params: MockUserList) =>
  axios.put("/onEditUser", params);

export const delUser = (params: { id: string[] }) =>
  axios.delete("/delUser", { data: params });
