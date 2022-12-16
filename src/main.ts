import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "./mock";
import routes from "@/router/routerView";
import './assets/icons/iconfont/iconfont.css'
import { HomeFilled, Tickets, User, VideoCamera,Headset } from "@element-plus/icons-vue";
const routerIconList = [HomeFilled, User,VideoCamera, Headset, Tickets];
const app = createApp(App);
app.use(ElementPlus);
app.use(createPinia());
app.use(router);
routes
  .filter((item) => item.children)[0]
  .children?.filter((value) => value.name)
  .forEach((it, index) => {
    app.component(it.icon as string, routerIconList[index]);
  });

app.mount("#app");
