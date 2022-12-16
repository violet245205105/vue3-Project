<template>
  <div
    id="common-layout"
    :class="themes[themeIndex]"
  >
    <el-container>
      <el-aside>
        <MenuBar />
      </el-aside>
      <el-container>
        <el-header>
          <Header
            :themeIndex="themeIndex"
            @changeTheme="changeTheme"
          />
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
import { defineComponent, ref } from "vue";
export default defineComponent({
  components: { MenuBar, Header },
  setup() {
    const themeIndex = ref(
      new Date().getHours() > 6 && new Date().getHours() < 19 ? 0 : 1
    );

    const themes = ref(["light", "dark"]);
    const changeTheme = (value: number) => {
      themeIndex.value = Number(!value);
    };
    return {
      themes,
      themeIndex,
      changeTheme,
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
