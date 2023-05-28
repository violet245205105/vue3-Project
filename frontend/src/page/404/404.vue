<template>
  <el-empty
    description="404"
    image="https://picx.zhimg.com/v2-4ebf24a86856805c3107845466e47edf_r.jpg"
    image-size="1000"
  >
    <el-button
      type="primary"
      @click="goBack"
    >回到首页</el-button>
  </el-empty>
</template>

<script lang="ts">
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const goBack = () => {
      router.push("/");
    };
    return {
      goBack,
    };
  },
};
</script>

<style>
</style>