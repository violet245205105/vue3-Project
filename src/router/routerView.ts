const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/",
    name: "Home",
    component: () => import("@/page/HomeView.vue"),
    children: [
      {
        path: "/index",
        name: "首页",
        icon: "HomeFilled",
        component: () => import("@/page/Index/Index.vue"),
      },
      {
        path: "/rolemanagement",
        name: "角色管理",
        icon: "User",
        jurisdiction: true,
        component: () => import("@/page/RoleManagement/RoleManagement.vue"),
      },
      {
        path: "/videoplayback",
        name: "视频播放",
        icon: "VideoCamera",
        component: () => import("@/page/VideoPlayback/VideoPlayback.vue"),
      },
      {
        path: "/musicplayback",
        name: "音乐播放",
        icon: "Headset",
        component: () => import("@/page/MusicPlayback/MusicPlayback.vue"),
      },
      {
        path: "/userinformation",
        name: "用户信息",
        icon: "Tickets",
        component: () => import("@/page/UserInformation/UserInformation.vue"),
      },
      {
        path: "/home",
        redirect: "/index",
      },
    ],
  },
  {
    path: "/login",
    name: "登录",
    component: () => import("@/page/login/Login.vue"),
  },
  {
    path: "/register",
    name: "注册",
    component: () => import("@/page/login/Login.vue"),
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/page/404/404.vue"),
  },
  {
    path: "/:pathMatch(.*)",
    redirect: "/404",
  },
];

export default routes;
