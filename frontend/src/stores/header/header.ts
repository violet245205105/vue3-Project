import { defineStore } from "pinia";
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { decode } from "js-base64";
import { changeAvatarEl, onEditUser } from "@/api";
import CookieUtils from "@/utils/cookie";
export interface Type {
  unfold?: boolean;
  circleUrl?: string;
  userToken?: { userId: string };
  user?: string | null;
  dialogVisible?: boolean;
  isActive?: number | null;
  avatar?: string | null;
  avatarLodeing?: boolean | null;
}
export default defineStore("header", () => {
  const router = useRouter();
  const state: Type = reactive({
    unfold: false,
    circleUrl:
      "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
    // userToken: JSON.parse(decode(localStorage.getItem("user_token") as string)),
    dialogVisible: false,
    isActive: null,
    avatar: null,
    avatarLodeing: false,
    mode: "light",
  });

  const onClickUnfold = () => {
    state.unfold = !state.unfold;
  };

  const changeThePassword = () => {
    console.log("修改密码");
  };

  const signOut = () => {
    router.push("/login");
    CookieUtils.deleteCookie("token");
    ElMessage.success("退出成功");
  };

  const changeAvatar = () => {
    state.dialogVisible = true;
  };

  const onCloneAvatar = () => {
    state.dialogVisible = false;
  };

  const userInformation = () => {
    window.location.href = "/userinformation";
  };

  const onClickAvatar = (index: number) => {
    state.isActive = index;
  };

  

  return {
    onClickUnfold,
    state,
    changeThePassword,
    signOut,
    userInformation,
    changeAvatar,
    onCloneAvatar,
    onClickAvatar,
    // onEditAvatar,
  };
});
