import axios from "@/utils/axios";

export const getMusicList = () => axios.get("/getMusicList");