/
<template>
  <div class="index-box" element-loading-text="加载中..." :element-loading-svg="svg" v-loading="loading"></div>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue';

export default {
  setup() {
    const loading = ref(true);
    const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `;
    onMounted(() => {
      loading.value = false;
    });
    return {
      loading, svg
    }
  }
};
</script>

<style lang="less">
@import "./index.less";
</style>
