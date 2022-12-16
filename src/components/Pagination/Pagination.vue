<template>
  <el-pagination class="user_pagination" background :page-sizes="pageSizes" :layout="layout"
    @current-change="changePage" :page-count="total" @size-change="changePageSize" :total="sum" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    total: {
      type: Number,
      default: 100,
    },
    pageSizes: {
      type: Array,
      default: [],
    },
    layout: {
      type: String,
      default: "prev, pager, next",
    },
    sum: {
      type: Number,
      default: 0,
    },
  },
  setup(props, context) {
    const changePage = (value: string) => {
      context.emit("changePage", value);
    };
    const changePageSize = (value: string) => {
      context.emit("changePageSize", value);
    };
    return {
      changePage,
      changePageSize,
    };
  },
});
</script>

<style lang="less">
@import "./Pagination.less";
</style>