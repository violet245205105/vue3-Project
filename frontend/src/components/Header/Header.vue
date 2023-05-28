/
<template>
  <div class="header-box">
    <div class="header-left">
      <el-space wrap>
        <el-icon @click="onClickUnfold" v-show="!state.unfold">
          <Fold />
        </el-icon>
        <el-icon @click="onClickUnfold" v-show="state.unfold">
          <Expand />
        </el-icon>
        <span class="header-name">{{ router?.currentRoute?.value?.name }}</span>
      </el-space>
    </div>
    <div class="header-right">
      <el-space wrap>
        <el-icon v-show="themeIndex" :size="30" @click="onChangeTheme">
          <Moon />
        </el-icon>
        <el-icon v-show="!themeIndex" :size="30" @click="onChangeTheme">
          <Sunny />
        </el-icon>
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <el-avatar class="avatar" :size="40" :src="user?.avatar ? user?.avatar : state.circleUrl" />
          </span>
          <template #dropdown>
            <el-dropdown-menu class="avatar-drop">
              <el-dropdown-item @click="userInformation">用户信息</el-dropdown-item>
              <el-dropdown-item @click="changeAvatar">更换头像</el-dropdown-item>
              <el-dropdown-item @click="changeThePassword">修改密码</el-dropdown-item>
              <el-dropdown-item @click="signOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-space>

      <ChangeAvatar :dialogVisible="state.dialogVisible" @onCloneAvatar="onCloneAvatar" :isActive="state.isActive"
        @onClickAvatar="onClickAvatar" @onEditAvatar="onEditAvatar" :user="user" :avatarLodeing="state.avatarLodeing" />
    </div>
  </div>
</template>

<script lang="ts">
import { Fold, Expand, Sunny, Moon } from "@element-plus/icons-vue";
import { headerStore } from "@/stores/index";
import { useRouter } from "vue-router";
import ChangeAvatar from "../ChangeAvatar/ChangeAvatar.vue";
import { getUser, onEditUser } from "@/api/user/user";
import { defineComponent, onMounted, onUpdated, ref, watch } from "vue";
import { ElMessage } from "element-plus";
export default defineComponent({
  props: {
    themeIndex: {
      type: Number,
    },
    user: {
      type: Object
    },
    userInit: {
      type: Function
    }
  },
  components: {
    ChangeAvatar,
    Fold,
    Expand,
    Sunny,
    Moon,
  },
  setup(props, connext) {
    const {
      state,
      onClickUnfold,
      changeThePassword,
      signOut,
      changeAvatar,
      userInformation,
      onCloneAvatar,
      onClickAvatar,
      // onEditAvatar,
    } = headerStore();
    const dialogVisible = ref(false);
    const router = useRouter();
    const onChangeTheme = () => {
      connext.emit("changeTheme", props.themeIndex);
    };

    const themeIndex: { value: number | undefined } = ref(props.themeIndex);
    const user = ref(props.user);
    watch(props, (newVal) => {
      themeIndex.value = newVal.themeIndex;
      user.value = newVal.user
    });

    const onEditAvatar = async (value) => {
      state.avatarLodeing = true;
      const res = await onEditUser(value);
      if (res.data.code === 2000) {
        ElMessage.success(res.data.message);
        props.userInit && await props.userInit()
        state.isActive = 0;
        state.avatarLodeing = false;
        onCloneAvatar();
      } else {
        ElMessage.success(res.data.message);
      }
    };

    onUpdated(async () => {
      // state.userToken = JSON.parse(
      //   decode(localStorage.getItem("user_token") as string)
      // );
      // try {
      //   const res = await getUser(state.userToken.userId);
      //   if (res.data.code === 200) {
      //     state.avatar = res.data.data.avatar;
      //   }
      // } catch (e) {
      //   console.log("错误", e);
      // }
    });
    return {
      state,
      onClickUnfold,
      changeThePassword,
      signOut,
      changeAvatar,
      userInformation,
      router,
      dialogVisible,
      onCloneAvatar,
      onClickAvatar,
      onEditAvatar,
      Sunny,
      Moon,
      themeIndex,
      onChangeTheme,
      user
    };
  },
});
</script>

<style lang="less">
@import "./Header.less";
</style>
