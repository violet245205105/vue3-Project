<template>
  <div id="common-layout" :class="themes[themeIndex]">
    <el-container>
      <el-aside>
        <MenuBar :user="user" />
      </el-aside>
      <el-container>
        <el-header>
          <Header :themeIndex="themeIndex" :user="user" @changeTheme="changeTheme" :userInit="userInit" />
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import MenuBar from "@/components/MenuBar/MenuBar.vue";
import Header from "@/components/Header/Header.vue";
import { defineComponent, onMounted, ref } from "vue";
import { getUser } from "@/api/user/user";
export default defineComponent({
  components: { MenuBar, Header },
  setup() {
    const user = ref(null);
    const themeIndex = ref(
      new Date().getHours() > 6 && new Date().getHours() < 19 ? 0 : 1
    );

    const themes = ref(["light", "dark"]);
    const changeTheme = (value: number) => {
      themeIndex.value = Number(!value);
    };
    const userInit = async () => {
      const res = await getUser()
      try {
        if (res.data.code === 200) {
          user.value = res.data.data
        }
      } catch (e) {
        console.log("错误", e);
      }
    }
    onMounted(async () => {
      await userInit()
    })
    return {
      themes,
      themeIndex,
      changeTheme,
      user,
      userInit
    };
  },
});
</script>

<style lang="less">
#common-layout {
  width: 100%;
  height: 100%;
  background: var(--dark-background);

  .el-container {
    width: 100%;
    height: 100%;

    .el-aside {
      width: auto;
    }

    .el-header {
      height: 50px;
      align-items: center;
    }
  }
}
</style>
