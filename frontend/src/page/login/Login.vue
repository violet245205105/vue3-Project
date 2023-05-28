<template>
  <div :class="routes?.path === '/register' ? 'registerDiv' : 'loginDiv'">
    <div class="connext">
      <h3 class="login_button">{{ title }}</h3>
      <el-divider />
      <el-form label-position="left" ref="ruleFormRef" label-width="auto" :model="ruleForm" :rules="rules" status-icon>
        <el-form-item label="用户名" prop="user">
          <el-input v-model="ruleForm.user" placeholder="请输入用户名" type="text" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" placeholder="请输入密码" type="password" show-password />
        </el-form-item>
        <el-form-item label="重复密码" prop="repeatPassword" v-if="routes?.path === '/register'">
          <el-input v-model="ruleForm.repeatPassword" placeholder="请重复输入密码" type="password" show-password />
        </el-form-item>
        <!-- <el-form-item label="验证码" class="captcha" prop="Captcha" v-if="routes?.path === '/login'">
          <el-input v-model="ruleForm.Captcha" type="text" placeholder="请输入验证码" />
          <vue-captcha class="button_code" ref="captchaRef" @on-change="handleChange" :height="32">
          </vue-captcha>
        </el-form-item> -->

        <el-form-item>
          <el-button :loading="flag" type="primary" @click="submitForm(ruleFormRef)" class="loginButton">{{ title
          }}</el-button>
        </el-form-item>
      </el-form>
      <div class="login_footer">
        <el-link :href="routes?.path === '/login' ? '/register' : '/login'">{{
          routes?.path === "/login" ? "注册" : "登录"
        }}</el-link>
        <el-link href="">忘记密码</el-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import VueCaptcha from "vue-captcha-code";
import { loginStore } from "@/stores/index";
import { ref, toRefs } from "vue";
import { ElMessage } from "element-plus";
import type { FormInstance } from "element-plus";
import CookieUtils from "@/utils/cookie";
export default {
  setup() {
    const captchaRef = ref<any>(null);
    const {
      handleChange,
      ruleFormRef,
      ruleForm,
      state,
      router,
      login,
      register,
      rules,
    } = loginStore();
    const submitForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.validate(async (valid) => {
        if (valid) {
          state.flag = true;
          if (state?.routes?.path === "/login") {
            // if (ruleForm.Captcha === state.code) {
            try {
              const res = await login(ruleForm);
              CookieUtils.setCookie("token", res.data.token)
              state.flag = false;
              if (res?.data?.code === 2000) {
                ElMessage.success(res?.data?.message);
                // router.push("/");
                location.href = "/"
              } else {
                ElMessage.error(res?.data?.message);
                ruleForm.password = "";
                ruleForm.Captcha = "";
                captchaRef?.value?.refreshCaptcha();
              }
            } catch (e) {
              console.log("接口错误", e);
            }
            // } else {
            //   state.flag = false;
            //   ElMessage.error("验证码错误，请重新输入");
            //   ruleForm.password = "";
            //   ruleForm.Captcha = "";
            //   captchaRef?.value?.refreshCaptcha();
            // }
          } else {
            try {
              let num: number = 3;
              let timer: any = null;
              const res = await register({ ...ruleForm, phone: null, identity: "visitor", avatar: "", email: "" });
              if (res.data.code === 2000) {
                timer = setInterval(() => {
                  num--;
                  if (num === 0) {
                    router.push("/login");
                    clearInterval(timer);
                    state.flag = false;
                  }
                }, 1000);
                ElMessage.success(
                  res?.data?.message + "即将为你跳转到登录页面"
                );
              } else {
                ElMessage.error(res?.data?.message);
                state.flag = false;
              }
            } catch (e) {
              console.log("接口错误", e);
            }
          }
        } else {
          return false;
        }
      });
    };

    return {
      captchaRef,
      handleChange,
      ruleFormRef,
      ruleForm,
      submitForm,
      rules,
      ...toRefs(state),
    };
  },
  components: { VueCaptcha },
};
</script>

<style lang="less">
@import "./Login.less";
</style>
