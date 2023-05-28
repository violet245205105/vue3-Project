import axios from "@/utils/axios";

export const getVideoList = () => axios.get("/getVideoList");

export const getList = () => axios.post("/login");

export const getData = () => axios.get("/hello");
