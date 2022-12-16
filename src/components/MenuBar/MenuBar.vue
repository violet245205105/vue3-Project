<template>
  <div class="menu">
    <el-menu
      router
      class="el-menu-vertical-demo"
      :default-active="routerPath"
      :collapse="unfold"
    >
      <el-menu-item
        class="violet"
        disabled
      >
        <el-icon size="20">
          <Umbrella />
        </el-icon>
        <template #title>薇尔莉特·伊芙加登
        </template>
      </el-menu-item>

      <div
        v-for="item in routesList"
        :key="item.path"
      >
        <el-menu-item
          v-if="jurisdiction === 'admin' ? true : !item.jurisdiction"
          :index="item.path"
        >
          <el-icon>
            <component :is="item.icon" />
          </el-icon>
          <template #title>{{ item.name }}</template>
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { Menu as IconMenu, Umbrella } from "@element-plus/icons-vue";
import { reactive, toRefs, onMounted } from "vue";
import routes from "@/router/routerView.ts";
import { useRouter } from "vue-router";
import { headerStore } from "@/stores/index";
import { getUser } from "@/api";
import { decode } from "js-base64";
export default {
  setup() {
    const { currentRoute } = useRouter();
    const state = reactive({
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      routesList:
        routes.filter((value: { name: string }) => value.name === "Home") &&
        routes.filter((value: { name: string }) => value.name === "Home")
          .length &&
        routes
          .filter((value: { name: string }) => value.name === "Home")[0]
          .children.filter((value: { name: string }) => value.name),
      routerPath: currentRoute.value.path,
      jurisdiction: "",
    });
    const { state: newState } = headerStore();
    const localDataUserToken = localStorage.getItem("user_token")
      ? localStorage.getItem("user_token")
      : "";
    const tokenData = localDataUserToken
      ? JSON.parse(decode(localDataUserToken as string))
      : "";
    onMounted(async () => {
      const res = await getUser(tokenData.userId);
      if (res.data.code === 200) {
        state.jurisdiction = res.data.data.identity;
      }
    });
    return {
      ...toRefs(state),
      ...toRefs(newState),
    };
  },
  components: {
    IconMenu,
    Umbrella,
  },
};
</script>

<style lang="less">
@import "./MenuBar.less";
</style>
