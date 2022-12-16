import axios from "@/utils/axios";

export const getVideoList = () => axios.get("/getVideoList");