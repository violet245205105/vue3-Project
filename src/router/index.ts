import { createRouter, createWebHistory } from "vue-router";
import routes from "./routerView";
import { decode } from "js-base64";
import { ElMessage } from "element-plus";
import { getUser } from "@/api";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

export const whiteList = ["/login", "/register"];

router.beforeEach((to, _, next) => {
  const index = whiteList.findIndex((item) => item === to.path);
  document.title = to?.name;
  const localDataUserToken = localStorage.getItem("user_token")
    ? localStorage.getItem("user_token")
    : "";

  const tokenData = localDataUserToken
    ? JSON.parse(decode(localDataUserToken as string))
    : "";
  const init = async () => {
    const res = await getUser(tokenData.userId);
    return res
  }

  if (index < 0) {
    if (tokenData && tokenData.exp > +new Date()) {
      if (to.path === "/rolemanagement") {
        init().then(res => {
          if (res.data.code === 200 && res.data.data.identity !== "admin") {
            next("/");
            ElMessage.error("您没有权限进入");
          } else {
            next();
          }

        });
      } else {
        next()
      }
    } else {
      ElMessage.error("token过期，请重新登录");
      next("/login");
    }
  } else {
    next();
  }


});

export default router;
