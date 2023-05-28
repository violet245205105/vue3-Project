<template>
  <div class="rolemanagement-box connect" element-loading-text="加载中..." :element-loading-svg="svg" v-loading="loading">
    <div>
      <el-button type="success" @click="onChangeRoleDialog">新增</el-button>
      <el-popconfirm title="你确定要删除吗?" @confirm="handleDeleteArr">
        <template #reference>
          <el-button type="danger" :disabled="!selectedArr.length">批量删除</el-button>
        </template>
      </el-popconfirm>
    </div>
    <el-table border class="rolemanagement-table" :data="userList" style="width: 100%;flex:1;"
      @selection-change="handleSelectionChange">
      <el-table-column type="selection" />
      <el-table-column prop="user" label="用户名" />
      <el-table-column label="权限" prop="identity" width="100">
        <template #default="scope">
          <el-popover effect="light" trigger="hover" placement="top" width="auto">
            <template #default>
              <div>
                权限: {{ scope.row.identity === "admin" ? "管理员" : "游客" }}
              </div>
            </template>
            <template #reference>
              <el-tag v-if="scope.row.identity === 'admin'" type="success">{{
                scope.row.identity
              }}</el-tag>
              <el-tag v-else>{{ scope.row.identity }}</el-tag>
            </template>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column prop="password" label="密码" />

      <el-table-column prop="phone" label="手机号" />

      <el-table-column prop="email" label="邮箱" />

      <el-table-column label="头像" prop="avatar">
        <template #default="scope">
          <el-avatar :size="50" :src="scope.row.avatar ? scope.row.avatar : circleUrl" />
        </template>
      </el-table-column>
      <el-table-column>
        <template #header>
          <el-input v-model="search" size="small" placeholder="此处可以搜索用户名" @change="onChangeSearch" />
        </template>

        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-popconfirm title="你确定要删除吗?" @confirm="handleDelete(scope.$index, scope.row)">
            <template #reference>
              <el-button size="small" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <Pagination :total="total" @changePage="changePage" layout="total, sizes, prev, pager, next" :sum="sum"
        :pageSizes="[10, 50, 100]" @changePageSize="changePageSize" />
    </div>
    <UserFrom :dialogFormVisible="dialogFormVisible" @onChangeConfirm="onChangeConfirm" @onChangeCancel="onChangeCancel"
      @onClickAvatar="onClickAvatar" :title="title" :form="form" :circleUrl="circleUrl" :isButtonLoading="isButtonLoading"
      :isActive="isActive" />
  </div>
</template>

<script lang="ts">
import { Timer } from "@element-plus/icons-vue";
import { onMounted, onUpdated, toRefs } from "vue";
import { RoleManagement, headerStore } from "@/stores";
import Pagination from "@/components/Pagination/Pagination.vue";
import UserFrom from "@/components/UserFrom/UserFrom.vue"

export default {
  components: { Pagination, UserFrom },
  setup() {
    const {
      handleEdit,
      handleDelete,
      state,
      init,
      changePage,
      changePageSize,
      onChangeSearch,
      onChangeRoleDialog,
      onChangeCancel,
      form,
      onClickAvatar,
      onChangeConfirm,
      handleSelectionChange,
      handleDeleteArr
    } = RoleManagement();

    onMounted(async () => {
      await init();
    });

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
    const {
      state: { circleUrl }
    } = headerStore();

    return {
      ...toRefs(state),
      handleEdit,
      handleDelete,
      changePage,
      changePageSize,
      onChangeSearch,
      onChangeRoleDialog,
      onChangeCancel,
      svg,
      form,
      circleUrl,
      onClickAvatar,
      onChangeConfirm,
      handleSelectionChange,
      handleDeleteArr
    };
  },
};
</script>

<style lang="less">
@import "./RoleManagement.less";
</style>
