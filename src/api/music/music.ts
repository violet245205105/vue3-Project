import axios from "@/utils/axios";

export const getMusicList = (params?: { search: string }) =>
  axios.get("/getMusicList", { params });

// export const getMusicDetail = () => axios.get("/getMusicDetail");
