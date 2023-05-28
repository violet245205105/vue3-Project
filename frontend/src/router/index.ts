import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import routes from "./routerView";
import { decode } from "js-base64";
import { ElMessage } from "element-plus";
import { getUser } from "@/api";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

router.beforeEach((to, _, next) => {
  document.title = to?.name || "";
  next();
});

export default router;
