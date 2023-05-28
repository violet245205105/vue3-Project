<template>
  <div class="UserInformation connect" element-loading-text="加载中..." :element-loading-svg="svg" v-loading="loading">
    <el-descriptions :column="2" size="large" title="用户信息展示">
      <el-descriptions-item label="Id:">
        {{ formLabelAlign.id }}
      </el-descriptions-item>

      <el-descriptions-item label="Password:">
        {{ formLabelAlign.password }}
      </el-descriptions-item>

      <el-descriptions-item label="User:">
        {{ formLabelAlign.user }}
      </el-descriptions-item>

      <el-descriptions-item label="Identity:">
        <el-tag>{{ formLabelAlign.identity }}</el-tag>
      </el-descriptions-item>

      <el-descriptions-item label="Phone:">
        {{ formLabelAlign.phone }}
      </el-descriptions-item>

      <el-descriptions-item label="Email:">
        {{ formLabelAlign.email }}
      </el-descriptions-item>
    </el-descriptions>
    <!-- <el-form
      label-position="left"
      label-width="100px"
      :model="formLabelAlign"
      style="width: 460px"
    >
      <el-form-item label="id">
        <el-input v-model="formLabelAlign.id" />
      </el-form-item>

      <el-form-item label="user">
        <el-input v-model="formLabelAlign.user" />
      </el-form-item>

      <el-form-item label="password">
        <el-input v-model="formLabelAlign.password" />
      </el-form-item>

      <el-form-item label="identity">
        <el-input v-model="formLabelAlign.identity" />
      </el-form-item>

      <el-form-item label="phone">
        <el-input v-model="formLabelAlign.phone" />
      </el-form-item>

      <el-form-item label="email">
        <el-input v-model="formLabelAlign.email" />
      </el-form-item>

      <el-form-item label="profile">
        <el-input type="textarea" :rows="5" v-model="formLabelAlign.profile" />
      </el-form-item>
    </el-form> -->
  </div>
</template>

<script lang="ts" setup>
import { UserInformation } from "@/stores/index";
import { onMounted, ref } from "vue";
import { getUser } from "@/api/user/user";
import { decode } from "js-base64";
import { ElMessage } from "element-plus";
const { state, formLabelAlign } = UserInformation();
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
onMounted(async () => {
  try {
    const res = await getUser();
    loading.value = false;
    if (res.data.code === 200) {
      formLabelAlign.id = res.data.data.id;
      formLabelAlign.user = res.data.data.user;
      formLabelAlign.password = res.data.data.password;
      formLabelAlign.identity = res.data.data.identity;
      formLabelAlign.phone = res.data.data.phone;
      formLabelAlign.email = res.data.data.email;
      formLabelAlign.profile = res.data.data.profile;
    }
  } catch (e) {
    console.log("错误", e);
    ElMessage.error("获取用户信息失败");
  }
});
</script>

<style lang="less">
@import "./UserInformation.less";
</style>
