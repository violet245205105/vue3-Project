import axios from "axios";
import { base_url } from "@/mock/index.static";
import { ElMessage } from "element-plus";

// 使用库提供的默认配置创建实例
// 此时超时配置的默认值是 `0`
const instance = axios.create({
  baseURL: "/api",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

// 重写库的超时默认值
// 现在，所有使用此实例的请求都将等待2.5秒，然后才会超时
instance.defaults.timeout = 2500;
// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    switch (response.data.code) {
      case 403:
        ElMessage.error(response.data.message);
        location.href = "/login";
        break;
      default:
        break;
    }
    return response;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default instance;
